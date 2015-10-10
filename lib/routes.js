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
    this.subscirbe('hotels');
    this.subscribe('flights')
  },
  waitOn: function(){
    return 
      [
        Meteor.subscribe('cities'),
        Meteor.subscribe('forecasts'),
        Meteor.subscribe('hotels'),
        Meteor.subscribe('flights')
      ]
  },
  data: function(){
    return Meteor.subscribe('cities');
  }
});

Router.route('admin', {
  name:       'Admin',
  template:   'Admin',
  subscriptions: function(){
    this.subscribe('cities');
    this.subscribe('forecasts');
    this.subscribe('hotels');
    this.subscribe('flights');
  },
  waitOn: function(){
    return 
      [
        Meteor.subscribe('cities'),
        Meteor.subscribe('forecasts'),
        Meteor.subscribe('hotels'),
        Meteor.subscribe.('flights')
      ]
  },
  data: function(){
    return Meteor.subscribe('cities');
  }
});