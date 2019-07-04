defmodule RCTest do
  use ExUnit.Case
  doctest RC

  test "greets the world" do
    assert RC.hello() == :world
  end
end
