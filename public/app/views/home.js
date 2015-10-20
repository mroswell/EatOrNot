var tpl = require('../templates/home.hbs');
var _ = require('underscore');

var FoodProfileView = require('./food-profile');

var Parse = require('parse').Parse;

module.exports = Backbone.View.extend({
  events: {
    'click .add-food': 'onClickAddFood',
//    'click li': 'onClickFood',
    'click #btn-healthy': 'onClickHealthy',
    'click #btn-not-healthy': 'onClickNotHealthy'

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

//    console.log($(e.target).data('id'));
//    console.log($('ul li:last-of-type[z-index]').data('id'));
//    console.log($('ul li:last-of-type'));
//    console.log($('ul li:last-of-type[z-index]'));
//    console.log($('ul li:last-child'));
//    console.log($('ul li:last-child').data('id'));
//    console.log($('li:last'));
    console.log($('.food-item:last'));
    console.log($('.food-item:last').data('id'));

    var Cats = Parse.Object.extend('Cats');

    $('.food-item:last').remove();

    new Cats({
      name: 'Healthy Harry'
    }).save().then(function () {
        //saved
        console.log("saved");
      }).catch(function (err) {
        //error
        console.log("error");
      });
  },
  onClickNotHealthy: function (e) {
;
    console.log($('.food-item:last').data('id'));

    var Cats = Parse.Object.extend('Cats');

    $('.food-item:last').remove();

    new Cats({
      name: 'Unhealthy Harry'
    }).save().then(function () {
        //saved
        console.log("saved");
      }).catch(function (err) {
        //error
        console.log("error");
      });
  }

});