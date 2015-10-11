Meteor.startup(function(){    
  weatherSlider       = new ReactiveVar([3,5]);
  temperatureSlider   = new ReactiveVar([18, 30]);
  flightTimeSlider    = new ReactiveVar([1,5]);
  hotelRatingSlider   = new ReactiveVar([3,4]);
});