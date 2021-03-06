require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Grayarea
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1


    config.serve_static_assets = true
		config.action_dispatch.x_sendfile_header = 'X-Accel-Redirect'
		config.assets.compile = true
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    # config.action_dispatch.default_headers = {
    #     'X-Frame-Options' => 'SAMEORIGIN'
    # }
  end
end
