nextFriday = function(date){
  var today = new Date(),
      daysToFriday = ((12 - date.getDay()) % 7);
  return today.setDate(today.getDate() + daysToFriday);
};

nextSunday = function(date){
    var friday = nextFriday(date);
    var sunday = new Date(friday);

    return sunday.setDate(sunday.getDate()+2);
};

Template.Admin.onCreated(function(){
  // var today = new Date();
  // console.log(moment(nextFriday(today)).format("MMMM Do YYYY"));
  // console.log(moment(nextSunday(today)).format("MMMM Do YYYY"));
});

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
  'click #download-flights': function(){
    var today = new Date(),
        maxDuration = flightTimeSlider.get()[1]*60; 

    var   friday = nextFriday(today),
          sunday = nextSunday(today),
          origin = "LON",
          maxDuration = maxDuration;

    var destinations = ["MAD", "BRU"];

    Meteor.call("clearFlights");

    _.each(destinations, function(destination){
      Meteor.call("downloadFlights", friday, sunday, origin, destination, maxDuration);
    });

    
  }
  
});

