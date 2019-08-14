defmodule Chat.RoomStore do
  use RC.Store

  registry()

  @type message :: %{
          sender: String.t(),
          text: String.t()
        }

  @type state :: %{messages: [message()]}

  @new_message "NEW_MESSAGE"

  @spec initial_state() :: state()
  def initial_state(), do: %{messages: []}

  def reduce(state, @new_message, %{"text" => text, "sender" => sender}) do
    message = %{
      text: text,
      sender: sender,
      sent_at: DateTime.to_iso8601(DateTime.utc_now())
    }

    {:ok, %{state | messages: state.messages ++ [message]}}
  end
end
