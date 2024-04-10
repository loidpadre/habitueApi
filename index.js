const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Home = require("./model/homesModel");
const cors = require("cors")

const PORT = process.env.PORT || 5000;
app.use(cors())
app.use(express.json());
//pegar todos os dados
app.get("/", (req, res)=>{
    res.send("Hello world")
})
app.get("/", async (req, res) =>{
    try {
        const homes = await Home.find({})
        res.status(200).json(homes)
        
    } catch (error) {
        console.log("Erro ao carregar casas")
        res.status(500).json({message: "Eu a carregar dados"})
    }
});
// pegar um unico dado
app.get("/detail/:id", async (req, res) =>{
    const {id} = req.params
    try {
        const home = await Home.findById(id)
        res.status(200).json(home)
        
    } catch (error) {
        console.log("Erro ao carregar casa uniica")
        res.status(500).json({message: "Eu a carregar dados da casa unica"})
    }
});

// deletar um dado
app.delete("/dash/:id", async (req, res) => {
    const { id } = req.params;
    try {
        // Usar { _id: id } para especificar o documento a ser deletado
        const home = await Home.deleteOne({ _id: id });
        if (home.deletedCount === 0) {
            // Se nenhum documento foi deletado, pode ser porque o id não foi encontrado
            return res.status(404).json({ message: "Casa não encontrada" });
        }
        // Sucesso, documento deletado
        res.status(200).json({ message: "Casa deletada com sucesso" });
    } catch (error) {
        console.log("Erro ao deletar casa", error);
        res.status(500).json({ message: "Erro ao deletar casa" });
    }
});

// cadastrar uma nova casa
app.post("/dash/add", async (req, res) =>{
    try {
        const home = await Home.create(req.body);
        res.status(200).json(home); 
    } catch (error) {
        console.log("Erro a cadastrar casa" + error);
        res.status(500).json({message: "Erro a cadastrar casa"}); 
    }
});

mongoose.connect("mongodb+srv://loidpadre:IYSnNAOEMsknE4Oh@habitue.zzlbbn7.mongodb.net/?retryWrites=true&w=majority&appName=habitue").then(() =>{
    app.listen(PORT, ()=>{
        console.log(`servidor rodando e DB conectada na porta ${PORT}`);
    });
}).catch((err) =>{
    console.log("erro ao se conectar a DB");
});
