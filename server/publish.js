Meteor.publish('cities', function(){
  return Cities.find();
});

Meteor.publish('forecasts', function(){
  return Forecasts.find();
});

Meteor.publish('trips', function(pubObj) {

    // find forecasts for cities that have weather in temperatureSlider range
    var forecasts = Forecasts.find({ 
      temp: {$gte: pubObj.tempMin, $lte: pubObj.tempMax},
      weatherType: {$gte: pubObj.weatherMin, $lte: pubObj.weatherMax},
    });

    var forecastCities = [];

    forecasts.forEach(function(forecast){
      forecastCities.push(forecast.cityCode);
    });

    var cities = Cities.find({ cityCode: { $in: forecastCities } });
    var tripCities = [];

    // Check flight time
    cities.forEach(function(city){

      if ((city.avgFlightTime >= pubObj.flightMin*60) && (city.avgFlightTime <= pubObj.flightMax*60))
        tripCities.push(city.cityCode);
      }); 

  return Trips.find({ 
              cityCode: { $in: tripCities },
              StarRating: { $gte: pubObj.ratingMin, $lte: pubObj.ratingMax }
            },
            {
              limit: pubObj.limit,
              sort: { totalPrice: 1}
            });
});
