import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    idade: "",
    peso: "",
    altura: "",
    sexo: "",
    nivelDeAtividade: "",
  });

  const [resultado, setResultado] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://localhost:7294/api/tmb/calcular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Erro ao calcular");

      const data = await res.json();
      setResultado(data.tmb);
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com a API");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Calculadora de TMB</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg w-full max-w-md space-y-4"
      >
        <div>
          <label className="block mb-1">Idade</label>
          <input
            type="number"
            name="idade"
            value={form.idade}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Peso (kg)</label>
          <input
            type="number"
            name="peso"
            value={form.peso}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Altura (cm)</label>
          <input
            type="number"
            name="altura"
            value={form.altura}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Sexo</label>
          <select
            name="sexo"
            value={form.sexo}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
            required
          >
            <option value="">Selecione</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Nível de Atividade</label>
          <select
            name="nivelDeAtividade"
            value={form.nivelDeAtividade}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
            required
          >
            <option value="">Selecione</option>
            <option value="sedentario">Sedentário</option>
            <option value="leve">Leve</option>
            <option value="moderado">Moderado</option>
            <option value="ativo">Ativo</option>
            <option value="muito_ativo">Muito ativo</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
        >
          Calcular
        </button>
      </form>

      {resultado !== null && (
        <div className="mt-6 text-xl">
          Sua TMB é: <span className="font-bold">{resultado}</span> kcal/dia
        </div>
      )}
    </div>
  );
}

export default App;
