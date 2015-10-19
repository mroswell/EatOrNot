//var tpl = require('../templates/cats.hbs');
//
//module.exports = Backbone.View.extend({
//  render: function (state) {
//    if (!state) state = 'loaded';
//    if (state === 'loading') {
//      setTimeout(function() {
//          this.render('loaded', [{
//            name:'Felix'
//          }, {
//            name: 'Buttons'
//          }
//          ])
//        }
//      )
//    }
//    if (!state) state = 'loaded';
//
//
//    //put other possible states here
//
//    this.$el.html(tpl({
//      is_loaded: state === 'loaded'
//    }));
//
//    //jQuery stuff goes here
//
//    return this;
//  }
//});

var tpl = require('../templates/cats.hbs');
var _ = require('underscore');

var CatsProfileView = require('./cats-profile');

var Parse = require('parse').Parse;

module.exports = Backbone.View.extend({
  events: {
    'click .add-food': 'onClickAddCat',
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

  onClickAddCat: function () {
    console.log('a cat is added');
  },
  onClickCat: function (e) {

    console.log($(e.target).data('id'));
    $(e.target).remove();
  }

});