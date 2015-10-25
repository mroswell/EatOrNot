var HomeView = require('./views/home');
var FoodsView = require('./views/foods');

module.exports = Backbone.Router.extend({
	routes: {
		'': function () {
			appendView(new HomeView().render());
		},
    'foods': function () {
      appendView(new FoodsView().render());
    }
	}
});

function appendView(view) {
	$('.main')
		.empty()
		.append(view.$el);
}