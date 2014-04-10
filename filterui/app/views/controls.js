var Backbone = require('backbone');
var _ = require('underscore');
var $ = Backbone.$;
Backbone.XView = require('backbone.xview');

var ControlsView = Backbone.View.extend({

  events: {
     'click #by_title': 'sortByTitle',
     'click #by_rating': 'sortByRating',
     'click #by_showtime': 'sortByShowtime',
     'change select[name="genre"]': 'selectGenre'
  },

  selectGenre: function(ev) {
    var genre = $("select[name='genre']").val();
    var that = this;
    if (genre === "all") {
      that.collection.reset(that.superset.toJSON());
    }
    else {
      that.collection.reset(that.superset.toJSON());
      this.filterByCategory(genre);
    }
  },

  filterByCategory: function(genre) {
     var filtered = this.movies.filter(function(m) { 
       return (_.indexOf(m.get('genres'), genre) !== -1)
     });
     this.collection.reset(filtered);
  },

  sortByTitle: function(ev) {
    this.movies.reset(this.movies.sortByTitle());
  },

  sortByRating: function(ev) {
    this.movies.reset(this.movies.sortByRating());
  },

  sortByShowtime: function(ev) {
    this.movies.reset(this.movies.sortByShowtime());
  },

  initialize: function(options) {
    this.movies = this.collection;
    this.superset = options.superset;
  }
});
module.exports = ControlsView;
