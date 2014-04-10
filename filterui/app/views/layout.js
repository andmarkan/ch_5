var Backbone = require('backbone');
Backbone.XView = require('backbone.xview');
var _ = require('underscore');

var $ = Backbone.$;

var MoviesList = require('views/moviesList');
var DetailsView = require('views/details');
var ChoseView = require('views/chose');
var Controls = require('views/controls');
var Info = require('views/info');

var Layout = Backbone.XView.extend({

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
    if (this.currentDetails) {
      this.removeView(this.currentDetails);
      this.render();
    }
    var view = new DetailsView({model: movie});
    this.addView('#details', {id: view.cid}, view);
    this.currentDetails = view.cid;
  },

  setChose: function() {
    if (this.currentDetails) {
      this.removeView(this.currentDetails);
      this.render();
    }
    var view = new ChoseView();
    this.addView('#details', {id: view.cid}, view);
    this.currentDetails = view.cid;
  },

  onRender: function() {
    this.controls.setElement($('#controls'));
    $('#info').append(this.info.render().el);
  },
  
  initialize: function(options) {
    this.addView('#overview', new MoviesList({
      collection: options.router.movies,
      router: options.router
    }));
    var superset = new Backbone.Collection(options.router.movies.toJSON());
    this.controls = new Controls({ collection: options.router.movies, superset: superset });
    this.info = new Info({collection: this.collection});
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
