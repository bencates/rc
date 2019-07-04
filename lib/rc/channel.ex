if Code.ensure_loaded?(Phoenix.Channel) do
  defmodule RC.Channel do
    def join(store, socket) do
      state = store.get_state()

      socket =
        socket
        |> put_in([Access.key!(:assigns), :rc_store], store)
        |> put_in([Access.key!(:assigns), :rc_prev_state], state)

      {:ok, state, socket}
    end

    def handle_dispatch(action, socket) do
      result = store(socket).dispatch(action)

      reply = if is_atom(result), do: result, else: {:ok, result}

      {:reply, reply, socket}
    end

    def handle_set_state(state, socket) do
      # TODO: patch state
      Phoenix.Channel.push(socket, "set_state", state)

      {:noreply, socket}
    end

    defp store(socket), do: socket.assigns[:rc_store]

    defp prev_state(socket), do: socket.assigns[:rc_prev_state]
  end
end
