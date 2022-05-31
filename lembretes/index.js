//Uma aplicação node que será gerenciada pelo express
//trazer o express para o contexto (Importar o express e o body-parser)
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');
app.use(bodyParser.json());

//lista de lembretes e variaveis
const lembretes = {};
contador = 0;

//definir como será o get e o put

app.put ('/lembretes', async (req, res) =>{
    contador++;
    const { texto } = req.body;
    lembretes[contador] = {
        contador, texto
    };
    //pedindo para aguardar e adicionar as informações no barramento de eventos
    await axios.post("http://localhost:10000/eventos", {
        tipo: "LembreteCriado",
        dados: {
            contador,
            texto,
        },
    });
    res.status(201).send(lembretes[contador]);
});
    
app.get ('/lembretes', (req, res) =>{
    res.send(lembretes);
});

app.post('/eventos', (req, res) =>{
    console.log(req.body);
    res.status(201).send({msg: "OK"});
});

//servidor deve ficar alerta
app.listen (4000, () =>{
    console.log('Lembretes on. Porta 4000'); 
});
