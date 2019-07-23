defmodule TodoWeb.TodosChannel do
  use TodoWeb, :channel

  alias Todo.TodosStore

  def join("todos", _payload, socket) do
    RC.Channel.join(socket, TodosStore)
  end

  def handle_in("dispatch", action, socket) do
    RC.Channel.handle_dispatch(socket, action)
  end

  intercept ["set_state"]

  def handle_out("set_state", state, socket) do
    RC.Channel.handle_set_state(socket, state)
  end
end
