import template from './edit-contact.html';

export default {
  template,
  transclude: true,
  bindings: {
    contactToEdit: '<contact',
  },
  controller
};

controller.$inject = ['$mdDialog', 'contactService', 'companyService', '$window'];
function controller($mdDialog, contactService, companyService, $window) {
  this.contact = angular.copy(this.contactToEdit);
  this.userId = $window.localStorage['id'];


  companyService.getByUser(this.userId)
    .then(companies => {
      this.companies = companies;
    })
    .catch(err => console.log(err));

  this.cancel = () => {
    $mdDialog.hide();
  };

  this.save = () => {
    contactService.update(this.contact)
      .then(updatedContact => {
        $mdDialog.hide(updatedContact);
      });
  };

}
// WAT?
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3ZDU3YzJiOWI4MDZiMzg2Zjc3ZGFhNSIsImlhdCI6MTQ3MzcxOTc2MX0.jqCwOANAJhTK0Fsh2Zn42B4z6fyvXv1fKXCZK8IlBio
