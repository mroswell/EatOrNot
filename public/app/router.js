var HomeView = require('./views/home');
var CatsView = require('./views/cats');

module.exports = Backbone.Router.extend({
	routes: {
		'': function () {
			appendView(new HomeView().render());
		},
    'cats': function () {
      appendView(new CatsView().render());
    }
	}
});

function appendView(view) {
	$('.main')
		.empty()
		.append(view.$el);
}