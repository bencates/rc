defmodule Todo.TodosStore do
  use RC.Store

  def initial_state(), do: %{todos: [], next_todo_id: 1}

  @create "todos/CREATE"
  @change_title "todos/CHANGE_TITLE"
  @toggle_complete "todos/TOGGLE_COMPLETE"
  @toggle_all_complete "todos/TOGGLE_ALL_COMPLETE"
  @remove "todos/REMOVE"
  @clear_completed "todos/CLEAR_COMPLETED"

  def create!(title), do: dispatch(%{"type" => @create, "payload" => %{"title" => title}})

  def change_title!(id, title),
    do: dispatch(%{"type" => @change_title, "id" => id, "payload" => %{"title" => title}})

  def toggle_complete!(id),
    do: dispatch(%{"type" => @toggle_complete, "payload" => %{"id" => id}})

  def toggle_all_complete!(), do: dispatch(%{"type" => @toggle_all_complete})
  def remove!(id), do: dispatch(%{"type" => @remove, "payload" => %{"id" => id}})
  def clear_completed!(), do: dispatch(%{"type" => @clear_completed})

  def reduce(state, @create, %{"title" => title}) do
    new_todo = %{id: state.next_todo_id, title: title, complete: false}

    {new_todo, %{state | todos: state.todos ++ [new_todo], next_todo_id: state.next_todo_id + 1}}
  end

  def reduce(state, @change_title, %{"id" => id, "title" => title}) do
    todo_index = Enum.find_index(state.todos, &(&1.id == id))

    if is_nil(todo_index) do
      {%{}, state}
    else
      {:ok, put_in(state, [:todos, Access.at(todo_index), :title], title)}
    end
  end

  def reduce(state, @toggle_complete, %{"id" => id}) do
    todo_index = Enum.find_index(state.todos, &(&1.id == id))

    if is_nil(todo_index) do
      {:ok, state}
    else
      todo = Enum.at(state.todos, todo_index)

      {:ok, put_in(state, [:todos, Access.at(todo_index), :complete], !todo.complete)}
    end
  end

  def reduce(state, @toggle_all_complete, _payload) do
    all_complete = Enum.all?(state.todos, & &1.complete)

    {:ok, put_in(state, [:todos, Access.all(), :complete], !all_complete)}
  end

  def reduce(state, @remove, %{"id" => id}) do
    {:ok, %{state | todos: Enum.reject(state.todos, &(&1.id == id))}}
  end

  def reduce(state, @clear_completed, _payload) do
    {:ok, %{state | todos: Enum.reject(state.todos, & &1.complete)}}
  end
end
