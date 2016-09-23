import template from './dashboard.html';
import styles from './dashboard.scss';

export default {
  template,
  controller
};

controller.$inject = ['$window', 'companyService', 'contactService', 'positionService', 'actionItemService', '$mdDialog', '$state' ];
function controller($window, companyService, contactService, positionService, actionItemService, $mdDialog, $state){
  this.styles = styles;
  this.userId = $window.localStorage['id'];

  // I think it would make more sense for these to be
  // dispatched individually, that way the UI could be populated
  // as each part returns.
  // With this approach, you're waiting until all data is
  // retrieved before showing the user anything
  Promise.all([
    actionItemService.getDueAndOverdue(this.userId),
    companyService.getByUser(this.userId),
    companyService.getCountForWeek(this.userId),
    contactService.getByUser(this.userId),
    contactService.getCountForWeek(this.userId),
    positionService.getByUser(this.userId),
    positionService.getCountForWeek(this.userId)
  ])
  .then(([
    actionItems,
    companies,
    companiesWeek,
    contacts,
    contactsWeek,
    positions,
    positionsWeek
  ]) => {
    this.almostDue = actionItems.almostDue;
    this.overDue = actionItems.overDue;
    this.companies = companies;
    this.numCompanies = companies.length;
    this.companyCount = companiesWeek;
    this.contacts = contacts;
    this.numContacts = contacts.length;
    this.contactCount = contactsWeek;
    this.positions = positions;
    this.numPositions = positions.length;
    this.positionCount = positionsWeek;
  })
  .catch(err => console.log(err));

  this.complete = (id, category) => {
    actionItemService.remove(id)
    .then(removed => {
      if (category === 'due') {
        
        const index = this.almostDue.findIndex(e => id === e._id);
        this.almostDue.splice(index, 1);
        
        // this will continue to loop through the whole list
        // even after a match as been made
        // this.almostDue.forEach((e,i) => {
        //   if (id === e._id) {
        //     this.almostDue.splice(i, 1);
        //   }
        // });
      } else {
        this.overDue.forEach((e,i) => {
          if (id === e._id) {
            this.overDue.splice(i, 1);
          }
        });
      }
      console.log(removed);
    });
  };

  //adds new position
  this.addPosition = (positionToAdd, userId) => {
    positionService.add(positionToAdd, userId)
      .then(addedPosition => {
        this.positions.unshift(addedPosition);
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
        add: this.addPosition,
        companies: this.companies
      },
      clickOutsideToClose: true,
      escapeToClose: true
    })
    .then(newPosition => {
      if(!newPosition) return;
      $state.go('positions');
    });
  };

  //adds a new company
  this.addCompany = (companyToAdd, userId) => {
    companyService.add(companyToAdd, userId)
      .then(addedcompany => {
        this.companies.unshift(addedcompany);
      })
      .catch(err => console.log(err));
  };

  //opens new Dialog/form to add a new company
  this.newCompany = ($event) => {
    var parentEl = angular.element(document.body);
    $mdDialog.show({
      parent: parentEl,
      targetEvent: $event,
      controllerAs: '$ctrl',
      bindToController: true,
      template: '<new-company add="$ctrl.add" company="$ctrl.company"></new-company>',
      controller() {},
      locals: {
        company: this.company,
        add: this.addCompany
      },
      clickOutsideToClose: true,
      escapeToClose: true
    })
    .then(newCompany => {
      if(!newCompany) return;
      $state.go('companies');
    });
  };

    //adds a contact
  this.addContact = (contactToAdd, userId) => {
    contactService.add(contactToAdd, userId)
      .catch(err => console.log(err));
  };

  //opens dialog/form to add a new contact
  this.newContact = ($event) => {
    var parentEl = angular.element(document.body);
    $mdDialog.show({
      parent: parentEl,
      targetEvent: $event,
      controllerAs: '$ctrl',
      bindToController: true,
      template: '<new-contact companies="$ctrl.companies" add="$ctrl.add" contact="$ctrl.contact"></new-contact>',
      controller() {},
      locals: {
        contact: this.contact,
        add: this.addContact,
        companies: this.companies
      },
      clickOutsideToClose: true,
      escapeToClose: true
    })
    .then(addContact => {
      if(!addContact) return;
      $state.go('contacts');
    });
  };
}
