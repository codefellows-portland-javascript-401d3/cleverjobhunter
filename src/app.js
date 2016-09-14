import angular from 'angular';
import router from 'angular-ui-router';
import components from './components';
import services from './services';
import md from 'angular-material';
import messages from 'angular-messages';
import 'angular-material/angular-material.css';
import 'angular-ui-router/release/stateEvents';
// import angularMoment from 'angularMoment';

const app = angular.module('jobHunter', [
  router,
  angular.module('ui.router.state.events').name,
  components,
  services,
  md,
  messages
]);

app.config(['$mdThemingProvider', function($mdThemingProvider){
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('lime')
    .backgroundPalette('blue-grey')
    .warnPalette('lime')
    .dark();
}]);

export default app;
