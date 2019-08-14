defmodule ChatWeb.RoomChannel do
  use ChatWeb, :channel

  def join("room:" <> name, _payload, socket) do
    case Chat.RoomStore.Registry.lookup(name) do
      {:ok, room_pid} ->
        RC.Channel.join(socket, Chat.RoomStore, room_pid)

      :error ->
        {:error, %{reason: "no such channel"}}
    end
  end

  def handle_in("dispatch", action, socket) do
    action =
      case action["type"] do
        "NEW_MESSAGE" ->
          put_in(action, ["payload", "sender"], socket.assigns.user_name)

        _ ->
          action
      end

    RC.Channel.dispatch(socket, action)
  end
end
