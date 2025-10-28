const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const port = 3000;

const corsOptions = {
  origin: "http://localhost:3001",
  methods: "*",
  allowedHeaders: ["*"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.post("/cadastrar", async (req, res) => {
  try {
    const dados = req.body;
    fs.appendFile("listaPessoa.txt", JSON.stringify(dados) + "\n", (err) => {
      if (err) {
        console.error("Erro ao criar arquivo:", err);
        return res.status(500).send("Erro ao salvar cadastro");
      } else {
        console.log("Arquivo atualizado com sucesso");
        return res.send("Cadastro realizado com sucesso");
      }
    });
  } catch (error) {
    console.error("Erro interno: ", error);
    return res.status(500).send("Erro interno");
  }
});

app.get("/buscarPessoas", async (req, res) => {
  try {
    fs.readFile("listaPessoa.txt", "utf8", (err, data) => {
      if (err) {
        console.error("Erro ao ler o arquivo:", err);
        return res.status(500).send("Erro ao buscar pessoas");
      }

      const linhas = data.trim().split("\n").filter(Boolean);
      const pessoas = linhas.map((linha) => JSON.parse(linha));

      console.log("Pessoas encontradas:", pessoas);
      return res.json(pessoas); 
    });
  } catch (error) {
    console.error("Erro interno:", error);
    return res.status(500).send("Erro interno do servidor");
  }
});

app.listen(port, function () {
  console.log(`Servidor rodando na porta ${port}`);
});
