Meteor.publish('cities', function(){
  return Cities.find();
});

Meteor.publish('forecasts', function(){
  return Forecasts.find();
});

Meteor.publish('trips', function(limit){
  return Trips.find({},{limit: limit});
})
