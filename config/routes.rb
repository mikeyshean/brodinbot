Rails.application.routes.draw do
  root to: "static_pages#root"
  get "/twilio" => "twilio#receiveSMS"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :destroy, :show]
    resources :workflows, only: [:index, :create, :destroy, :show]
    resources :triggers, only: [:index, :create, :destroy]
  end
end
