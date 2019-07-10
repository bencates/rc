defmodule ChatWeb.RoomListChannel do
  use ChatWeb, :channel

  alias Chat.RoomListStore

  def join("room_list", _payload, socket) do
    RC.Channel.join(RoomListStore, socket)
  end

  def handle_in("dispatch", action, socket) do
    RC.Channel.handle_dispatch(action, socket)
  end

  intercept ["set_state"]

  def handle_out("set_state", state, socket) do
    RC.Channel.handle_set_state(state, socket)
  end
end
