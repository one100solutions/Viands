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
  phone: Number,
	items:[
    {
      id: String,
      quantity: Number,
      complete: Boolean
    }
  ],
  type: String,
  complete: Boolean
});

mongoose.model('Order', OrderSchema);
