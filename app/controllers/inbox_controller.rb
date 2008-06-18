class InboxController < ApplicationController

  def index
    @actions = collect_inbox_tasks
    
    render(:partial => 'inbox')
  end
  
  def add    
    text = params[:inbox_item_name].nil? ? nil : params[:inbox_item_name].strip

    if !text.nil? and text != ""
      new_task = doc.make(
        :new => :inbox_task,
        :at => doc.inbox_tasks.start,
        :with_properties => {
          :name => text
        })
      a = {:name => new_task.name.get, :id => new_task.id_.get, :note => "" }

      @actions = collect_inbox_tasks
      
      render(:partial => "inbox")
    end
      
  end

  private

  def collect_inbox_tasks
    
    @actions = Array.new
      
    doc.inbox_tasks.get.each {|t|
      if !t.completed.get
        raw_note = t.note.get
        note = raw_note.eql?(:missing_value) ? "" : raw_note
        
        @actions << {:name => t.name.get, :id => t.id_.get, :note => note }
      end
    }

    return @actions
  end


end
