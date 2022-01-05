var startButton = document.querySelector('#start-button');
var timerElement = document.querySelector(".timer-count");
var textInfo = document.querySelector('.feedback');
var result = document.querySelector(".result");
var initialInput = document.querySelector('#initial-input');
var submitButton = document.querySelector('.submit');
var scoreNum = document.querySelector('#score-number');
var clearButton = document.querySelector('#clear');

var records = document.querySelector('.record');
var formEl = document.querySelector('.name');
var link = document.querySelector('.link');
var backBtn = document.querySelector('.back');


var card1 = document.querySelector('#card1');
var card2 = document.querySelector('#card2');
var card3 = document.querySelector('#card3');
var card4 = document.querySelector('#card4');
var card5 = document.querySelector('#card5');
var card6 = document.querySelector('#card6');
var card7 = document.querySelector('#card7');

var list1 = document.querySelector('#card1 ul.list');
var list2 = document.querySelector('#card2 ul.list');
var list3 = document.querySelector('#card3 ul.list');
var list4 = document.querySelector('#card4 ul.list');
var list5 = document.querySelector('#card5 ul.list');

// Array for the result
var resultText = ["Correct!", "Wrong!"]

var timer;
var timerCount;

// The startQuiz function is called when the start button is clicked
function startQuiz() {
    timerCount = 75;
    timerElement.textContent = 75;
    startTimer();
    card1.style.display = 'block';
}

// The startTimer function starts and stops the timer and trigger the final score
function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        scoreNum.textContent = timerCount;
        if (timerCount < 0 || timerCount === 0) {
            clearInterval(timer);
            card6.style.display = 'block';
            getScore();
            setRecord();
        }
    }, 1000);
}
// Attach event listener to start button to call startQuiz function on click
startButton.addEventListener('click', startQuiz);


// reslut is shown up when any answer is clicked
function resultShow() {
    result.style.display = 'block';
}
// The wrong function is called when the answer is wrong
function wrong() {
    timerCount = timerCount - 15;
    resultShow();
    result.textContent = resultText[1];
}

// The correct function is called when the answer is correct
function correct() {
    resultShow();
    result.textContent = resultText[0];
}
// the function is called when any answer is clicked
list1.addEventListener('click', function(event) {
    var element = event.target;
    if (element.matches('.item')) {
        var itemClicked = element.getAttribute('data-number');
        if (itemClicked == 3) {
            correct();
        } else {
            wrong();
        }
    }
    card2.style.display = 'block';
})
list2.addEventListener('click', function(event) {
    var element = event.target;
    if (element.matches('.item')) {
        var itemClicked = element.getAttribute('data-number');
        if (itemClicked == 3) {
            correct();
        } else {
            wrong();
        }
    }
    card3.style.display = 'block';
})
list3.addEventListener('click', function(event) {
    var element = event.target;
    if (element.matches('.item')) {
        var itemClicked = element.getAttribute('data-number');
        if (itemClicked == 4) {
            correct();
        } else {
            wrong();
        }
    }
    card4.style.display = 'block';
})
list4.addEventListener('click', function(event) {
    var element = event.target;
    if (element.matches('.item')) {
        var itemClicked = element.getAttribute('data-number');
        if (itemClicked == 3) {
            correct();
        } else {
            wrong();
        }
    }
    card5.style.display = 'block';
})
list5.addEventListener('click', function(event) {
    var element = event.target;
    if (element.matches('.item')) {
        var itemClicked = element.getAttribute('data-number');
        if (itemClicked == 4) {
            correct();
        } else {
            wrong();
        }
    }
    card6.style.display = 'block';
    result.style.display = 'none';
    getScore();
    setRecord();
})

// When the time run out or all the questions are answered, get the final score showed on the screen
function getScore() {
    clearInterval(timer);
    if (timerCount <= 0) {
        timerCount = 0;
    }
    timerElement.textContent = timerCount;
    scoreNum.textContent = timerCount;
}

var loc = [];

function render() {
    records.innerHTML = '';
    for (var i = 0; i < loc.length; i++) {
        var items = loc[i];
        var li = document.createElement('li');
        li.textContent = i + 1 + '. ' + items.user + ' - ' + items.score;
        records.appendChild(li);
    }

}
// This function si being called below and will run when the page loads
function init() {
    // Get stored info from localStorage
    var storedInfo = JSON.parse(localStorage.getItem('loc'));
    // If info was retrieved from localStorage, update the loc array to it
    if (storedInfo !== null) {
        loc = storedInfo;
    }
    //This is a helper function that will render highscore records to the DOM
    render();
}


function setRecord() {
    // Stringify and set key in localStorage to loc array
    localStorage.setItem('loc', JSON.stringify(loc));
}

// Add submit event to form
formEl.addEventListener('submit', function(event) {
    event.preventDefault();
    var initVal = initialInput.value.trim();
    // Return from function early if submitted initVal is blank
    if (initVal === '') {
        textInfo.style.display = 'block';
        return;
    }
    userScore = {
            user: initVal,
            score: timerCount
        }
        // Add new userScore to loc array
    loc.push(userScore);
    // Store updated loc array in localStorage, re-render the list
    setRecord();
    render();
    card7.style.display = 'block';
})


function clearRecord() {
    // Resets the timeCount
    timerCount = 0;
    localStorage.clear();
    records.style.display = 'none';
}
// Attaches event listener to button
clearButton.addEventListener('click', clearRecord)

link.addEventListener('click', function() {
    card7.style.display = 'block';
})

backBtn.addEventListener('click', function() {
        card1.style.display = 'block'
    })
    // Calls init to retrieve data and render it to the page on load
init();