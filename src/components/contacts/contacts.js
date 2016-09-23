import template from './contacts.html';
import styles from './contacts.scss';

export default {
  template,
  bindings: {},
  controller
};

controller.$inject = ['contactService', '$window', 'companyService', '$mdDialog'];
function controller (contactService, $window, companyService, $mdDialog) {
  this.styles = styles;
  this.addButton = 'add';
  this.userId = $window.localStorage['id'];

  companyService.getByUser(this.userId)
    .then(companies => {
      this.companies = companies;
    })
    .catch(err => console.log(err));

  contactService.getByUser(this.userId)
    .then(contacts => {
      this.contacts = contacts;
    })
    .catch(err => console.log(err));

  //adds a contact
  this.add = (contactToAdd, userId) => {
    contactService.add(contactToAdd, userId)
      .then(addedContact => {
        this.contacts.unshift(addedContact);
        this.addButton = 'add';
      })
      .catch(err => console.log(err));
  };

  //opens dialog/form to add a new contact
  this.addContact = ($event) => {
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
        add: this.add,
        companies: this.companies
      },
      clickOutsideToClose: true,
      escapeToClose: true
    })
    .then(addContact => {
      if(!addContact) return;
      angular.copy(addContact, this.contact);
    });
  };

  //removes selected contact
  this.remove = contactId => {
    console.log(`about to remove ${contactId}`);
    contactService.remove(contactId)
      .then(() => {
        contactService.getByUser(this.userId)
          .then(contacts => {
            this.contacts = contacts;
          })
    .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  // this function should be in it's own module
  this.exportToCSV = function() {

    const headerList = [
      '_id',
      'name',
      'company',
      'email',
      'phone',
      'role',
      'dateMet',
      'info'
    ];

    const exportArray = this.contacts.map( contact => {
      var array = [];

      headerList.forEach( item => {
        let val;
        if(item === 'company') {
          contact.company ? val = contact.company.name : val = '';
        } else 
        if(item === 'info') {
          val = '"' + contact[item] + '"';
        } else {
          val = contact[item] || '';
        }
        val = val.replace(',',' ');
        array.push(val);
      });
      return array.join(',');
    }).join('\n');

    saveToCsv(exportArray, headerList, 'contacts.csv');

    function saveToCsv(dataRows, columnHeaders, filename) {

      var content =
          'data:text/csv;charset=utf-8,' +
          columnHeaders.join(',') + '\n' +
          dataRows;
              
      var encodedUri = encodeURI(content);

      // faux link is required to give the file a name
      var link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', filename);
      document.body.appendChild(link);

      link.click();

      // should link be removed afterwards?
    }
  };

};
