class RegistrationsController < Devise::RegistrationsController

  protected

  # def update_resource(resource, params)
  #   resource.update_without_password(params)
  # end

  def update_resource(resource, params)
    if !current_user.provider
    	resource.update_with_password(params)
    else
      params.delete("current_password")
      resource.update_without_password(params)
    end
  end

  def after_update_path_for(resource)
      main_path
    end
end