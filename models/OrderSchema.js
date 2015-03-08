var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema ({
  time: String,
  type: String,
  time_deliver: String,
  items: [
    {
      item_id: String,
      quantity: Number,
      complete: Boolean
    }
  ],
  type: String
});

mongoose.model('Order', OrderSchema);
