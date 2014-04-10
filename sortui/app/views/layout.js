var Backbone = require('backbone');
Backbone.XView = require('backbone.xview');
var _ = require('underscore');

var $ = Backbone.$;

var MoviesList = require('views/moviesList');
var DetailsView = require('views/details');
var ChoseView = require('views/chose');
var Controls = require('views/sort');

var Layout = Backbone.XView.extend({

  template: _.template('           \
             <a href="#">Home</a>  \
               <nav id="controls"> \
                 <button id="by_title">By Title</button>  \
                 <button id="by_rating">By Rating</button>\
                 <button id="by_showtime">By Showtime</button> \
               </nav>             \
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
  },
  
  initialize: function(options) {
    this.addView('#overview', new MoviesList({
      collection: options.router.movies,
      router: options.router
    }));
    this.controls = new Controls({ collection: options.router.movies });
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
