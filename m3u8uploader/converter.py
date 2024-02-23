import sys
import time
from pathlib import Path
import subprocess
import boto3
from typing import List
from rich.console import Console
from dotenv import load_dotenv
import os

console = Console()
load_dotenv()


def post(message: str):
    console.print(message)
    name = os.getenv('POST_NAME') or 'dev'
    subprocess.call(
        ['webhook', 'post', message, '-n', name]
    )


class Uploader:
    def __init__(self, endpoint: str):
        id = os.getenv('MINIO_ACCESS_KEY')
        secret = os.getenv('MINIO_SECRET_KEY')
        bucket_name = os.getenv('MINIO_BUCKET')

        s3 = boto3.resource(service_name='s3', endpoint_url=endpoint,
                            aws_access_key_id=id, aws_secret_access_key=secret)
        self.bucket = s3.Bucket(bucket_name)

    def upload(self, files: List[Path], dirname: str):
        log = list()
        for file in files:
            upload_path = f'{dirname}/{file.name}'
            log.append(f'upload {file} to {upload_path}')
            self.bucket.upload_file(file, upload_path)

        mes = '\n'.join(log)
        post(f'```{mes}```')


class M3u8Converter:
    def __init__(self):
        pass

    def convert(self, source_url: str) -> Path:
        stem = Path(source_url.split('/')[-1]).stem
        output_dir = Path('.').joinpath(stem).resolve()
        self._run_ffmpeg(source_url, output_dir)

        return output_dir

    def _run_ffmpeg(self, source_url: str, output_dir: Path, hls_time: int = 9):
        output_dir.mkdir(exist_ok=True)
        output = output_dir.joinpath(f'{output_dir.stem}.m3u8')
        subprocess.call([
            'ffmpeg', '-i', source_url,
            '-c:v', 'copy',
            '-c:a', 'copy',
            '-f', 'hls',
            '-hls_time', str(hls_time),
            '-hls_playlist_type', 'vod',
            output
        ])
