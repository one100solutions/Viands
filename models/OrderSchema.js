var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrderSchema = new mongoose.Schema ({
  time: String,
  type: String,
  time_deliver: String,
	restaurant_id: Schema.Types.ObjectId,
  user_id: Schema.Types.ObjectId,
	items:[
    {
      id: String,
      quantity: Number,
      complete: Boolean
    }
  ],
  type: String
});

mongoose.model('Order', OrderSchema);
