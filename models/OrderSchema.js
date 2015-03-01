var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema ({
  time: String,
  items: [
    {
      item_id: String,
      quantity: Number
    }
  ],
  type: String
});

mongoose.model('Order', OrderSchema);
