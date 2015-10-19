

var tpl = require('../templates/home.hbs');
var _ = require('underscore');

var CatsProfileView = require('./cats-profile');

var Parse = require('parse').Parse;

module.exports = Backbone.View.extend({
  events: {
    'click .add-food': 'onClickAddFood',
    'click li': 'onClickCat'

  },
  className: 'food',

  render: function () {
    var self = this;

    if (!this.food) {
      var food = Parse.Object.extend('food');

      (new Parse.Query(food))
        .find()
        .then(function(data){
          self.food = _.invoke(data, 'toJSON');
          console.log(self.food);
          self.render();
        });
      return this;
    }

    var data = {
      food: _.map(self.food, function (food, index) {
        food.zIndex = index;
        food.left = index * 5 + 'px';
        food.top = index * 5 + 'px';
        return food;
      })
    };

    this.catsProfile = new CatsProfileView({

    }).render();

    this.$el.html(
      tpl(data)
    );

    //jQuery stuff goes here

    return this;
  },

  onClickAddFood: function () {
    console.log('a food is added');
  },
  onClickCat: function (e) {

    console.log($(e.target).data('id'));
    $(e.target).remove();
  }

});