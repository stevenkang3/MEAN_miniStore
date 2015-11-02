app.factory('CustomerFactory', function($http){
  var factory = {};
  factory.user = {};

  factory.getCustomers = function(callback) {
    $http.get('/customers').success(function(response){
      callback(response);
    })
  }

  factory.addCustomer = function(newCustomer, callback) {
    $http.post('/customers', newCustomer).success(function(response){
      console.log('factory',response);
      callback(response);
    })
  }

    factory.destroyCustomer = function(customer, callback){
    $http.delete('/customers/'+ customer._id).success(function(response){
      callback(response);
    })
  }
  return factory;
});

// =============== Order Factory =====================
app.factory('OrderFactory', function($http){
  var factory = {};

  factory.getOrders = function(callback) {
    $http.get('/orders').success(function(response){
      callback(response);
    })
  }
  factory.addOrder = function(newOrder, callback){
    console.log('factory: here', newOrder);
    $http.post('/orders', newOrder).success(function(response){
      callback();
    })
  }
  return factory;
});

// ============== Product Factory ================
app.factory('ProductFactory', function($http){
  var factory = {};

  factory.getProducts = function(callback) {
    $http.get('/products').success(function(response){
      callback(response);
    })
  }

  factory.getProduct = function(id, callback){
    console.log('factory edit', id)
    $http.get('/products/'+id).success(function(product){
      console.log(product);
      callback(product);
    })
  }

  factory.addProduct = function(newProduct, callback){
    $http.post('/products', newProduct).success(function(response){
      callback();
    })
  }
  factory.destroyProduct = function(product, callback){
    $http.delete('/products/'+ product._id).success(function(response){
      callback(response);
    })
  }

  factory.updateInventory = function(newQuantity, callback){
        console.log('factory: update', newQuantity);
    $http.put('/products/'+ newQuantity.product, newQuantity).success(function(response){
      callback(response);
    })
  }

  factory.updateProduct = function(user, callback){
    $http.put('/product/'+user._id, user).success(function(response){
      console.log('responded', response);
      callback(response);
    });
  }
  return factory;
})
