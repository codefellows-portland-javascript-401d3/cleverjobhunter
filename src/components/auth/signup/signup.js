import template from './signup.html';

export default {
  template,
  bindings: {
    success: '&'
  },
  controller
};

controller.$inject = ['userService'];

function controller(userService){
  this.credentials = {
    name: '',
    email: '',
    password: ''
  };

  this.authenticate = ()=>{
    return userService.signup(this.credentials)
      .then(()=>{
        this.success();
        return true;
      })
      .catch(error=>{
        this.error = error;
        return false;
      });
  };

}
