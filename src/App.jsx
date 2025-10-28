import "./App.css"; 

function App() {
  return (
    <div className="App">
      <div className="container-all">

        <div className="container-formulario">
          <form className="form-cad">
            <h1>Cadastro Clientes</h1>
              <div className="CPF">
                <label >Digite seu CPF</label>
                <input type="number" required />
              </div>
              <div className="nome-pessoa">
                <label>Digite seu nome</label>
                <input type="text" required />
              </div>
              <div className="peso">
                <label>Digite seu peso</label>  
                <input type="text" required />
              </div>
          </form>
        </div>

        <div className="listar-pessoas">
          <h1>Lista de pessoas</h1>


        </div>

      </div>
    </div>
  );
}

export default App;
