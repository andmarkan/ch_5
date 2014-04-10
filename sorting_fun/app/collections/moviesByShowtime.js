  var Backbone = require('backbone');
  var _ = require('underscore');

  var MoviesByShowtime = Backbone.Collection.extend({

     comparator: function(movie) {
       return movie.get('showtime');
     },

     log: function() {
       _.each(this.toJSON(), function(movie) {
         var showtime = new Date(movie.showtime * 1000);
         console.log(movie.title + "   " + showtime.toLocaleString() + "(" + movie.showtime + ")");
       });
     }
   })
   module.exports = MoviesByShowtime;
