# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.


class ApplicationController < ActionController::Base
  # Pick a unique cookie name to distinguish our session data from others'
  prepend_after_filter OutputCompressionFilter
  requires_authentication :using => :authenticate, :realm => 'OmniFocus login'
  session :session_key => '_focus_session_id'
  
  layout "default"
  
  protected
  
  def app
    app = Appscript.app(FOCUS_PATH || "OmniFocus")
  end
  
  def doc
    app.default_document
  end

  private

  def authenticate(username, password)
    return username == FOCUS_USER && password == FOCUS_PASSWORD
  end

end
