
var Backbone = require('backbone');
var _ = require('underscore');

var Info = Backbone.View.extend({
  template: _.template('Total movies: <%= no %>, Page <%= page %> / <%= totalPages %>'),
  render: function() {
    var moviesNo = this.proxy.superset().size(); 
    var currentPage = this.proxy.getPage() + 1; 
    var totalPages = this.proxy.getNumPages();
    this.$el.html(this.template({no: moviesNo, page: currentPage, totalPages: totalPages}));
    return this;
  },
  initialize: function(options) {
    this.proxy = options.proxy;
    this.listenTo(this.proxy, 'reset', this.render);
  }
});
module.exports = Info;
