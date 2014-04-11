
var Backbone = require('backbone');
var _ = require('underscore');

var Info = Backbone.View.extend({
  template: _.template('No. of movies: <%= no %>'),
  render: function() {
    this.$el.html(this.template({no: this.collection.models.length}));
    return this;
  },
  initialize: function() {
    this.listenTo(this.collection, 'reset', this.render);
  }
});
module.exports = Info;
