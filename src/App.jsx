import { useState, useEffect } from "react";

function App() {
  const [form, setForm] = useState({
    idade: "",
    peso: "",
    altura: "",
    sexo: "",
    nivelDeAtividade: "",
  });

  const [resultado, setResultado] = useState(null);
  const [niveisAtividade, setNiveisAtividade] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5096/api/niveis-atividade")
      .then((res) => res.json())
      .then((data) => setNiveisAtividade(data))
      .catch((err) => console.error("Erro ao buscar níveis de atividade", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { idade, peso, altura, sexo, nivelDeAtividade } = form;

    if (!idade || !peso || !altura || !sexo || !nivelDeAtividade) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    if (idade <= 0 || peso <= 0 || altura <= 0) {
      alert("Idade, peso e altura devem ser maiores que zero.");
      return;
    }

    const payload = {
      idade: parseInt(form.idade),
      peso: parseFloat(form.peso),
      altura: parseFloat(form.altura),
      sexo: form.sexo,
      nivelDeAtividade: parseInt(form.nivelDeAtividade),
    };

    try {
      const res = await fetch("http://localhost:5096/api/tmb/calcular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
            min="1"
            max="120"
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
            min="1"
            max="500"
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
            min="50"
            max="250"
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
            onChange={(e) =>
              setForm({ ...form, nivelDeAtividade: parseInt(e.target.value) })
            }
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
            required
          >
            <option value="">Selecione</option>
            {niveisAtividade.map((nivel, index) => (
              <option key={index} value={nivel.valor}>
                {nivel.nome}
              </option>
            ))}
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
