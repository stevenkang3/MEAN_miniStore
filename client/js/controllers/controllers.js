app.controller('CustomersController', function($scope, CustomerFactory) {

var that = this;

function getCustomers(){
  CustomerFactory.getCustomers(function(customers){
    that.customers = customers;
    $scope.newCustomer = {};
  })
}
getCustomers();

this.addCustomer = function(newCustomer) {

  CustomerFactory.addCustomer(newCustomer, function(response){
    that.errors = response;
    getCustomers();
  })
}

this.destroyCustomer = function(customer){

  CustomerFactory.destroyCustomer(customer, function(){
    getCustomers();
  })
}
});

app.controller('orders', function($scope, OrderFactory, CustomerFactory, ProductFactory) {

  var that = this;

  function getCustomers(){
    CustomerFactory.getCustomers(function(customers){
      that.customers = customers;
    })
  }
  getCustomers();

  function getProduct(){
    ProductFactory.getProducts(function(products){
      that.products = products;
    })
  }
  getProduct();

  function getOrders(){
    OrderFactory.getOrders(function(orders){
      that.orders = orders;
    })
  }
  getOrders();

  this.addOrder = function(newOrder) {
    if(newOrder == undefined || newOrder.name == undefined || newOrder.quantity == undefined || newOrder.product == undefined){
      that.errors = 'Must fill in all fields';
    }
    else{
    OrderFactory.addOrder(newOrder, function(){
      ProductFactory.updateInventory(newOrder, function(){
        getOrders();
        that.errors = "";
      })
    })
  }
  }

});

app.controller('products', function($scope, ProductFactory, $location){

  var that = this;

  function getProduct(){
    ProductFactory.getProducts(function(products){
      that.products = products;
      $scope.newProduct = {};
    })
  }
  getProduct();

  this.editProduct = function(product){
			$location.path('/products/'+product._id);
		}

  this.addProduct = function(newProduct) {
    if(newProduct == undefined || newProduct.name == undefined || newProduct.description == undefined || newOrder.quantity == undefined){
      that.errors = 'Must fill in all fields';
    }
    else{
      ProductFactory.addProduct(newProduct, function(){
        getProduct();
      })
    }
  }
  this.destroyProduct = function(product){
    ProductFactory.destroyProduct(product, function(){
      getProduct();
    })
  }

});

app.controller("ProductDetailsController", function(ProductFactory, $routeParams){
  var that = this;
  ProductFactory.getProduct($routeParams.id, function(product){
    that.product = product;
    that.product.name = product.name;
    that.product.url = product.url;
    that.product.description = product.description;
    that.product.quantity = product.quantity;
  });

  function getProduct(){
    ProductFactory.getProducts(function(products){
      that.products = products;
    })
  }
  getProduct();

  this.updateProduct = function(product){
  ProductFactory.updateProduct(product, function(product){
    that.product = product;
    that.errors = 'Updated Successfully';
    getProduct();
  });
}

})
