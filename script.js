// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var now = dayjs()
  var timeBlocks = document.querySelectorAll('.time-block')
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  timeBlocks.forEach(block => {
    var textarea = block.children[1]
    var button = block.children[2]
    button.addEventListener('click', () => {
      var text = textarea.value.trim()
      localStorage.setItem(block.id, text)
    })
  })
  
  // Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour.
  timeBlocks.forEach(block => {
    var hour = block.id.split('-')[1]
    var date = dayjs().hour(hour)

    if (date.hour() === now.hour()) {
      block.classList.add('present')
    } else if (date.diff(now) > 0) {
      block.classList.add('future')
    } else {
      block.classList.add('past')
    }
  })

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  timeBlocks.forEach(block => {
    var textarea = block.children[1]
    var savedText = localStorage.getItem(block.id)
    if (savedText) {
      textarea.value = savedText
    }
  })
  
  // Add code to display the current date in the header of the page.
  var currentDayElement = document.querySelector('#currentDay')
  currentDayElement.textContent = now.format('dddd, MMMM D')
});
