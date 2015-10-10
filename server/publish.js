Meteor.publish('cities', function(){
  return Cities.find();
});

Meteor.publish('forecasts', function(){
  return Forecasts.find();
});

Meteor.publish('hotels', function(){
  return Hotels.find();
});

Meteor.publish('flights', function(){
  return Flights.find();
});