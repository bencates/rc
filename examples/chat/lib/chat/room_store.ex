defmodule Chat.RoomStore do
  use RC.Store, endpoint: ChatWeb.Endpoint, channel: "room_list"

  @type state :: %{}

  # TODO: real action type
  @type action :: term()

  @spec initial_state() :: state()
  def initial_state(), do: %{}
end
