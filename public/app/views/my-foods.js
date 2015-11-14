var tpl = require('../templates/my-foods.hbs');
var _ = require('underscore');

var Parse = require('parse').Parse;

module.exports = Backbone.View.extend({
  events: {
    'click .add-food': 'onClickAddFood',
//    'click li': 'onClickFood',
//    'click #btn-healthy': 'onClickHealthy',
//    'click #btn-not-healthy': 'onClickNotHealthy',
    'click .logout': 'onClickLogout',
    'click #myFood': 'loadMyFood'


  },
  className: 'my-food',

  render: function () {
    var user = Parse.User.current();
    var self = this;

    if (!this.foodchoices) {
      var userFoodChoice = Parse.Object.extend('user_food_choices');
      var user = Parse.User.current();
      var query = new Parse.Query(userFoodChoice)
        .equalTo("user", user)
        .include(["food"])
        .find()
        .then(function (data) {
          //self.foodchoices = _.invoke(data, 'toJSON');
          self.foodchoices = _.map(data, function (foodchoice) {
            foodchoice = foodchoice.toJSON();
            if(foodchoice.food.toJSON) {
            foodchoice.food = foodchoice.food.toJSON();
            }

            return foodchoice;
          })
          self.render();
        });
        return this;
    }

    console.log(self.foodchoices);

    var data = {
      healthyfoods: _.where(self.foodchoices, {healthy: true}),
      unhealthyfoods: _.where(self.foodchoices, {healthy: false})
    };

    this.$el.html(
      tpl(data)
    );
  }
});
