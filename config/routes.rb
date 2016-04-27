Rails.application.routes.draw do
  root to: "static_pages#root"
  get "/twilio" => "twilio#receiveSMS"

  namespace :api, defaults: { format: :json } do
    resources :workflows, only: [:index, :create, :destroy, :show]
    resources :triggers, only: [:index, :create]
  end
end
