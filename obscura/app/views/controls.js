var Backbone = require('backbone');
var _ = require('underscore');
var $ = Backbone.$;
Backbone.XView = require('backbone.xview');

var ControlsView = Backbone.View.extend({

  events: {
     'click #by_title': 'sortByTitle',
     'click #by_rating': 'sortByRating',
     'click #by_showtime': 'sortByShowtime',
     'change select[name="genre"]': 'selectGenres'
  },

  filterByCategory: function(genre) {
    this.collection.filterBy(genre, function(movie) {
      var genreFound = _.indexOf(movie.get('genres'), genre);
      return (genreFound != -1);
    })
  },

  selectGenres: function(genres) {
    var that = this;
    _.each([genres], function(genre) {
      that.filterBy(genre, function(movie) { 
        var genreFound = _.indexOf(movie.get('genres'), genre);
        return (genreFound !== -1);
      });
    });
  },

  paginate: function(action) {
    if (action === 'next') {
      this.proxy.nextPage();
    }
    else {
      this.proxy.prevPage();
    }
  },

  sortByTitle: function(ev) {
    this.proxy.setSort("title", "asc");
  },
  
  sortByRating: function(ev) {
    this.proxy.setSort("rating", "desc");
  },
  
  sortByShowtime: function(ev) {
    this.proxy.setSort("showtime", "asc");
  },

  initialize: function(options) {
    this.proxy = options.proxy;
  }
});
module.exports = ControlsView;
