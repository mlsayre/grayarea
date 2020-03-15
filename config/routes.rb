Rails.application.routes.draw do
	resources :games
	resources :games do
    collection do
      post 'submithints'
      post 'startguesser'
      post 'startguessercont'
      post 'startgivercont'
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
      post 'decreasepupspoiler'
      post 'decreasepuptworemove'
      post 'increasepupspoiler'
      post 'increasepuptworemove'
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
      get 'settings' => 'pages#settings'
      get 'changetheme' => 'pages#changetheme'
      post 'allfeedseen'
      post 'resetstatnotify'
      post 'updateavatar'
      post 'updatetheme'
    end
  end

  get '/auth/:provider/callback', to: 'sessions#create'
  #match '/games/applixir.iframe.html', :to => 'games#applixir', via: [:get]
  get '/games/applixir.iframe.html', to: 'games#applixir.iframe.html'

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
