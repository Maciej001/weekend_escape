Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.route('/', {
  name: 'Home',
  template: 'Home'
});

Router.route('main', {
  name:   'Main',
  template: 'Main',
  subscriptions: function(){
    this.subscribe('cities');
    this.subscribe('forecasts');
  },
  waitOn: function(){
    return 
      [
        Meteor.subscribe('cities'),
        Meteor.subscribe('forecasts')
      ]
  },
  data: function(){
    return Meteor.subscribe('cities');
  }
});

// Removed for security 
// Router.route('admin', {
//   name:       'Admin',
//   template:   'Admin',
//   subscriptions: function(){
//     this.subscribe('cities');
//     this.subscribe('forecasts');
//     this.subscribe('trips');
//   },
//   waitOn: function(){
//     return 
//       [
//         Meteor.subscribe('cities'),
//         Meteor.subscribe('forecasts'),
//         Meteor.subscribe('trips')
//       ]
//   },
//   data: function(){
//     return Meteor.subscribe('cities');
//   }
// });