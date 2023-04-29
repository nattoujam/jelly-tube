Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
  root 'hello#hello'

  get 'videos', to: 'hello#index'
  get 'videos/:id', to: 'hello#video'
  post 'videos', to: 'hello#add'
end
