defmodule TodoWeb.TodosChannel do
  use TodoWeb, :channel

  alias Todo.TodosStore

  def join("todos", _payload, socket) do
    RC.Channel.join(socket, TodosStore)
  end

  def handle_in("dispatch", action, socket) do
    RC.Channel.dispatch(socket, action)
  end

  intercept ["set_state"]

  def handle_out("set_state", state, socket) do
    RC.Channel.push_state(socket, state)
  end
end
