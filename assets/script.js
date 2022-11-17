//variables 
correct = 0, totalQuestions = 0, grade = 0; 
questionnumber = 0;

//variables for timer and form 
var timer = document.getElementById('timer');
var startButton = document.getElementById("start");
var submitButton = document.getElementById("submit");
var cancelButton = document.getElementById("cancel");
var clearButton = document.getElementById("clear");
var submitButton = document.getElementById("submit");
clearButton = document.getElementById("clear");
userInput = document.querySelector("userInputForm");
questionLabel = document.getElementById("question");
answers = document.querySelectorAll(".answer")
quizSpace = document.getElementById("quiz-card");
check = document.getElementById("correct");

secondsLeft = 0 
gamesPlayed = 0
randomNumber = 0

highScore = [
    {name:"",
    correct: 0

}];

questions = [
    {
        question: "Which is the correct method if you want to change an object's properties?",
        answers: ["querySelector", "setAttribute", "changeAttribute", "adjustAttribute"],
        answerkey: 1
      }, {
        question: "Javascript waits for a button click using the __________ function.",
        answers: ["clickAwaiter", "buttonThingy", "eventListener", "dotheClick"],
        answerkey: 2
      }, {
        question: "What is the library we tap into to save an object to local storage?",
        answers: ["SMON", "MRIA", "LNDSAY", "JSON"],
        answerkey: 3
      }, {
        question: "Objects cannot be saved to local storage without the use of JSON, and are converted to what?",
        answers: ["strings", "arrays", "they are not converted to anything", "super-objects"],
        answerkey: 1
      }, {
        question: "What are you accessing if you type 'console.log(Window)'?",
        answers: ["the windows of a house", "microsoft windows", "the browser window", "it won't access anything"],
        answerkey: 2
      }, {
        question: "How many objects will 'querySelector' grab?",
        answers: [1, "up to 5", 0, "all of them"],
        answerkey: 0
      }, {
        question: "What does DOM refer to?",
        answers: ["direct order matrix", "dormant ordinary respirations", "destructive outer machine", "document object model"],
        answerkey: 3
      }, {
        question: "What do you often need to prevent during API functions to ensure it doesn't conflict with your code or inputs?",
        answers: ["the browser's default response", "the code exploding", "the html conflicting with the javascript", "the javascript conflicting with the CSSg"],
        answerkey: 0
      }, {
        question: "What is it called when a click on one element applies to all the parent elements??",
        answers: ["upgrading", "leveling", "bubbling", "handshaking"],
        answerkey: 2
      }, {
        question: "Which of the following is not a valid eventListener?",
        answers: ["click", "mouseover", "touch", "resize"],
        answerkey: 2
      }]
      ;

let questionsDefault = questions

//start by loading highscores from local storage 

function init() {
    highScores = JSON.parse(localstorage.getItem("highScores"));
}init()


//function for setting timer for counting down 
function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;

        if(secondsLeft <= 0) {
            clearInterval(timerInterval);
            timer.textContent = "0 seconds remaining";
            endCard();
    
        } else if (secondsLeft == 1) {
            timer.textContent = secondsLeft + " second remaining"
        }
        else {
            timer.textContent = secondsLeft + " seconds remaining";
        }

    }, 1000);
return scondsLeft;
}setTime

//start the quiz when the start button is pressed 

//function for when the game starts 

function StartQuiz() {
    //hide the start button once Quiz starts 
    startButton.setAttribute("style","display:none");
    //show answers 
    for (i=0; i<4; i++) {
        answers[i].setAttribute("style","display:block");
    }
    check.textContent = "";

    //reset when "Clear" button clicked on high scores screen 
    clearButton.setAttribute ("style", "display:none")
    timer.setAttribute("style","display: inline");
    questions = questionsDefault;

    //set timer and generate the first question 
    secondsLeft = 60;
    setTime();
    randomNumber = generateQuestion();
}
StartQuiz()

function generateQuestions() {
    let random = Math.floor(Math.random()*questions.length); //variable for length
    //print
    questionLabel.textContent = questions[random].question; 
    //set answer
    for (i=0; i<4; i++) {
        answer[i].textContent = questions[random].answers[i]
    } 
    return random;
}
generateQuestions

//make answer space clickable 
quizSpace.addEventListener("click",function(event){
    checkAnswer(randomNumber);

    if (questions.length ==1) {
        secondsLeft = 0; 
        endCard();
    } else {
        questions.splice(randomNumber,1);
    }

    randomNumber = generateQuestion();
})

//check the answer clicked on 
function checkAnswer(randomNumber) {
   let element = event.target;

   if ( element.matches ("#a1") && questions [randomnumber].answerkey == 0) {
    correct++;
    check.textContent = "Correct!"
    }
   else if (element.matches("#a2") && questions [randomNumber].answerkey == 1) {
    correct++;
    check.textContent = "Correct!"
    }
    else if (element.matches("#a3") && questions [randomNumber].answerkey == 1) {
        correct++;
        check.textContent = "Correct!"
    }
    else if (element.matches("#a4") && questions [randomNumber].answerkey == 1) {
        correct++;
        check.textContent = "Correct!"
    }
    else {
        check.textContent = "Incorrect!"
        secondsLeft-=5;

    }
}

//when the quiz is over, display results 
function endCard() {

    for(i=0; i<4;i++) {
        answers[i].setAttribute("style","display:none")
    }

    timer.setAttribute("style", "display:none");
    questionLabel.textContent = "You got " + correct + " answers correct.";
  
    check.textContent = "If you would like to submit your score, enter your name and click Submit. If not, click Cancel."
  
    nameInput.setAttribute("style", "display: block");
    submitButton.setAttribute("style", "display: inline");
    cancelButton.setAttribute("style", "display: inline")
}

//display highscore page 
function displayHighScores() {
    questionLabel.textContent = "High Scores";
    nameInput.setAttribute("style", "display: none");
    submitButton.setAttribute("style", "display: none");
    cancelButton.setAttribute("style", "display: none");
    clearButton.setAttribute("style", "display: initial");
    check.textContent = "";
  
    //Get list of high scores from local storage
    highScores = JSON.parse(localStorage.getItem("highScores"));
    
    //Print list of high scores
    check.setAttribute('style','white-space: pre;')
    for (let i = 0; i<highScores.length; i++) {
      check.textContent += highScores[i].name + "   " + highScores[i].correct + "\r\n";
  }
  
    startButton.setAttribute("style", "display:inline");
    startButton.textContent = "Restart quiz";
  }
    //add score to highScores array
  submitButton.addEventListener("click", function(event) {
  
    let obj = {
      name: nameInputForm.value,
      correct: correct
    }
      if (highScores[0].name == "") {
        highScores[0].name = nameInputForm.value;
        highScores[0].correct = correct;
       } else {
        highScores.push(obj);
       }
      //reset score variable
           correct = 0;
  
    //sort highScores array by score
          highScores.sort((a, b) => {
            return b.correct - a.correct;
          })
  
          //write array highScores to local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
  
    //go to the high scores page
    displayHighScores();
  })
  
  //Cancel button does not add high score
  cancelButton.addEventListener("click", function(event) {
      //go to the high scores page
      displayHighScores();
  })
  
  //clear the high scores
  clearButton.addEventListener("click", function(event) {
    highScores = [
      {name: "",
      correct: 0
    }
    ]
    localStorage.setItem("highScores", JSON.stringify(highScores));
    check.textContent = "Scores cleared"
  })


  startButton.addEventListener("click",function() {
    startQuiz();
})