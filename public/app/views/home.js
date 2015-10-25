var tpl = require('../templates/home.hbs');
var _ = require('underscore');

var Parse = require('parse').Parse;

module.exports = Backbone.View.extend({

  events: {
    'submit form': 'onClickSignup'
  },

  render: function () {
    if (Parse.User.current()) {
      window.location = "/foods";
    }
    var self = this;

   this.$el.html(
      tpl()
    );

    //jQuery stuff goes here

    return this;
  },

  onClickSignup: function(e) {
    console.log('Signup');
    var user = new Parse.User();
    var $email = $('[name="email"]').val();
    var username = $email;
    var email = $email;
    var password = $('[name="password"]').val();
    var classname = $('[name="classname"]').val();
    user.set("username", username);
    user.set("email", username);
    user.set("password", password);
    user.set("classname", classname);
    user.save().then(function() {
      Parse.User.logIn(username, password).then(function() {
        window.location="/foods"
      });
      }
    );

    e.preventDefault();
    return false;
  }

});