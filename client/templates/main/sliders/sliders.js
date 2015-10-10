getTemperatureColor = function (temp) {
  var color;

  if (temp < - 5) 
    return "freezing"
  else if (temp >= -5 && temp < 5)
    return "cold"
  else if (temp >=5 && temp < 15)
    return "medium"
  else if (temp >= 15 && temp < 20)
    return "warm"
  else if (temp >= 20 && temp < 30)
    return "hot"
  else 
    return "very-hot"
}


Template.Sliders.onRendered(function(){
  var tmpl = this;

  // Weather slider options
  tmpl.$('#weather-slider').noUiSlider({
    start:    weatherSlider.get(),
    step:     1,
    connect:  true,
    range:    {
      'min':  1,
      'max':  5
    },
    format: {
      to: function(value){
        return Math.round(value);
      },
      from: function(value){
        return Math.round(value);
      }
    },
  }).on('slide', function(e,val){
    weatherSlider.set(val);
  }).on('change', function(e, val){
    weatherSlider.set(val);
  });

  // Temperature slider options
  tmpl.$('#temperature-slider').noUiSlider({
    start:    temperatureSlider.get(),
    step:     1,
    connect:  true,
    range:    {
      'min':  -20,
      'max':  40
    },
    format: {
      to: function(value){
        return Math.round(value);
      },
      from: function(value){
        return Math.round(value);
      }
    },
  }).on('slide', function(e,val){
    temperatureSlider.set(val);
  }).on('change', function(e, val){
    temperatureSlider.set(val);
  });

  // Flight time slider options
  tmpl.$('#flight-time-slider').noUiSlider({
    start:    flightTimeSlider.get(),
    step:     1,
    connect:  true,
    range:    {
      'min':  0,
      'max':  6 
    },
    format: {
      to: function(value){
        return Math.round(value);
      },
      from: function(value){
        return Math.round(value);
      }
    },
  }).on('slide', function(e,val){
    flightTimeSlider.set(val);
  }).on('change', function(e, val){
    flightTimeSlider.set(val);
  });

  // Hotel rating slider options
  tmpl.$('#hotel-rating-slider').noUiSlider({
    start:    hotelRatingSlider.get(),
    step:     1,
    connect:  true,
    range:    {
      'min':  1,
      'max':  5
    },
    format: {
      to: function(value){
        return Math.round(value);
      },
      from: function(value){
        return Math.round(value);
      }
    },
  }).on('slide', function(e,val){
    hotelRatingSlider.set(val);
  }).on('change', function(e, val){
    hotelRatingSlider.set(val);
  });


});

Template.Sliders.helpers({
  startWeather: function(){
    var weatherType = weatherSlider.get(),
        startWeather = weatherType[0],
        weather = "";

    switch (startWeather) {
      case 1: 
        weather = "wi wi-snow c-snow";
        break;
      case 2: 
        weather = "wi wi-rain c-rain";
        break;
      case 3: 
        weather = "wi wi-cloudy c-cloudy";
        break;
      case 4: 
        weather = "wi wi-day-cloudy c-day-cloudy";
        break;
      case 5: 
        weather = "wi wi-day-sunny c-sunny";
        break;
    }

    return weather;
  },

  endWeather: function(){
    var weatherType = weatherSlider.get(),
        endWeather = weatherType[1],
        weather = "";

    switch (endWeather) {
      case 1: 
        weather = "wi wi-snow c-snow";
        break;
      case 2: 
        weather = "wi wi-rain c-rain";
        break;
      case 3: 
        weather = "wi wi-cloudy c-cloudy";
        break;
      case 4: 
        weather = "wi wi-day-cloudy c-day-cloudy";
        break;
      case 5: 
        weather = "wi wi-day-sunny c-sunny";
        break;
    }

    return weather;
  },

  tempClassStart: function (){
    var temp = temperatureSlider.get()[0]
    return getTemperatureColor(temp);
  },

  tempClassEnd: function(){
    var temp = temperatureSlider.get()[1]
    return getTemperatureColor(temp);
  },

  temperatureSliderStart: function(){
    // var tempRange = temperatureSlider.get();
    // return tempRange[0] + " - " + tempRange[1] + "\u00B0C";
    return temperatureSlider.get()[0];
  },

  temperatureSliderEnd: function(){
    return temperatureSlider.get()[1];
  },
  flightTimeSlider: function(){
    var flightTimeRange = flightTimeSlider.get();
    return flightTimeRange[0] + " - " + flightTimeRange[1] + " hours"
  },
  hotelRatingSlider: function(){
    var hotelRating = hotelRatingSlider.get();
    return hotelRating[0] + " - " + hotelRating[1] + " stars";
  }

});