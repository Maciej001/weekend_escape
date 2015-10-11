function mapAddMarker(map, city, tmpl) {
    var newMarker = new google.maps.Marker({
        position: {lat: city.coord.lat, lng: city.coord.lng},
        map: map
    });  

    tmpl.markers.push(newMarker);
};

function removeMarkers(tmpl) {
  var markers = tmpl.markers;

  for(var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  return false;
};



Template.Map.onCreated(function() {
  var tmpl = this;

  tmpl.markers = [];

  // tmpl.subscription = tmpl.subscribe('cities');
  
  GoogleMaps.ready('weatherMap', function(map) {
      
    tmpl.autorun(function(){

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

      removeMarkers(tmpl);

      cities.forEach(function(city){
        if (city.avgFlightTime/60 >= flightTimeSlider.get()[0] && city.avgFlightTime/60 <= flightTimeSlider.get()[1])
          mapAddMarker(map.instance, city, tmpl);  
      });  
      
    }); // autorun
      
  }); // GoogleMaps.ready()
});

Template.Map.helpers({
  mapOptions: function() {
    var tmpl = Template.instance()
    
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(44, 16),
        zoom: 4,
        maxZoom: 7,
        minZoom: 4
      };
    }    
  }
});