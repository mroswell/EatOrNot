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
var Parse = require('parse').Parse;
module.exports = Backbone.View.extend({
  events: {
    'click .add-cat': 'onClickAddCat'
  },
  render: function () {
    var self = this; //create reference to self
    if (!this.cats) {
      var Cats = Parse.Object.extend('Cats');
      (new Parse.Query(Cats))
        .find()
        .then(function(data){
          self.cats = data.toJSON();
        });
      return this;
    }
    this.$el.html(
      tpl(data)
    );
    //jQuery stuff goes here

    return this;
  },
  onClickAddCat: function () {
    console.log('a cat is added');
  }
});