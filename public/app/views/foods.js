var tpl = require('../templates/foods.hbs');
var _ = require('underscore');

var FoodProfileView = require('./food-profile');

var Parse = require('parse').Parse;

module.exports = Backbone.View.extend({
  events: {
    'click .add-food': 'onClickAddFood',
//    'click li': 'onClickFood',
    'click #btn-healthy': 'onClickHealthy',
    'click #btn-not-healthy': 'onClickNotHealthy',
    'click .logout': 'onClickLogout'


  },
  className: 'food',

  render: function () {
    var user = Parse.User.current();
    console.log(user);
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

    this.foodProfile = new FoodProfileView({

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
  onClickFood: function (e) {

    console.log($(e.target).data('id'));

    var Cats = Parse.Object.extend('Cats');

    new Cats({
      name: 'Harry'
    }).save().then(function () {
        //saved
        console.log("saved");
      }).catch(function (err) {
        //error
        console.log("error");
      });
    $(e.target).remove();
  },
  onClickHealthy: function (e) {
    var bool = true;
    var $topFoodItem = $('.food-item:last');
    var foodID = $topFoodItem.data('id');

    $topFoodItem.remove();

    this.createUserFoodChoice(bool, foodID);
  },
  onClickNotHealthy: function (e) {
    var bool = false;
    var $topFoodItem = $('.food-item:last');
    var foodID = $topFoodItem.data('id');

    $topFoodItem.remove();

    this.createUserFoodChoice(bool, foodID);
  },

  createUserFoodChoice: function(bool, foodID) {

  var user = Parse.User.current();
  var userFoodChoices = Parse.Object.extend('user_food_choices');
  var food = Parse.Object.extend('food');

  new userFoodChoices({
    food: new food({objectId: foodID}),
    user: user,
    healthy: bool
  }).save().then(function () {
      //saved
      console.log("saved");
    }).fail(function (err) {
      //error
      console.log("error");
    });
  },

  onClickLogout: function(e) {
    Parse.User.logOut().then(function() {
      console.log('logged out');
    });

    e.preventDefault();
    return false;
  }

});