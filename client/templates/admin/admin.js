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
    var   today = new Date(),
          friday = nextFriday(today),
          sunday = nextSunday(today);

    Meteor.call("downloadHotels", friday, sunday);
  },
  'click #download-flights': function(){
    var today = new Date(),
        maxDuration = flightTimeSlider.get()[1]*60; 

    var   friday = nextFriday(today),
          sunday = nextSunday(today),
          origin = "LON",
          cities = Cities.find();

    Meteor.call("clearFlights");

    cities.forEach(function(city){
      Meteor.call("downloadFlights", friday, sunday, origin, city.airportCode);
    });
  },
  'click #avg-flight-time': function(){
    Meteor.call("averageFlightTime");

  },

  'click #generate-trips': function(){

    Meteor.call("clearTrips");
    Meteor.call("generateTrips");

  }
  
});

