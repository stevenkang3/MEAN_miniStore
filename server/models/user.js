var mongoose = require('mongoose');
var validate = require('mongoose-validator');

var nameValidator =[
  validate({
    validator: 'isLength',
    arguments: [4,30],
    message: 'Name should be between 4 and 30 characters'
  })
];

var CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true, validate: nameValidator},
  created_at: { type: Date, default: Date.now },
});

mongoose.model('Customer', CustomerSchema);
CustomerSchema.path('name').required(true, "Name is required");

var OrderSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  quantity: Number,
  product: { type: String, trim: true },
  created_at: { type: Date, default: Date.now },
});

mongoose.model('Order', OrderSchema);
// CustomerSchema.path('name').required(true, "Name is required");
// CustomerSchema.path('quantity').required(true, "Quantity is required");
// CustomerSchema.path('product').required(true, "Product is required");
var ProductSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  url: { type: String, trim: true },
  description: { type: String, trim: true },
  quantity: Number,
  created_at: { type: Date, default: Date.now },
});

mongoose.model('Product', ProductSchema);
