import Chart from 'chart.js';

import template from './visualizations.html';
// import styles from './visualizations.scss';

export default {
  template,
  controller
};

controller.$inject = ['companyService', 'contactService', 'positionService', '$window', 'userService'];

function controller(companyService, contactService, positionService, $window, userService) {
  // this.styles = styles;
  this.userId = $window.localStorage['id'];

  Promise.all([
    companyService.getCountForWeek(this.userId),
    positionService.getCountForWeek(this.userId),
    contactService.getCountForWeek(this.userId),
    userService.getMe(this.userId)
  ])
  .then(([numCompanies, numPositions, numContacts, user]) => {
    this.renderViz('application', 'Applications', 'Sent', numPositions, user.positionGoal);
    this.renderViz('brand', 'Companies', 'Researched', numCompanies, user.companyGoal);
    this.renderViz('contact', 'New Contacts', 'Made', numContacts, user.contactGoal);
  })
  .catch(err => console.log(err));

  // hungarian notion with type prefix, ege `numPositions`, `objTracked` is something
  // I did back in VB6, but not at all common in javascript. Stick with `positions`, `tracked`, etc.

  // nice abstraction into a common function used by each viz!
  this.renderViz = (element, objTracked, objVerb, completed, goal) => {
    // this hides the legend on each chart
    Chart.defaults.global.legend.display = false;

    // this tells the chart where to render, ID for the canvas
    const context = document.getElementById(element);
    const remaining = goal - completed;

    // eslint-disable-next-line
    const myChart = new Chart(context, {
      type: 'doughnut',
      data: {
        labels: [`${objTracked} ${objVerb}`, `${objTracked} Remaining`],
        datasets: [{
          data: [completed, remaining],
          backgroundColor: ['#99cc00']
        }]
      },
      options: {
        cutoutPercentage: 75
      }
    });
  };
};
