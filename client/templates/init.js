Meteor.startup(function(){    
  weatherSlider       = new ReactiveVar([3,5]);
  temperatureSlider   = new ReactiveVar([18, 40]);
  flightTimeSlider    = new ReactiveVar([3,5]);
  hotelRatingSlider   = new ReactiveVar([3,4]);
});