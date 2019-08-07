defmodule ChatWeb.RoomChannel do
  use ChatWeb, :channel

  def join("room:" <> name, _payload, socket) do
    case Registry.lookup(Chat.RoomStore.Registry, name) do
      [{room_pid, _}] ->
        RC.Channel.join(socket, Chat.RoomStore, room_pid)

      [] ->
        {:error, %{reason: "no such channel"}}
    end
  end

  def handle_in("dispatch", action, socket) do
    RC.Channel.dispatch(socket, action)
  end

  intercept(["set_state"])

  def handle_out("set_state", state, socket) do
    RC.Channel.push_state(socket, state)
  end
end
