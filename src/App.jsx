import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [cpf, setCpf] = useState("");
  const [nomePessoa, setNomePessoa] = useState("");
  const [pesoPessoa, setPesoPessoa] = useState("");
  const [data, setData] = useState([]); // ✅ começa como array

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          CPF: cpf,
          Nome: nomePessoa,
          Peso: pesoPessoa,
        }),
      });

      if (!response.ok) {
        console.error("Erro ao criar pessoa");
      } else {
        console.log("Pessoa cadastrada com sucesso!");
        setCpf("");
        setNomePessoa("");
        setPesoPessoa("");
        handleBuscar(); 
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  }

  async function handleBuscar() {
    try {
      const response = await fetch("http://localhost:3000/buscarPessoas");
      if (!response.ok) {
        console.error("Erro ao buscar pessoas");
        return;
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Erro ao buscar:", error);
    }
  }

  useEffect(() => {
    handleBuscar();
  }, []);

  return (
    <div className="App">
      <div className="container-all">
        <div className="container-formulario">
          <form className="form-cad" onSubmit={handleSubmit}>
            <h1>Cadastro Clientes</h1>

            <div className="CPF">
              <label>Digite seu CPF</label>
              <input
                type="number"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
            </div>

            <div className="nome-pessoa">
              <label>Digite seu nome</label>
              <input
                type="text"
                value={nomePessoa}
                onChange={(e) => setNomePessoa(e.target.value)}
                required
              />
            </div>

            <div className="peso">
              <label>Digite seu peso</label>
              <input
                type="text"
                value={pesoPessoa}
                onChange={(e) => setPesoPessoa(e.target.value)}
                required
              />
            </div>

            <button type="submit">Cadastrar</button>
          </form>
        </div>

        <div className="listar-pessoas">
          <h1>Lista de pessoas</h1>
          <ul>
            {data.length > 0 ? (
              data.map((pessoa, index) => (
                <li key={index}>
                  {pessoa.Nome} - CPF: {pessoa.CPF} - Peso: {pessoa.Peso}
                </li>
              ))
            ) : (
              <p>Nenhuma pessoa cadastrada ainda.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
