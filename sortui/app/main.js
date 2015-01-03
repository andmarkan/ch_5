var Backbone = require('backbone');
var $ = require('jquery-untouched');
Backbone.$ = $;

var MoviesRouter = require('routers/movies');

module.exports = { Backbone: Backbone, MoviesRouter: MoviesRouter }

