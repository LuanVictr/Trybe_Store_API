const express = require('express');
const productsControllers = require('./controllers/Products.controllers');
const salesControllers = require('./controllers/Sales.controller');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsControllers.getAllProducts);

app.get('/products/:id', productsControllers.getProductById);

app.post('/products', productsControllers.createProduct);

app.post('/sales', salesControllers.createSale);

app.get('/sales', salesControllers.getAllSales);

app.get('/sales/:id', salesControllers.getSaleById);

app.put('/products/:id', productsControllers.updateProduct);

app.delete('/products/:id', productsControllers.deleteProduct);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;