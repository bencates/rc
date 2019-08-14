if [Phoenix.Channel, Phoenix.Socket] |> Enum.all?(&Code.ensure_loaded?/1) do
  defmodule RC.Channel do
    alias Phoenix.{Channel, Socket}

    def join(socket, store_module), do: join(socket, store_module, store_module)

    def join(socket, store_module, store_pid) do
      state = store_module.get_state(store_pid)

      socket = put_in(socket.private[:rc_store], {store_module, store_pid})

      {:ok, state, socket}
    end

    def dispatch(socket, action) do
      {store_module, store_pid} = socket.private[:rc_store]

      {result, diff} = store_module.dispatch(store_pid, action)

      Channel.broadcast!(socket, "patch_state", diff)

      reply = if is_atom(result), do: result, else: {:ok, result}

      {:reply, reply, socket}
    end
  end
end
