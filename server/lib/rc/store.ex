defmodule RC.Store do
  defmacro __using__(_) do
    quote do
      use Agent

      def start_link(opts \\ []) do
        opts = Keyword.put_new(opts, :name, __MODULE__)

        Agent.start_link(__MODULE__, :initial_state, [], opts)
      end

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
      def dispatch(store \\ __MODULE__, action) do
        Agent.get_and_update(store, RC.Store, :dispatch, [__MODULE__, action])
      end
    end
  end

  def get_state(state), do: state

  @doc false
  def dispatch(state, store, action) do
    type = Map.get(action, "type", nil)
    payload = Map.get(action, "payload", %{})

    store.reduce(state, type, payload)
  rescue
    FunctionClauseError ->
      {%{error: "no action matching #{inspect(action)}"}, state}

    error ->
      {%{error: error}, state}
  end
end
