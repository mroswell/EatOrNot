var $ = require('jquery');
var _ = require('underscore');

require('backbone');
require('bootstrap/dist/css/bootstrap.css');

var config = require('./config');
var Router = require('./router');

var containerTpl = require('./templates/container.hbs');

var app = {
	init: function () {
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