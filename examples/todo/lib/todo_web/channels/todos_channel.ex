defmodule TodoWeb.TodosChannel do
  use TodoWeb, :channel

  alias Todo.TodosStore

  def join("todos", _payload, socket) do
    RC.Channel.join(TodosStore, socket)
  end

  def handle_in("dispatch", action, socket) do
    RC.Channel.handle_dispatch(action, socket)
  end

  intercept ["set_state"]

  def handle_out("set_state", state, socket) do
    RC.Channel.handle_set_state(state, socket)
  end
end
