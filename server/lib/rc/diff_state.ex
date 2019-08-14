defmodule RC.DiffState do
  defstruct [:diff]

  defguardp both_maps(a, b) when is_map(a) and is_map(b)
  defguardp both_lists(a, b) when is_list(a) and is_list(b)

  def diff(old, new), do: %__MODULE__{diff: do_diff(old, new)}

  defp do_diff(old, new) when both_maps(old, new) do
    old = old |> Map.to_list() |> List.keysort(0)
    new = new |> Map.to_list() |> List.keysort(0)

    diff =
      List.myers_difference(old, new, fn
        {key, old_val}, {key, new_val} -> [{key, do_diff(old_val, new_val)}]
        _, _ -> nil
      end)

    diff
    |> Keyword.keys()
    |> Enum.uniq()
    |> Enum.map(fn key ->
      val = diff |> Keyword.get_values(key) |> List.flatten() |> Enum.into(%{})

      {key, val}
    end)
  end

  defp do_diff(old, new) when both_lists(old, new) do
    List.myers_difference(old, new, &do_diff/2)
  end

  defp do_diff(old_val, new_val), do: [del: old_val, ins: new_val]
end

if Code.ensure_loaded?(Jason) do
  defimpl Jason.Encoder, for: RC.DiffState do
    def encode(%{diff: diff}, opts) do
      diff
      |> json_patch()
      |> Jason.Encode.list(opts)
    end

    defp json_patch(diff, path_stack \\ []) do
      cond do
        Enum.all?(diff, &is_map(elem(&1, 1))) -> json_patch_map(diff, path_stack)
        Enum.all?(diff, &is_list(elem(&1, 1))) -> json_patch_list(diff, path_stack)
        true -> json_patch_term(diff, path_stack)
      end
      |> List.flatten()
    end

    defp json_patch_map(diff, path_stack) do
      Enum.map(diff, fn
        {:eq, _eq_map} ->
          []

        {:del, del_map} ->
          Enum.map(del_map, fn {key, _value} ->
            %{op: "remove", path: pointer([key | path_stack])}
          end)

        {:ins, ins_map} ->
          Enum.map(ins_map, fn {key, value} ->
            %{op: "add", path: pointer([key | path_stack]), value: value}
          end)

        {:diff, diff_map} ->
          Enum.map(diff_map, fn {key, value} ->
            json_patch(value, [key | path_stack])
          end)
      end)
    end

    defp json_patch_list(diff, path_stack) do
      Enum.map_reduce(diff, 0, fn
        {:eq, eq_list}, offset ->
          {[], offset + length(eq_list)}

        {:del, del_list}, offset ->
          del_ops =
            del_list
            |> Enum.with_index(offset)
            |> Enum.map(fn {_value, index} ->
              %{op: "remove", path: pointer([index | path_stack])}
            end)

          {del_ops, offset}

        {:ins, ins_list}, offset ->
          ins_ops =
            ins_list
            |> Enum.with_index(offset)
            |> Enum.map(fn {value, index} ->
              %{op: "add", path: pointer([index | path_stack]), value: value}
            end)

          {ins_ops, offset + length(ins_list)}

        {:diff, diff}, offset ->
          diff_ops = json_patch(diff, [offset | path_stack])

          {diff_ops, offset + 1}
      end)
      |> elem(0)
    end

    defp json_patch_term([del: _], path_stack),
      do: [%{op: "remove", path: pointer(path_stack)}]

    defp json_patch_term([ins: value], path_stack),
      do: [%{op: "add", path: pointer(path_stack), value: value}]

    defp json_patch_term([del: _, ins: value], path_stack),
      do: [%{op: "replace", path: pointer(path_stack), value: value}]

    defp pointer([]), do: ""

    defp pointer(path_stack) do
      "/" <>
        (path_stack
         |> IO.inspect()
         |> Enum.reverse()
         |> Enum.map(fn path_token ->
           path_token
           |> to_string()
           |> String.replace("~", "~0")
           |> String.replace("/", "~1")
         end)
         |> Enum.join("/"))
    end
  end
end
