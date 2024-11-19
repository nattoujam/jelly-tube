require 'sidekiq/web'

Sidekiq::Web.use ActionDispatch::Cookies
Sidekiq::Web.use ActionDispatch::Session::CookieStore, key: '_interslice_session'

Rails.application.routes.draw do
  resources :thumnails
  post "/graphql", to: "graphql#execute"
  root 'hello#hello'

  mount Sidekiq::Web => '/sidekiq'
end
