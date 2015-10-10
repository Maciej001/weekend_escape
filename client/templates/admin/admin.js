Template.Admin.events({
  'click #generate-cities': function(){
    Meteor.call("generateCities");
  },

  'click #download-weather': function(){
    Meteor.call("downloadWeather");
  },
  'click #download-hotels': function(){
    Meteor.call("downloadHotels");
  },
  
});

