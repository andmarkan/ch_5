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
             <header>              \
             <a href="#">Home</a>  \
               <nav id="controls"> \
               </nav>              \
               <span id="info">    \
               </span>             \
             </header>             \
             <div id="overview">   \
             </div>                \
             <div id="details">    \
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
    this.controls.setElement(this.$('#controls')).render();
    this.info.setElement(this.$('#info')).render();
    this.currentDetails.setElement(this.$('#details')).render();
    this.overview.setElement(this.$('#overview')).render();

    return this;
  },

  initialize: function(options) {
    var superset = new Backbone.Collection(options.router.movies.models);
    this.overview = new MoviesList({
       el: options.el,
       collection: options.collection,
       router: options.router
    });
    this.controls = new Controls({ collection: options.router.movies, superset: superset });
    this.info = new Info({collection: options.router.movies});

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
