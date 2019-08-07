if [Phoenix.Channel, Phoenix.Socket] |> Enum.all?(&Code.ensure_loaded?/1) do
  defmodule RC.Channel do
    alias Phoenix.{Channel, Socket}

    def join(socket, store_module), do: join(socket, store_module, store_module)

    def join(socket, store_module, store_pid) do
      state = store_module.get_state(store_pid)

      socket =
        socket
        |> Socket.assign(:rc_store, {store_module, store_pid})

      # |> Socket.assign(:rc_prev_state, state)

      {:ok, state, socket}
    end

    def dispatch(socket, action) do
      {store_module, store_pid} = socket.assigns.rc_store

      result = store_module.dispatch(store_pid, action)

      reply = if is_atom(result), do: result, else: {:ok, result}

      {:reply, reply, socket}
    end

    def push_state(socket, state) do
      # TODO: patch state
      Channel.push(socket, "set_state", state)

      # {:noreply, Socket.assign(socket, :rc_prev_state, state)}
      {:noreply, socket}
    end

    # defp prev_state(socket), do: socket.assigns.rc_prev_state
  end
end
