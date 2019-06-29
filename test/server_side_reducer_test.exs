defmodule ServerSideReducerTest do
  use ExUnit.Case
  doctest ServerSideReducer

  test "greets the world" do
    assert ServerSideReducer.hello() == :world
  end
end
