Template.tripItem.helpers({
  temperature: function(){
    return Math.round(this.weather.temp);
  },
  totalPriceFormatted: function(){
    return Math.round(this.totalPrice);
  },
  departureDate: function(){
    return moment(this.flight.departureDate).format("llll")
  },
  returnDate: function(){
    return moment(this.flight.returnDate).format("llll")
  },
  flightPrice: function(){
    return Math.round(Number(this.flight.price.substring(3)));
  },
  hotelPrice: function(){
    return Math.round(this.hotel.price);
  }
})