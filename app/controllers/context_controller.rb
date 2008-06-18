class ContextController < ApplicationController
  def view
    context = doc.contexts.ID(params[:id]).get

    if context.nil?
      logger.warn("Unable to find context with specified identifier\n")
      redirect_to :controller => :main
    else
      session[:context_id] = params[:id];
      @name = context.name.get
      session[:context_name] = @name
      
      @actions = Array.new
      
      context.available_tasks.get.each {|t|
        
        p = t.containing_project.get
        
        project_name = p.eql?(:missing_value) ? "" : p.name.get
        
        raw_note = t.note.get
        note = raw_note.eql?(:missing_value) ? "" : raw_note
        
        @actions << {:name => t.name.get, :id => t.id_.get, :note => note, :project_name => project_name }
      }
      
    end
    render(:partial => 'view')
  end
  
  def toggle_checkbox
    @id = params[:id]
    action = doc.tasks.ID(params[:id]).get
    if action.nil?
      # TODO: If this does a render partial, we can't really redirect -- just log and ignore it
      logger.warn("Unable to find task with specified identifier\n")
    else
      # Setting dates via RubyOSA doesn't seem to work yet.  task has a derived completed property which is easier anyway.
      action.completed.set(!action.completed.get)
      @checked = action.completed.get

    end
  end
end
