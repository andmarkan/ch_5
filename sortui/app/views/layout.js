Backbone.$ = jQuery;

var MoviesList = require('views/moviesList');
var DetailsView = require('views/details');
var ChoseView = require('views/chose');
var Controls = require('views/sort');

var Layout = Backbone.View.extend({

  template: _.template('<div> \
               <nav id="controls"> \
                 <button id="by_title">By Title</button>  \
                 <button id="by_rating">By Rating</button>\
                 <button id="by_showtime">By Showtime</button> \
               </nav>             \
             </div>            \
             <div id="overview">  \
             </div>               \
             <div id="details">   \
             </div>'),

  render: function() {
    this.$el.html(this.template());
    this.controls.setElement(this.$('#controls'));
    this.currentDetails.setElement(this.$('#details')).render();
    this.overview.setElement(this.$('#overview')).render();

    return this;
  },

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


  initialize: function(options) {
    this.controls = new Controls({ collection: options.router.movies });
    this.overview = new MoviesList({
        el: options.el,
        router: options.router,
        collection: options.router.movies
     });
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
