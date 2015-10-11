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

    tmpl.tripCities.set([]);

    // find forecasts for cities that have weather in temperatureSlider range
    var forecasts = Forecasts.find({ 
      temp: {$gte: temperatureSlider.get()[0], $lte: temperatureSlider.get()[1]},
      weatherType: {$gte: weatherSlider.get()[0], $lte: weatherSlider.get()[1]},
    });

    var forecastCities = [];

    forecasts.forEach(function(forecast){
      forecastCities.push(forecast.cityCode);
    });

    var cities = Cities.find({ cityCode: { $in: forecastCities } });

    // Check flight time
    cities.forEach(function(city){
      if (city.avgFlightTime/60 >= flightTimeSlider.get()[0] && city.avgFlightTime/60 <= flightTimeSlider.get()[1])
        tmpl.tripCities.get().push(city.cityCode);
      }); 

    var limit = tmpl.limit.get(),
        subscription = tmpl.subscribe('trips', limit);

  }); // autorun ends

  tmpl.trips = function(){
    return Trips.find({}, {limit: 100, sort: {totalPrice: 1} });
    return Trips.find({
        cityCode: { $in: tmpl.tripCities.get()}, 
        StarRating: { $gte: Number(hotelRatingSlider.get()[0]), $lte: Number(hotelRatingSlider.get()[1]) }
      });
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