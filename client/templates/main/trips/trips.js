toHoursAndMinutes = function(minutes){
  var hours = minutes % 60,
      mins = minutes - hours*60,
      hoursText = 'hours', minsText = 'minutes';

  if (hours == 1)
    hoursText = 'hour';

  if (mins == 1) 
    minsText = "minute";

  return hours + " "  + hoursText + " and " + mins + " " + minsText; 

}

Template.Trips.onCreated(function(){
  var tmpl = this;

  tmpl.loaded = new ReactiveVar(0);
  tmpl.limit = new ReactiveVar(20);
  tmpl.tripCities = new ReactiveVar([]);

  tmpl.forecasts = Forecasts.find();
  

  tmpl.autorun(function(){

    var pubObj = {
      tempMin:      temperatureSlider.get()[0],
      tempMax:      temperatureSlider.get()[1],
      weatherMin:   weatherSlider.get()[0],
      weatherMax:   weatherSlider.get()[1],
      flightMin:    flightTimeSlider.get()[0],
      flightMax:    flightTimeSlider.get()[1],
      ratingMin:    hotelRatingSlider.get()[0],
      ratingMax:    hotelRatingSlider.get()[1], 
      limit:        tmpl.limit.get()
    }

    var limit = tmpl.limit.get();
    var subscription = tmpl.subscribe('trips', pubObj);

  }); // autorun ends

  tmpl.trips = function(){
    // return Trips.find({}, {limit: 100, sort: {totalPrice: 1} });
    return Trips.find({});
  }

});

Template.Trips.helpers({
  trips: function(){
    return Template.instance().trips();
  },
  hasMoreTrips: function(){
    return Template.instance().trips().count() >= Template.instance().limit.get();
  }
})

Template.Trips.events({
  'click .load-more': function(e, tmpl) {
    e.preventDefault();

    var limit = tmpl.limit.get();

    // to load 10 more trips
    limit += 10; 
    tmpl.limit.set(limit);
  }
})