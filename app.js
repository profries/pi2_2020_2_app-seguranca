const express = require('express');
const app = express();
const mongoose = require('mongoose')
const port = 3000

//Importa Rotas
const rotaProduto = require('./rotas/produto_rota');
const rotaUsuario = require('./rotas/usuario_rota');

//Importa usuario_controller para verificar token
const controller = require('./controller/usuario_controller')


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


//Configuração do Mongoose
mongoose.connect('mongodb://localhost/app_produtos', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
  }).then(()=> {
    console.log('BD conectado');
  })
  .catch((error)=> {
    console.log('Error ao conectar ao BD');
  });
mongoose.Promise = global.Promise;

//Middleware para Log
app.use((req,resp,next) => {
  console.log("Request Time: "+Date.now());
  console.log("Method: "+req.method)
  next();
});

app.use('/api/produtos', controller.validaToken);

//Uso das rotas
app.use('/api/produtos', rotaProduto);

app.use('/api/usuarios', rotaUsuario);

app.listen(port, () => {
  console.log(`Iniciando o servidor: http://localhost:${port}`)
})