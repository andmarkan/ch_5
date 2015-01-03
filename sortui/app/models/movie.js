var Backbone = require("backbone");
  var Movie = Backbone.Model.extend({
    defaults: {
      title: "default",
      year: 0,
      description: "empty",
      selected: false
    },

    // convert an Epoch timestamp to a Date object
    toShowtimeDate: function() {
     var d = new Date(0);
     d.setUTCSeconds(this.get('showtime'));
     return d;
    },

    // show a Date in the locale timezone
    showtimeToString: function() {
     return this.toShowtimeDate().toLocaleString();
    }
  });
  module.exports = Movie;
