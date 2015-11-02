var User = mongoose.model('Customer');
var Order = mongoose.model('Order');
var Product = mongoose.model('Product');
var errors_array = [];
module.exports = (function() {
	return {
		index: function(request, response){
			User.find({}, function(err, records){
				response.json(records);
			})
		},

		create: function(request, response){
			console.log(request.body.name);
			User.find({name: request.body.name}, function(err, records){
				if(records[0] && records[0].name){
					if(records[0].name == request.body.name){ return response.json({error: 'That username already exists'}); }
				}
				else{
					var user = new User();
					user.name = request.body.name;
					user.save(function(err){
						if(err){
							response.json({error: err});
						}
						else{ return response.json({error:" "}); }
						})
					}
				})
			},

		// edit: function(request, response){
		// 	console.log("Server / Ctrl / Users - Edit")
		// },
		update: function(request, response){
			console.log("Server / Ctrl / Users - Update", request.params.id)
			User.findOneAndUpdate({_id:request.params.id}, {$set:{first_name: request.body.first_name, last_name: request.body.last_name }}, {new:true}, function(err, record){
				if(err){ response.json(null); }
				else{ response.json(record); }
			})

		},
		show: function(request, response){
			console.log("Server / Ctrl / Users - Show");
			User.findOne({_id:request.params.id}, function(err, record){
				if(err){ response.json(null); }
				else{ response.json(record); }
			})
		},

		destroy: function(request, response){
			console.log("Server / Ctrl / Users - Destroy")
			console.log(request.params.id);
			User.remove({_id:request.params.id}, function(err){
				if(err){ response.json(false); }
				else{ response.json(true); }
			})
		},

// ================ ORDERS ******************
		orders: function(request, response){
					Order.find({}, function(err, records){
						response.json(records);
					})
				},

		addOrder: function(request, response){
					console.log('lastcontroller: here', request.body);
					var order = new Order();
					order.name = request.body.name;
					order.quantity = request.body.quantity;
					order.product = request.body.product;
					order.save(function(err){
						if(err){ response.json(false); }
						else{ response.json(true); }
					})
				},

// ============= Products ===============
products: function(request, response){
			Product.find({}, function(err, records){
				response.json(records);
			})
		},

addProduct: function(request, response){
			var product = new Product();
			product.name = request.body.name;
			product.url = request.body.url;
			product.description =request.body.description;
			product.quantity = request.body.quantity;
			product.save(function(err){
				if(err){ response.json(false); }
				else{ response.json(true); }
			})
		},
		destroyProduct: function(request, response){
			console.log(request.params.id);
			Product.remove({_id:request.params.id}, function(err){
				if(err){ response.json(false); }
				else{ response.json(true); }
			})
		},

		show: function(request, response){
			console.log("Server / Ctrl / Users - Show");
			Product.findOne({_id:request.params.id}, function(err, record){
				if(err){ response.json(null); }
				else{ response.json(record); }
			})
		},

		update: function(request, response){
		// console.log(request.body);
		// console.log('lastcontroller: here', request.body.quantity);
		Product.find({name: request.body.product}, function(err, records)
		{
			if((records[0].quantity) >= (parseInt(request.body.quantity))){
			var newQ = (records[0].quantity) - (parseInt(request.body.quantity));
			Product.findOneAndUpdate({name: request.body.product}, {$set: {quantity: newQ}}, {new:true}, function(err, rec){
				console.log(rec);
				if(err){ response.json(null); }
				else{ response.json(rec); }
				})
				} else { response.json(false)}
			}); // {$inc{quantity: -request.body.quantity}
		},

		updateProduct: function(request, response){
			console.log("Server / Ctrl / Users - Update", request.params.id)
			Product.findOneAndUpdate({_id:request.params.id}, {$set:{name: request.body.name, url: request.body.url, description: request.body.description, quantity: request.body.quantity }}, {new:true}, function(err, record){
				if(err){ response.json(null); }
				else{ response.json(record); }
			})
		},

}
})();
