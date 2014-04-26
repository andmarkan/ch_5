var Backbone = require('backbone');

var Movie = Backbone.Model.extend({

  toShowtimeDate: function() {
     var d = new Date(0);
     d.setUTCSeconds(this.get('showtime'));
     return d;
   },

   showtimeToString: function() {
     return this.toShowtimeDate().toLocaleString();
   }

});
module.exports = Movie;
