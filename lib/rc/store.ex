defmodule RC.Store do
  defmacro __using__(config) do
    quote do
      use Agent

      def start_link(), do: Agent.start_link(__MODULE__, :initial_state, [])

      def start_link(_), do: Agent.start_link(__MODULE__, :initial_state, [], name: __MODULE__)

      @doc """
      Retrieve a value from the store. Accepts the same query syntax as `Kernel.get_in/2`.
      """
      def get(store \\ __MODULE__, keys), do: Agent.get(store, Kernel, :get_in, keys)

      @doc """
      Retrieve the entire state.
      """
      def get_state(store \\ __MODULE__), do: Agent.get(store, RC.Store, :get_state, [])

      @doc """
      Dispatch an action to the store.
      """
      def dispatch(agent \\ __MODULE__, action),
        do: Agent.get_and_update(agent, RC.Store, :dispatch, [__MODULE__, unquote(config), action])
    end
  end

  def get_state(state), do: state

  @doc false
  def dispatch(state, store, config, action) do
    {return, new_state} = store.reduce(state, action)

    if Keyword.has_key?(config, :endpoint) && Keyword.has_key?(config, :channel) do
      config[:endpoint].broadcast!(config[:channel], "set_state", new_state)
    end

    {return, new_state}
  rescue
    FunctionClauseError ->
      {%{error: "no action matching #{inspect(action)}"}, state}
    error ->
      {%{error: error}, state}
  end
end
