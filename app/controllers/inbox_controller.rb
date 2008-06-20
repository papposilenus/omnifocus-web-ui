class InboxController < ApplicationController

  def index
    @actions = collect_inbox_tasks
    
    render(:partial => 'inbox')
  end
  
  def add    
    taskname = params[:inbox_item_name].nil? ? nil : params[:inbox_item_name].strip
    note =  params[:inbox_note].nil? ? nil : params[:inbox_note].strip

    if !taskname.nil? and taskname != "" and !note.nil? and note != "" 
      new_task = doc.make(
        :new => :inbox_task,
        :at => doc.inbox_tasks.start,
        :with_properties => {
          :name => taskname
          :note => note
        })
      a = {:name => new_task.name.get, :id => new_task.id_.get, :note => note }
    elsif !taskname.nil? and taskname != ""
      new_task = doc.make(
        :new => :inbox_task,
        :at => doc.inbox_tasks.start,
        :with_properties => {
          :name => taskname
        })
      a = {:name => new_task.name.get, :id => new_task.id_.get, :note => "" }
    end
    
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
