chai = require 'chai'
expect = chai.expect

request = require 'request'

host = require '../../lib/host'
url = host.url

describe 'get Api tests', ->

  it 'should show a list of restaurants', (done) ->

    request.get url + 'restaurants', (status, response, body) ->
      body = JSON.parse body
      console.log body
      expect(body.err).to.be.equal(false)
      expect(body.restaurants[0].admin).to.be.equal(null)
      expect(body.restaurants).to.be.a('array')
      done()
