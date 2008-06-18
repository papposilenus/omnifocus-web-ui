require 'ostruct'

class MainController < ApplicationController
  
  def index
    @version = app.version.get
    
    # Get a flat list of contexts, rank sorted.

    context_list
  end

  def context_list
    @name = "Contexts"
    
    @contexts = Array.new
    collect_contexts(@contexts, doc)
    
    @inbox_count = doc.inbox_tasks.count
  end
  
  private

  # Returns the number of tasks in this context.  If ctx contains subcontexts, counts those as well
  def num_tasks_in(ctx )
    task_count = ctx.available_task_count.get
    ctx.contexts.get.each {|sub_ctx|
      task_count = task_count - sub_ctx.available_task_count.get
    }
    task_count
  end
  
  def collect_contexts(acc, ctx_holder)
    ctx_holder.contexts.get.each {|ctx|
      context_info = OpenStruct.new
      context_info.ctx_id = ctx.id_.get

      context_info.task_count = num_tasks_in ctx
      context_info.name = ctx.name.get
      begin
        if ctx.container.name.get
          context_info.is_subcontext = true
        end
      rescue
        # Why is there a rescue here?  Could this explode?
      end
      acc << context_info
      collect_contexts(acc, ctx)
    }
  end  
end
