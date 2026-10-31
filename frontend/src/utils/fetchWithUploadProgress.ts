export type UploadProgressOptions = {
  onUploadProgress?: (event: ProgressEvent) => void
}

function parseResponseHeaders(rawHeaders: string): Headers {
  const headers = new Headers()
  rawHeaders
    .trim()
    .split(/[\r\n]+/)
    .forEach((line) => {
      const separator = line.indexOf(':')
      if (separator > 0) headers.append(line.slice(0, separator), line.slice(separator + 1).trim())
    })
  return headers
}

// fetch は送信の進捗を取れないため、onUploadProgress が渡されたときだけ XMLHttpRequest で送る
export function fetchWithUploadProgress(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  const onUploadProgress = (init as UploadProgressOptions | undefined)?.onUploadProgress
  if (!onUploadProgress) return fetch(input, init)

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(init?.method ?? 'GET', input instanceof Request ? input.url : String(input))
    new Headers(init?.headers).forEach((value, key) => xhr.setRequestHeader(key, value))
    xhr.upload.onprogress = onUploadProgress
    xhr.onload = () =>
      resolve(
        new Response(xhr.responseText, {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseResponseHeaders(xhr.getAllResponseHeaders())
        })
      )
    xhr.onerror = () => reject(new TypeError('Network request failed'))
    xhr.onabort = () => reject(new DOMException('The request was aborted.', 'AbortError'))
    init?.signal?.addEventListener('abort', () => xhr.abort(), { once: true })
    xhr.send(init?.body as XMLHttpRequestBodyInit | null)
  })
}
