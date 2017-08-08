Rails.application.routes.draw do
	resources :games
	resources :games do
    collection do
      post 'submithints'
      post 'startguesser'
      post 'updategame'
      post 'soundonoff'
      post 'entermessage'
    end
  end

  resources :pages do
    collection do
      get 'rankings' => 'pages#rankings'
    end
  end

  devise_for :users, controllers: {omniauth_callbacks: "omniauth_callbacks"}
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # authenticated :user do
  #   root to: 'games#new', as: :authenticated_root
  # end

  # You can have the root of your site routed with "root"
  root 'pages#landing'

  authenticated :user do
    root to: 'games#new', as: :authenticated_root
  end

  match 'main' => 'games#new', via: [:get, :post]
end
