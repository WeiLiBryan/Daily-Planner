var currentDay = $("#currentDay");

// Gets current date and sets it to storage
var today = moment().format('LL');
localStorage.setItem('date', today);

// Retrieves current time and edits page based on that
var currentTime = function() {
    var currentMoment = moment();
    var hour = currentMoment.format('HH');

    // For loop decides what color blocks are
    for (var k=0; k<9; k++) {

        // if the current hour is equal to the data value of time then set class to present
        if (hour == $('#' + k).attr('data-time')) {
            $('#' + k).removeClass("past present future");
            $('#' + k).addClass("present");
        }

        // If current hour is past data attribute then set class to past
        else if (hour > $('#' + k).attr('data-time')){
            $('#' + k).removeClass("past present future");
            $('#' + k).addClass("past");
        }

        // If current hour is before data attribute then set class to future
        else if (hour < $('#' + k).attr('data-time')){
            $('#' + k).removeClass("past present future");
            $('#' + k).addClass("future");
        }
    }

    // Clock located in jumbotron
    currentDay.html(currentMoment.format('dddd, MMMM Do YYYY, h:mm:ss a'));
}

// takes the data value from clicked button then relates it to the corresponding textbox
// afterward saves it to local storage
function saveTxt(txtBoxNum) {
    
    var text = $('#' + txtBoxNum).val();
    console.log("Textbox input: " + text);

    localStorage.setItem('timeBlock' + txtBoxNum, text);
}

// Function wipes out all local storage data
function wipe() {

    // For loop iterates throughout all timeblocks and clears the text
    for (var j=0; j<9; j++){
        localStorage.removeItem('timeBlock' + j);
        
        // Also wipes textareas
        $('#' + j).text("");
    }
}

function isNewDay(){
    // If today is not the same as the date set in storage then clear
    var newDay = localStorage.getItem('date');
    if (newDay != today) {wipe()};
}

$(document).ready(function(){


    isNewDay();

    // sets current time in jumbotron
    currentTime();
    // repeats function so that time is always current
    setInterval(currentTime, 1000);

    // For loop checks local storage for data on all boxes
    for (var i=0; i<9; i++) {
        var text = localStorage.getItem('timeBlock' + i);

        // If there is value then places text into textbox
        if (text) {
            $('#' + i).text(text);
        }
    }
});

// Upon clicking a save button takes clicked button's data then sends it to saveTxt()
$(".btn-primary").click(function() {
    // Retrieves data from clicked button
    var buttonNum = $(this).attr('data-button');
    console.log("Button Number: " + buttonNum);
    saveTxt(buttonNum);
});

// Clears schedule once clear is clicked
$(".clear").click(wipe);