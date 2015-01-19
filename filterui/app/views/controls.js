var Backbone = require('backbone');
var _ = require('underscore');
var $ = Backbone.$;
Backbone.XView = require('backbone.xview');

var ControlsView = Backbone.View.extend({

  template: _.template('  \
                 <p>Sort:</p> \
                 <button id="by_title">By Title</button>  \
                 <button id="by_rating">By Rating</button>\
                 <button id="by_showtime">By Showtime</button> \
                 <p>Filter</p> \
                 <select name="genre"> \
                   <option value="all"> \
                     All \
                   </option> \
                   <option value="Drama"> \
                     Drama \
                   </option> \
                   <option value="Action"> \
                     Action \
                   </option> \
                 </select>'),

  events: {
     'click #by_title': 'sortByTitle',
     'click #by_rating': 'sortByRating',
     'click #by_showtime': 'sortByShowtime',
     'change select[name="genre"]': 'selectGenre'
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  selectGenre: function(ev) {
    var genre = $("select[name='genre']").val();
    var that = this;
    if (genre === "all") {
      that.movies.reset(that.superset.toJSON());
    }
    else {
      // remove operation that causes unecessary rendering
      this.filterByCategory(genre);
    }
  },

  filterByCategory: function(genre) {
    // since we need an untouched collection, we can use the superset
     var filtered = this.superset.filter(function(m) { 
       return (_.indexOf(m.get('genres'), genre) !== -1)
     });
     this.movies.reset(filtered);
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
