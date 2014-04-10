  var Backbone = require('backbone');
  var _ = require('underscore');

  MoviesByTitle = Backbone.Collection.extend({
    sortByTitle: function() {
      return this.sortBy('title');
    },
    log: function() {
       _.each(this.toJSON(), function(movie) {
         var showtime = new Date(movie.showtime * 1000);
         console.log(movie.title + "   " + showtime.toLocaleString()
                      + "(" + movie.showtime + ")");
       });
    }
  })
  module.exports = MoviesByTitle;
