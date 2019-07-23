defmodule Chat.RoomListStore do
  use RC.Store, endpoint: ChatWeb.Endpoint, channel: "room_list"

  alias Chat.RoomStore

  @type room :: %{}

  @type state :: %{optional(String.t()) => room()}

  # TODO: real action type
  @type action :: term()

  @spec initial_state() :: state()
  def initial_state(), do: %{}

  @create "CREATE"
  @destroy "DESTROY"

  @spec reduce(state(), action()) :: {:ok, state()}
  def reduce(state, action)

  def reduce(state, %{"type" => @create, "name" => name}) do
    RoomStore.start_link(name: {:via, Registry, {RoomStore.Registry, name}})

    {:ok, Map.put_new(state, name, %{})}
  end

  def reduce(state, %{"type" => @destroy, "name" => name}) do
    {:ok, Map.delete(state, name)}
  end
end
