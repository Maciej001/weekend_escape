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
    var cities = Cities.find();

    cities.forEach(function(city){
      var flights = Flights.find({destination: city.airportCode}),
          total = 0,
          i = 0;
      flights.forEach(function(flight){
        total += (flight.inDuration + flight.outDuration);
        i += 2;
      });

      var avgFlightTime = total/i;
      // for some cities it's missing. I am not sure if it's problem with API

      if (avgFlightTime) {
        Cities.update(city._id, {
          $set: {avgFlightTime: avgFlightTime}
        });
      } else {
        // if flight times not returned set it to 600minutes so it get's filtered out late;
        Cities.update(city._id, {
          $set: {avgFlightTime: 600}
        });
      }
    });


  }
  
});

