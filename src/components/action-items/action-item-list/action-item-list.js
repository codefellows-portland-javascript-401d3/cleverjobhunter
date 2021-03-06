import template from './action-item-list.html';
import styles from './action-item-list.scss';

export default {
  template,
  bindings: {
    action: '<',
    position: '<',
    item: '<'
  },
  controller
};

controller.$inject = ['$state', 'actionItemService'];

function controller ($state, actionItemService) {
  this.styles = styles;
  this.parentName = $state.params.parentName;

  actionItemService.getByPosOrComp($state.params.which, $state.params.parentId)
  .then(actionItems => {
    this.actionItems = actionItems;
  })
  .catch(err => console.log(err));

  this.complete = (id) => {
    actionItemService.remove(id)
    .then(removed => {
      this.actionItems.forEach((e,i) => {
        if (id === e._id) {
          this.actionItems.splice(i, 1);
        }
      });
      console.log(removed);
    });
  };
}
