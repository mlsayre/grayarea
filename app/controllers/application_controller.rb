class ApplicationController < ActionController::Base
	before_action :configure_permitted_parameters, if: :devise_controller?
  # before_action :allow_iframe, only: :applixir
  protect_from_forgery with: :exception

  def after_sign_in_path_for(resource)
    main_path
  end

  protected

  def configure_permitted_parameters
  	devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
  	devise_parameter_sanitizer.permit(:sign_up, keys: [:avatar])
  	devise_parameter_sanitizer.permit(:account_update, keys: [:username])
  	devise_parameter_sanitizer.permit(:account_update, keys: [:about])
  	devise_parameter_sanitizer.permit(:account_update, keys: [:avatar])
    # devise_parameter_sanitizer.for(:sign_up) << :username
    # devise_parameter_sanitizer.for(:sign_up) << :avatar
    # devise_parameter_sanitizer.for(:account_update) << :username
    # devise_parameter_sanitizer.for(:account_update) << :about
    # devise_parameter_sanitizer.for(:account_update) << :avatar
    
  end

  private
    # def allow_iframe
    #   response.headers['X-Frame-Options'] = 'ALLOW-FROM https://cdn.applixir.com'
    # end
end
