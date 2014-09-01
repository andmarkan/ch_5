var Backbone = require('backbone');
var _ = require('underscore');

var $ = Backbone.$;

var MoviesList = require('views/moviesList');
var DetailsView = require('views/details');
var ChoseView = require('views/chose');
var Controls = require('views/controls');
var Info = require('views/info');

var Layout = Backbone.View.extend({

  template: _.template('           \
             <header>   \
             <a href="#">Home</a>  \
               <nav id="controls"> \
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
                 </select> \
               </nav> \
               <span id="info">  \
               </span>               \
             </header>            \
             <div id="overview">  \
             </div>               \
             <div id="details">   \
             </div>'),

  setDetails: function(movie) {
    if (this.currentDetails) this.currentDetails.remove();
    this.currentDetails = new DetailsView({model: movie});
    this.render();
  },

  setChose: function() {
    if (this.currentDetails) this.currentDetails.remove();
    this.currentDetails = new ChoseView();
    this.render();
  },

  render: function() {
    this.$el.html(this.template());
    this.currentDetails.setElement(this.$('#details')).render();
    this.overview.setElement(this.$('#overview')).render();

    return this;
  },

  onRender: function() {
    this.controls.setElement($('#controls'));
    $('#info').append(this.info.render().el);
  },
  
  initialize: function(options) {
    var superset = new Backbone.Collection(options.router.movies.models);
    this.overview = new MoviesList({
       el: options.el,
       collection: options.collection,
       router: options.router
    });
    this.controls = new Controls({ collection: options.router.movies, superset: superset });
    this.info = new Info({collection: this.collection});

     this.currentDetails = new ChoseView();
  }

});

var instance;
Layout.getInstance = function(options) {
  if (!instance) {
    instance = new Layout({
      el: options.el,
      router: options.router,
      collection: options.router.movies
    });
  }
  return instance;
}
module.exports = Layout;
