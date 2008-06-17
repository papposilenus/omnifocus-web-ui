# Be sure to restart your web server when you modify this file.

# Log some useful debugging information
puts "LOAD_PATH = #{$LOAD_PATH}"
puts "Environment:"
ENV.each {|k,v|
  puts "#{k} = #{v}"
}

# Uncomment below to force Rails into production mode when 
# you don't control web/app server and can't set it the proper way
# ENV['RAILS_ENV'] ||= 'production'

# Specifies gem version of Rails to use when vendor/rails is not present
RAILS_GEM_VERSION = '1.2.3' unless defined? RAILS_GEM_VERSION

# Bootstrap the Rails environment, frameworks, and default configuration
require File.join(File.dirname(__FILE__), 'boot')

Rails::Initializer.run do |config|
  # Settings in config/environments/* take precedence over those specified here
  
  # Skip frameworks you're not going to use (only works if using vendor/rails)
  # config.frameworks -= [ :action_web_service, :action_mailer ]

  # Only load the plugins named here, by default all plugins in vendor/plugins are loaded
  # config.plugins = %W( exception_notification ssl_requirement )

  # Add additional load paths for your own custom dirs
  # config.load_paths += %W( #{RAILS_ROOT}/extras )
  config.load_paths += %W( #{RAILS_ROOT}/vendor/rb-appscript-0.3.1 #{RAILS_ROOT}/vendor/rb-appscript-0.3.1/src/lib #{RAILS_ROOT}/vendor/plist-3.0.0/lib)
  
  # Force all environments to use the same logger level 
  # (by default production uses :info, the others :debug)
  # config.log_level = :debug

  # Use the database for sessions instead of the file system
  # (create the session table with 'rake db:sessions:create')
  # config.action_controller.session_store = :active_record_store

  # Use SQL instead of Active Record's schema dumper when creating the test database.
  # This is necessary if your schema can't be completely dumped by the schema dumper, 
  # like if you have constraints or database-specific column types
  # config.active_record.schema_format = :sql

  # Activate observers that should always be running
  # config.active_record.observers = :cacher, :garbage_collector

  # Make Active Record use UTC-base instead of local time
  # config.active_record.default_timezone = :utc
  
  # See Rails::Configuration for more options
end

# Add new inflection rules using the following format 
# (all these examples are active by default):
# Inflector.inflections do |inflect|
#   inflect.plural /^(ox)$/i, '\1en'
#   inflect.singular /^(ox)en/i, '\1'
#   inflect.irregular 'person', 'people'
#   inflect.uncountable %w( fish sheep )
# end

# Add new mime types for use in respond_to blocks:
# Mime::Type.register "text/richtext", :rtf
# Mime::Type.register "application/x-mobile", :mobile
#Mime::Type.register "text/xml", :html
Mime::Type.register "text/css", :css

# Include your application configuration below
require 'appscript'

require 'plist'
settings_path = "#{RAILS_ROOT}/config/Settings.plist"
settings = Plist::parse_xml(settings_path)
if settings.nil?
  raise "Unable to read settings from #{settings_path}"
end
FOCUS_USER = settings["user"]
FOCUS_PASSWORD = settings["password"]
FOCUS_PATH = settings["posix_path"] || ENV['FOCUS_PATH'] # The path to the Cocoa app that installed the web app

if FOCUS_USER.nil? || FOCUS_USER == ""
  raise "No user name specified!"
end
if FOCUS_PASSWORD.nil? || FOCUS_PASSWORD == ""
  raise "No user name specified!"
end

if ENV['USE_SSL']
  require 'webrick'
  require 'webrick/https'
  module WEBrick
    class HTTPServer
      alias original_initialize initialize
      def initialize(config={}, default=Config::HTTP)
        config = config.merge(
        :SSLEnable       => true,
        :SSLVerifyClient => ::OpenSSL::SSL::VERIFY_NONE,
        :SSLCertName => [ [ "CN", WEBrick::Utils::getservername ] ]
        )
        original_initialize(config, default)
        
        # webrick_server.rb sets this up for SIGINT, but launchd sends us SIGTERM.
        trap("TERM") { self.shutdown }
        
      end
    end
  end
end
