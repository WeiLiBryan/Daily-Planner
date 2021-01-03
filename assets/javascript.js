var currentDay = $("#currentDay");

// Inserts a current time into the current time div
var currentTime = function() {
    var currentMoment = moment();
    currentDay.html(currentMoment.format('dddd, MMMM Do YYYY, h:mm:ss a'));
}

$(document).ready(function(){

    // sets time in current time div
    currentTime();
    // repeats function so that time is always current
    setInterval(currentTime, 1000);

    
});