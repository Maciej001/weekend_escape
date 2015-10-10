Template.Trips.onCreated(function(){
  var tmpl = this;
  tmpl.forecasts = Forecasts.find();
});

Template.Trips.helpers({
  tripsList: function(){
    var trips = [],
    tmpl = Template.instance();

    tmpl.forecasts.forEach(function(forecast){
      var city = Cities.findOne({'cityCode': forecast.cityCode});

      trips.push({
        name: city.name,
        image: city.image,
        weatherIcon: forecast.weatherIcon,
        temperature: Math.round(forecast.temp*10)/10
      });
    });      

    return trips;
  }
})