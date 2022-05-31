const express = require("express");
const express = require("axios");
const { default: axios } = require("axios");
const app = express();

app.use(express.json);

const palavraChave = "important";

const funcoes = {
    ObservacaoCriada: (observacao) => {
        observacao.status = observacao.texto.include(palavraChave) 
        ? "important" 
        : "comum";
        axios.post("http//localhost:10000/eventos", {
            tipo: "ObservacaoClassificada",
            dados: observacao,
        })
    }
};

app.post('/eventos', (req, res, next) =>{
    funcoes[req.body.tipo](req.body.dados);
    res.status(200).send({msg: 'Ok'});
});

app.listen(7000, () => console.log("Classificação Ok, atendendo porta 7000"));