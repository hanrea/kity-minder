export class HomeComponent {
  static selector = 'homeComponent';
  static template = require('./home.html');
  static $bindings = {};
  static $inject = ['$state'];
  constructor($state) {
    this.$state = $state;
  }
}
