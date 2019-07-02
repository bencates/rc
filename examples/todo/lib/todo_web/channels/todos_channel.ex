defmodule TodoWeb.TodosChannel do
  use TodoWeb, :channel

  alias Todo.TodosStore

  def join("todos", _payload, socket) do
    state = TodosStore.get_state()

    {:ok, state, socket}
  end

  def handle_in("dispatch", action, socket) do
    result = TodosStore.dispatch(action)

    reply = if is_atom(result), do: result, else: {:ok, result}

    {:reply, reply, socket}
  end
end
