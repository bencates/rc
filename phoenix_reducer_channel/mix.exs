defmodule RC.MixProject do
  use Mix.Project

  def project do
    [
      app: :phoenix_reducer_channel,
      version: "0.1.0",
      description: "Server-side Redux reducers over Phoenix channels",
      elixir: "~> 1.9",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      package: package(),
      source_url: "https://github.com/bencates/rc/tree/master/phoenix_reducer_channel"
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:phoenix, "~> 1.4.7", optional: true},
      {:jason, "~> 1.1.2", optional: true},
      {:ex_doc, "~> 0.21", only: :dev, runtime: false}
    ]
  end

  defp package do
    [
      licenses: ["MIT"],
      links: %{"GitHub" => "https://github.com/bencates/rc"}
    ]
  end
end
