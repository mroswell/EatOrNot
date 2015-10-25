var tpl = require('../templates/home.hbs');
var _ = require('underscore');

var Parse = require('parse').Parse;

module.exports = Backbone.View.extend({

  events: {
    'submit form': 'onClickSignup',
    'click #login-form-link': 'onClickLogin',
    'click #register-form-link': 'onClickRegister'
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
    var $regInputs = $('#register-form input');
    var email = username = $regInputs.val();
    var password = $regInputs.val();
    var classname = $('[name="classname"]').val();
    user.set("username", username);
    user.set("email", email);
    user.set("password", password);
    user.set("classname", classname);
    user.save().then(function() {
      Parse.User.logIn(username, password).then(function() {
        window.location="/foods"
      });
    });

    e.preventDefault();
    return false;
  },

  onClickLogin: function(e) {
    $("#login-form").delay(50).fadeIn(50);
    $("#register-form").fadeOut(50);
    $('#register-form-link').removeClass('active');
    $('#login-form-link').addClass('active');
    e.preventDefault();
  },

  onClickRegister: function(e) {
    $("#register-form").delay(50).fadeIn(50);
    $("#login-form").fadeOut(500);
    $('#login-form-link').removeClass('active');
    $('#register-form-link').addClass('active');
    e.preventDefault();
  }
});