//component for the main user page for positions
import template from './positions.html';
import styles from './positions.scss';

export default {
  template,
  controller
};

controller.$inject = ['positionService', '$window', '$mdDialog', 'companyService'];
function controller(positionService, $window, $mdDialog, companyService){
  this.styles = styles;
  this.userId = $window.localStorage['id'];
  this.addButton = 'add';

  companyService.getByUser(this.userId)
    .then(companies => {
      this.companies = companies;
    })
    .catch(err => console.log(err));

  //gets all positions
  positionService.getByUser(this.userId)
    .then(positions => {
      this.positions = positions;
      console.log(this.positions);
    })
    .catch(err => console.log(err));

  //adds new position
  this.add = (positionToAdd, userId) => {
    positionService.add(positionToAdd, userId)
      .then(addedPosition => {
        this.positions.unshift(addedPosition);
        this.addButton = 'add';
      })
      .catch(err => console.log(err));
  };

  //removes selected postion
  this.remove = positionId => {
    positionService.remove(positionId)
      .then(() => {
        positionService.getByUser(this.userId)
          .then(positions => {
            this.positions = positions;
          })
    .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  //opens dialog/form to add a new position
  this.newPosition = ($event) => {
    var parentEl = angular.element(document.body);
    $mdDialog.show({
      parent: parentEl,
      targetEvent: $event,
      controllerAs: '$ctrl',
      bindToController: true,
      template: '<new-position companies="$ctrl.companies" add="$ctrl.add" position="$ctrl.position"></new-position>',
      controller() {},
      locals: {
        position: this.position,
        add: this.add,
        companies: this.companies
      },
      clickOutsideToClose: true,
      escapeToClose: true
    })
    .then(newPosition => {
      if(!newPosition) return;
      angular.copy(newPosition, this.position);
    });
  };

};
