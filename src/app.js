const express = require('express');
const productsControllers = require('./controllers/Products.controllers');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsControllers.getAllProducts);

app.get('/products/:id', productsControllers.getProductById);

app.post('/products', productsControllers.createProduct);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;