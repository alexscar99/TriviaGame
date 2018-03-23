$(document).ready(function() {
  // array with 10 different objects as questions, each object has the question name, the answer choices array, the index for correct answer, and the corresponding image for that question
  var triviaGame = [
    {
      question: 'Which player has scored the most points in an NBA game?',
      answer: 1,
      choices: [
        'Michael Jordan',
        'Wilt Chamberlain',
        'LeBron James',
        'Kobe Bryant'
      ],
      img: 'assets/images/wilt-chamberlain.jpg'
    },
    {
      question: 'What is the capital of Ireland?',
      answer: 2,
      choices: ['Cork', 'Wexford', 'Dublin', 'Galway'],
      img: 'assets/images/dublin.jpg'
    },
    {
      question:
        'Which quarterback has the most touchdown passes in NFL history?',
      answer: 0,
      choices: ['Peyton Manning', 'Tom Brady', 'Joe Montana', 'Brett Farve'],
      img: 'assets/images/peyton-manning.jpeg'
    },
    {
      question: 'Who was the 3rd President of the United States?',
      answer: 0,
      choices: [
        'Thomas Jefferson',
        'John Adams',
        'James Madison',
        'Ben Franklin'
      ],
      img: 'assets/images/thomas-jefferson.jpg'
    },
    {
      question: 'Who directed the movie "Inception"?',
      answer: 1,
      choices: [
        'Martin Scorsese',
        'Christopher Nolan',
        'Quentin Tarantino',
        'J.J. Abrams'
      ],
      img: 'assets/images/christopher-nolan.jpg'
    },
    {
      question: 'Who LOST the 2017 SuperBowl?',
      answer: 3,
      choices: ['Eagles', 'Patriots', 'Steelers', 'Falcons'],
      img: 'assets/images/falcons-logo.jpg'
    },
    {
      question: 'What color IS NOT on the British flag?',
      answer: 0,
      choices: ['Green', 'White', 'Red', 'Blue'],
      img: 'assets/images/british-flag.png'
    },
    {
      question: 'Who starred in the movie "Rocky"?',
      answer: 1,
      choices: [
        'Al Pacino',
        'Sylvester Stallone',
        'Robert DeNiro',
        'George Clooney'
      ],
      img: 'assets/images/rocky-stallone.jpg'
    },
    {
      question: 'What team won the NBA Championship in 2016?',
      answer: 3,
      choices: ['Spurs', 'Celtics', 'Warriors', 'Cavaliers'],
      img: 'assets/images/cavs-logo.jpeg'
    },
    {
      question: 'Which of these WAS NOT one of the original 13 colonies?',
      answer: 2,
      choices: ['New Jersey', 'Pennsylvania', 'Florida', 'Georgia'],
      img: 'assets/images/florida.jpg'
    }
  ];

  // set default global variables
  var amtCorrect = 0;

  var amtWrong = 0;

  var amtAnswered = 0;

  var currentQuestion = 0;

  var questionTimer = 11;

  var questionInterval;

  // start game by clicking button
  $('#start-game').click(function() {
    $('#start-game, #subheader').hide();
    showQuestions();
  });

  // function to show question
  var showQuestions = function() {
    // clear response interval
    stopResponse();

    // as long as there are still questions left:
    if (currentQuestion < 10) {
      // start interval for question
      startQuestion();
      // populate question ID with the question
      $('#question').text(triviaGame[currentQuestion].question);
      // store array of possible answers
      var answers = triviaGame[currentQuestion].choices;
      // loop through possible answer array and create buttons for each with specific attr
      for (i = 0; i < 4; i++) {
        var buttons = $('<button>');
        buttons.text(answers[i]);
        buttons.attr('value', answers[i]);
        buttons.attr('id', 'button' + i);
        buttons.attr('class', 'answer btn btn-info');
        // append created button and a line break to #answer-choices div
        $('#answer-choices')
          .append(buttons)
          .append('<br>');
      }
      // if any of the answer choices are clicked:
      $('.answer').click(function() {
        var userGuess = this.value;
        // clear question interval, reset timer
        stopQuestion();
        questionTimer = 11;
        var correctAnswer =
          triviaGame[currentQuestion].choices[
            triviaGame[currentQuestion].answer
          ];

        // conditional to check if the user's guess is right or wrong, display appropriate response
        if (userGuess === correctAnswer) {
          $('.main-content').empty();
          // show correct response message
          $('#question').text('Correct! The right answer was ' + correctAnswer);
          amtCorrect++;
          amtAnswered++;
          // show response screen
          displayResponse();
          currentQuestion++;
        } else {
          $('.main-content').empty();
          // show incorrect response message
          $('#question').text('Wrong! The right answer was ' + correctAnswer);
          amtWrong++;
          amtAnswered++;
          // show response screen
          displayResponse();
          currentQuestion++;
        }
      });
    } else {
      // after they have finished the last question run function to clear page contents and show results
      $('.main-content').empty();
      endGame();
      resetGame();
    }
  };

  // count down question timer until it hits 0
  var decrementQuestion = function() {
    if (questionTimer === 0) {
      // clear question interval
      stopQuestion();
      questionTimer = 11;
      var correctAnswer =
        triviaGame[currentQuestion].choices[triviaGame[currentQuestion].answer];
      $('.main-content').empty();
      // show out of time message with correct answer
      $('#question').text(
        'You ran out of time! The right answer was ' + correctAnswer
      );
      // start response interval
      displayResponse();
      currentQuestion++;
    } else if (questionTimer > 0) {
      questionTimer--;
      // display how much time is left
      $('#time-remaining').html(questionTimer + ' Seconds Remaining!');
    }
  };

  // start interval for question by running decrementQuestion every 1 sec
  var startQuestion = function() {
    questionInterval = setInterval(decrementQuestion, 1000);
  };

  // clear page and clear question interval
  var stopQuestion = function() {
    $('#time-remaining').text('');
    clearInterval(questionInterval);
  };

  // second interval for answer display
  var responseInterval;
  var responseTimer = 2;

  // if game is still going:
  var displayResponse = function() {
    if (currentQuestion <= 10) {
      var responseImg = $('<img>');
      // show image for current question
      responseImg.attr('src', triviaGame[currentQuestion].img);
      $('#images').append(responseImg);
      // start interval for answer screen
      startResponse();
    } else {
      endGame();
    }
  };

  // lower response counter by 1 until 0, reset response counter, empty page, then show next question
  var decrementResponse = function() {
    if (responseTimer === 0) {
      responseTimer = 2;
      $('.main-content').empty();
      showQuestions();
    } else {
      responseTimer--;
    }
  };

  // start interval for answer display by running decrementResponse every 1 sec
  var startResponse = function() {
    responseInterval = setInterval(decrementResponse, 1000);
  };

  // clear page and clear answer display interval
  var stopResponse = function() {
    $('#time-remaining').text('');
    $('#images').empty();
    clearInterval(responseInterval);
  };

  // end the game and show the final score to the player
  var endGame = function() {
    $('.main-content').empty();
    // prepend the results that have been stored so that the h2 for playing again is at bottom
    $('#final-score').prepend(
      '<h2>Your Score:</h2>' +
        '<p>Questions Answered: ' +
        amtAnswered +
        '</p>' +
        '<p>Questions Correct: ' +
        amtCorrect +
        '</p>' +
        '<p>Questions Wrong: ' +
        amtWrong +
        '</p>'
    );
    // populate the empty h2 from original html code
    $('#play-again').text('Click to Play Again!');
  };

  // reset game function empties the final score div and starts the game over correctly, but won't allow player to play a 3rd time
  var resetGame = function() {
    $('#play-again').click(function() {
      // added this for 2nd time playing through, problem is they won't have option to play a 3rd time since it empties the predefined empty h2
      $('#final-score').empty();

      // reset global variables
      amtCorrect = 0;

      amtWrong = 0;

      amtAnswered = 0;

      currentQuestion = 0;

      questionTimer = 11;

      // start game by running showQuestions function
      showQuestions();
    });
  };
});
