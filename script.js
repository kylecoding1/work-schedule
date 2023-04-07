$(document).ready(function() {
    // initialize the calendar for the current day
    initializeCalendar(moment());
  
    // set up event listener
    $(".saveBtn").on("click", saveCalendar);
  });
// define the now variable with the current date and time

var now = moment();

// set up an array of the hour labels for easy iteration
var hours = [
  "12 AM",
  "1 AM",
  "2 AM",
  "3 AM",
  "4 AM",
  "5 AM",
  "6 AM",
  "7 AM",
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
  "6 PM",
  "7 PM",
  "8 PM",
  "9 PM",
  "10 PM",
  "11 PM"
];

// initialize the calendar for the specified day
function initializeCalendar(day) {
    
// initialize the calendar for the current day
    // clear any existing time blocks
    $(".time-block").remove();
  
    // set the current day
    $("#currentDay").text(day.format("dddd, MMMM Do"));
  
    // loop over all hours
    for (var i = 0; i < hours.length; i++) {
      // create a new time block element
      var timeBlock = $("<div>").addClass("row time-block");
  
      // create the hour label element
      var hourLabel = $("<div>").addClass("col-md-1 hour").text(hours[i]);
      timeBlock.append(hourLabel);
  
      // create the event textarea element
      var eventTextarea = $("<textarea>").addClass("col-md-10 description form-control");
      timeBlock.append(eventTextarea);
  
      // retrieve the stored value from localStorage using the date and hour as the key
      var storedValue = localStorage.getItem(day.format("YYYY-MM-DD") + " " + hours[i]);
  
      // if a value is stored, set the textarea value to it
      if (storedValue !== null) {
        eventTextarea.val(storedValue);
      }
  
      // create the save button element
      var saveButton = $("<button>").addClass("col-md-1 saveBtn btn btn-primary").html("<i class='fas fa-save'></i>");
      timeBlock.append(saveButton);
  
      // append the time block to the container
      $(".container").append(timeBlock);
    }
  
    // update the time block classes based on the current time
    updateBlocks();
  }
  

// update time block classes based on the current time
function updateBlocks() {
  var currentHour = moment().hours();
  $(".time-block").each(function() {
    var hour = moment($(this).find(".hour").text(), "h A").hours();
    if (hour < currentHour) {
      $(this).addClass("past").removeClass("present future");
    } else if (hour === currentHour) {
      $(this).addClass("present").removeClass("past future");
    } else {
      $(this).addClass("future").removeClass("past present");
    }
  });
}
function saveCalendar() {
    // get the current day and all the time blocks
    var currentDay = moment($("#currentDay").text(), "dddd, MMMM Do");
    var timeBlocks = $(".time-block");
  
    // loop over all time blocks and save their data to localStorage
    timeBlocks.each(function() {
      var hourLabel = $(this).find(".hour").text();
      var description = $(this).find(".description").val();
  
      // save the data to localStorage using the date and hour as the key
      var key = currentDay.format("YYYY-MM-DD") + " " + hourLabel;
      localStorage.setItem(key, description);
    });
  }
  $(".saveBtn").on("click", saveCalendar);
  
  // initialize the calendar for the current day
  initializeCalendar(moment());
  