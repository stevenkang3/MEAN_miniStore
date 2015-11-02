var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider){
$routeProvider.when('/', {
  templateUrl: 'partials/customers.html',
  controller:'CustomersController as customerCtrl',
  controllerAs: 'CustomersController as customerCtrl'
}).when('/orders', {
  templateUrl: 'partials/orders.html',
  controller: 'orders',
  controllerAs:'orders as orderCtrl'
})
.when('/dashboard', {
  templateUrl: 'partials/dashboards.html',
  controller: 'orders',
  controllerAs:'orderCtrl'
})
.when('/products', {
  templateUrl: 'partials/products.html',
  controller: ''
})
.when('/products/:id', {
  templateUrl: 'partials/edit.product.html',
  controller: 'ProductDetailsController as ProductDetailsCtrl',
  // controllerAs:'ProductDetailsCtrl'
})
.otherwise({
  redirectTo: '/',
  controller: 'CustomersController'
});
});

function validVar(var1){
if(var1 === undefined || var1 === null ) {
  return false;
}
return true;
}
