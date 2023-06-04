class HelloController < ApplicationController
  def hello
    render json: { message: 'hello' }
  end

  def index
    videos = Video.all
    render json: videos
  end

  # Videoの追加
  def add
    video = Video.create(name: params["name"], age: params["age"])
    render json: video
  end

  # 特定Videoの取得
  def video
    video = Video.find(params[:id])
    render json: video
  end
end
