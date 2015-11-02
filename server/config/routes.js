var users = require('../controllers/users.js');

module.exports = function(app) {
//Customer Controller
app.get('/customers', function(request, response) { users.index(request, response) }) /* Index */
// app.get('/users/new', function(request, response) { users.create(request, response) }) /* New */
app.get('/customers/:id', function(request, response) { users.show(request, response) }) /* Show */
// app.post('/users/:id/edit', function(request, response) { users.update(request, response) }) /* Edit  */
app.post('/customers', function(request, response) { users.create(request, response);})	 /* Create */
app.delete('/customers/:id', function(request, response) {users.destroy(request, response);}) /* Destroy app.delete('/users/:id') */
app.put('/customers/:id', function(request, response) { users.update(request, response) }) /* Update app.put/patch('/users/:id')  */

//ORDERS controller
app.get('/orders', function(request, response) { users.orders(request, response) }) /* Index */
app.post('/orders', function(request, response) { console.log('here'); users.addOrder(request, response)})


//PRODUCTS controller
app.get('/products', function(request, response) { users.products(request, response) }) /* Index */
app.get('/products/:id', function(request, response) { console.log('routes');users.show(request, response) }) /* Show */
app.post('/products', function(request, response) {  users.addProduct(request, response)})
app.delete('/products/:id', function(request, response) {users.destroyProduct(request, response);}) /* Destroy app.delete('/users/:id') */
app.put('/products/:id', function(request, response) { users.update(request, response)})
app.put('/product/:id', function(request, response) { users.updateProduct(request, response)})
}
