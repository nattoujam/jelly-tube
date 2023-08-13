import { useRef, useCallback } from 'react'

export function useModal() {
  const ref = useRef(null)

  const showModal = useCallback(() => {
    console.log('open')
    if (ref.current !== null) {
      ref.current.showModal()
    }
  }, [])

  const closeModal = useCallback(() => {
    console.log('close')
    if (ref.current !== null) {
      ref.current.close()
    }
  }, [])

  return { ref, showModal, closeModal }
}
