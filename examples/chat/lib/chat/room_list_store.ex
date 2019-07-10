defmodule Chat.RoomListStore do
  use RC.Store, endpoint: ChatWeb.Endpoint, channel: "room_list"

  @type room :: %{
    name: String.t(),
    description: String.t()
  }

  @type state :: %{optional(String.t()) => room()}

  @spec initial_state() :: state()
  def initial_state(), do: %{}

  @create "CREATE"
  @destroy "DESTROY"

  def reduce(state, %{"type" => @create, "name" => name} = action) do
    new_channel = %{
      name: name,
      description: Map.get(action, "description", name)
    }

    {:ok, Map.put(state, name, new_channel)}
  end

  def reduce(state, %{"type" => @destroy, "name" => name}) do
    {:ok, Map.delete(state, name)}
  end
end
