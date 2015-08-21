var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrderSchema = new mongoose.Schema ({
  id: String,
  time: String,
  type: String,
  time_deliver: String,
  delivered: Boolean,
	restaurant_id: Schema.Types.ObjectId,
  user_id: Schema.Types.ObjectId,
  name: String,
  total_amount: Number,
  phone: Number,
	items:[
    {
      id: String,
      quantity: Number,
      complete: Boolean,
      name: String,
      category: String,
      sno: Number	
    }
  ],
  type: String,
  complete: Boolean,
  cancel: Boolean
});

mongoose.model('Order', OrderSchema);
