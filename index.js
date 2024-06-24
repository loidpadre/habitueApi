const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Home = require("./model/homesModel");
const cors = require("cors");

const port = 3000;

app.use(cors());
app.use(express.json());

// pegar todos os dados
app.get("/", async (req, res) => {
  try {
    const homes = await Home.find({});
    res.status(200).json(homes);
  } catch (error) {
    console.log("Erro ao carregar casas", error);
    res.status(500).json({ message: "Erro ao carregar dados" });
  }
});

// pegar um unico dado
app.get("/detail/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const home = await Home.findById(id);
    res.status(200).json(home);
  } catch (error) {
    console.log("Erro ao carregar casa unica", error);
    res.status(500).json({ message: "Erro ao carregar dados da casa unica" });
  }
});

// deletar um dado
app.delete("/dash/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const home = await Home.deleteOne({ _id: id });
    if (home.deletedCount === 0) {
      return res.status(404).json({ message: "Casa não encontrada" });
    }
    res.status(200).json({ message: "Casa deletada com sucesso" });
  } catch (error) {
    console.log("Erro ao deletar casa", error);
    res.status(500).json({ message: "Erro ao deletar casa" });
  }
});

// cadastrar uma nova casa
app.post("/dash/add", async (req, res) => {
  try {
    const home = await Home.create(req.body);
    res.status(200).json(home);
  } catch (error) {
    console.log("Erro a cadastrar casa", error);
    res.status(500).json({ message: "Erro a cadastrar casa" });
  }
});

mongoose
  .connect(
    "mongodb+srv://loidpadre:N04lFkInEbVJgiXr@newhabitue.wa2czlp.mongodb.net/?retryWrites=true&w=majority&appName=newhabitue",
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor rodando e DB conectada na porta ${port}`);
    });
  })
  .catch((err) => {
    console.log("Erro ao se conectar ao DB", err);
  });

module.exports = app;
