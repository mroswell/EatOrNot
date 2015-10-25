var $ = require('jquery');
var _ = require('underscore');
var Parse = require('parse').Parse;


//// Put on top of every file that uses Parse
//var Parse = require('parse').Parse;
//Parse.initialize(
//  //app ID
//  'APPIDGOES HERE',
//  // JS Key
//  'JS KEY GOES HERE'
//);

require('backbone');
require('jquery-ui');
require('bootstrap/dist/css/bootstrap.css');
require('./style.css');

//var config = require('./config');
var Router = require('./router');

var containerTpl = require('./templates/container.hbs');

var app = {
	init: function () {
    Parse.initialize(
      // app ID
      'kXSE7zWgHs4CyTSEF2jZma0wasi9KO2ahLxxrZCm',
      // JS key
      'hikE9HYfNVQAdGlXez9Zxld0a6Q3dIhFblh4nsb7'
    );

//    var Cats = Parse.Object.extend('Cats');
//    (new Parse.Query(Cats))
//      .get('ZCXIAG78d4')
//      .then(_.bind(function(data){
//        console.log(data.toJSON());
//      }));

//    var food = Parse.Object.extend('food');
//    (new Parse.Query(food))
//      .get('ZCXIAG78d4')
//      .then(function(data){
//        console.log(data.toJSON());
//        self.cats = data.toJSON();
//      });


    $('body').append(containerTpl({
			site_name: 'Eat or Not',
			routes: [{
				url: '/',
				name: 'Home'
			}],
			footer: '(c) 2015 Eat or Not Team'
		}));

		this.router = new Router();
		
		Backbone.history.start({
			pushState: true
		});
	}
};

$(function () {
	app.init();
});