Rails.application.routes.draw do
	resources :games
	resources :games do
    collection do
      post 'submithints'
      post 'startguesser'
      post 'updategame'
      post 'soundonoff'
      post 'entermessage'
      post 'resetchatnotify'
      post 'delgame'
      post 'addheart'
      post 'removeheart'
      post 'resetheartnotify'
      post 'givingdeletegame'
      post 'guessingreportgame'
      post 'playasguest'
    end
  end

  resources :pages do
    collection do
      get 'rankings' => 'pages#rankings'
      get 'howtoplay' => 'pages#howtoplay'
      get 'about' => 'pages#about'
      get 'feats' => 'pages#feats'
      get 'feed' => 'pages#feed'
      get 'alltimeranks' => 'pages#alltimeranks'
      get 'weeklyranks' => 'pages#weeklyranks'
      get 'avatarcustomize' => 'pages#avatar_customize'
      post 'allfeedseen'
      post 'resetstatnotify'
    end
  end

  get '/auth/:provider/callback', to: 'sessions#create'

  devise_for :users, controllers: {omniauth_callbacks: "omniauth_callbacks", registrations: 'registrations'}
  
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
