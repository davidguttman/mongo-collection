# Mongo Collection #

You should probably never need this, but I use it because I can never remember / can't be bothered to remember how to get a collection using Mongoskin.

## Usage ##

    var mc = require('mongo-collection');

    var dogsCollection = mc('localhost', 'animals-db', 'dogs');

    dogsCollection.find(...) // etc...

