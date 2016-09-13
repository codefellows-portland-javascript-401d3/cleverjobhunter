import angular from 'angular';
import router from 'angular-ui-router';
import components from './components';
import services from './services';
import md from 'angular-material';
import messages from 'angular-messages';
import 'angular-material/angular-material.css';
import 'angular-ui-router/release/stateEvents';

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
    .primaryPalette('grey')
    .backgroundPalette('blue-grey')
    .warnPalette('amber');
}]);

export default app;
