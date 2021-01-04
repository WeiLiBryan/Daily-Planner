var currentDay = $("#currentDay"); 

// Inserts current time into the current time div
var currentTime = function() {
    var currentMoment = moment();
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

$(document).ready(function(){
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