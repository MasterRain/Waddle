Router.configure({
    layoutTemplate: 'Layout'
});

Router.route('/', {
    template: 'searchModules'
}, {
  name: 'searchModules'
});

Router.route('/login', function () {
  this.render('login');
}, {
  name: 'login'
});

Router.route('/questionBoard', function () {
  this.render('questionBoard');
}, {
  name: 'questionBoard'
});

Router.route('/lecturerCarousel', function () {
  this.render('lecturerCarousel');
}, {
  name: 'lecturerCarousel'
});