x = require './excel2json'

mongoose = require 'mongoose'

require '../app'

require '../models/RestaurantSchema'

tokenize = require '../lib/tokenize'

Restaurant = mongoose.model 'Restaurant'

rest = new Restaurant
  name: 'Food Court - RVCE',
  location: 'Mysore Road',
  admin: {
    username: 'akash',
    password: tokenize('akash')
  }
  menu: []

x '/home/ubuntu/Viands/Menu.xlsx', (data) ->
  for item in data.message
    if item
      item.available = true
      console.log item
      rest.menu.push item

  console.log rest

  rest.save (err) ->
    console.log 'OK' unless err
    process.exit(0)
