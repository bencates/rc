defmodule RC.MixProject do
  use Mix.Project

  def project do
    [
      app: :phoenix_reducer_channel,
      version: "0.1.0",
      elixir: "~> 1.9",
      start_permanent: Mix.env() == :prod,
      deps: deps()
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
end
