var tpl = require('../templates/home.hbs');
var Parse = require('parse').Parse;
var _ = require('underscore');

module.exports = Backbone.View.extend({
//	render: function (state) {
//		if (!state) state = 'loaded';
//
//		//put other possible states here
//
//		this.$el.html(tpl({
//			is_loaded: state === 'loaded'
//		}));

		//jQuery stuff goes here
    render: function () {
      var self = this;

      if (!this.food) {
        var food = Parse.Object.extend('food');
        (new Parse.Query(food))
          .find()
          .then(function(data){
            self.food = _.invoke(data, 'toJSON');
            console.log(self.food);
            console.log(self.food[0].url);
            self.render();
          });
        return this;
      }

      var data = {
        foods: self.food
      };

      this.$el.html(
        tpl(data)
      );

      return this;
	}
});