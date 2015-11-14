var HomeView = require('./views/home');
var FoodsView = require('./views/foods');
var MyFoodsView = require('./views/my-foods');

module.exports = Backbone.Router.extend({
	routes: {
		'': function () {
			appendView(new HomeView().render());
		},
    'foods': function () {
      appendView(new FoodsView().render());
    },
    'my-foods': function () {
      appendView(new MyFoodsView().render());
    }
	}
});

function appendView(view) {
	$('.main')
		.empty()
		.append(view.$el);
}
