from datetime import datetime

from fastapi import FastAPI, Request
import uvicorn
import json
from rich.console import Console
from rich import inspect
import shutil

from typing import List
from converter import M3u8Converter, Uploader

app = FastAPI()
console = Console()


@app.post("/")
async def new_subscription(res: Request):
    event = json.loads(await res.body())

    event_name = event['EventName']
    uploaded_file = event['Key']
    endpoint = event['Records'][0]['responseElements']['x-minio-origin-endpoint']

    converter = M3u8Converter()
    uploader = Uploader(endpoint)

    console.rule('response')
    console.print(event_name)
    console.print(uploaded_file)
    console.print(endpoint)

    output = converter.convert(endpoint + '/' + uploaded_file)
    dir_name = output.stem
    uploader.upload(list(output.iterdir()), dir_name)
    shutil.rmtree(output)

    return 'OK'


if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=5000, log_level='info')
