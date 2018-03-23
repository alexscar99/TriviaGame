$(document).ready(function() {
  // array with 8 different objects, with props for each question
  var triviaGame = [
    (questionOne = {
      question: 'What is the capital of Ireland?',
      answer: 2,
      choices: ['Cork', 'Wexford', 'Dublin', 'Galway'],
      img: 'assets/images/dublin.jpg'
    }),
    (questionTwo = {
      question: 'Who was the 3rd President of the United States?',
      answer: 0,
      choices: [
        'Thomas Jefferson',
        'John Adams',
        'James Madison',
        'Ben Franklin'
      ],
      img: 'assets/images/thomas-jefferson.jpg'
    }),
    (questionThree = {
      question: 'Who directed the movie "Inception"?',
      answer: 1,
      choices: [
        'Martin Scorsese',
        'Christopher Nolan',
        'Quentin Tarantino',
        'J.J. Abrams'
      ],
      img: 'assets/images/christopher-nolan.jpg'
    }),
    (questionFour = {
      question: 'Who LOST the 2017 SuperBowl?',
      answer: 3,
      choices: ['Eagles', 'Patriots', 'Steelers', 'Falcons'],
      img: 'assets/images/falcons-logo.jpg'
    }),
    (questionFive = {
      question: 'What color IS NOT on the British flag?',
      answer: 0,
      choices: ['Green', 'White', 'Red', 'Blue'],
      img: 'assets/images/british-flag.png'
    }),
    (questionSix = {
      question: 'Who starred in the movie "Rocky"?',
      answer: 1,
      choices: [
        'Al Pacino',
        'Sylvester Stallone',
        'Robert DeNiro',
        'George Clooney'
      ],
      img: 'assets/images/rocky-stallone.jpg'
    }),
    (questionSeven = {
      question: 'What team won the NBA Championship in 2016?',
      answer: 3,
      choices: ['Spurs', 'Celtics', 'Warriors', 'Cavaliers'],
      img: 'assets/images/cavs-logo.jpeg'
    }),
    (questionEight = {
      question: 'Which of these WAS NOT one of the original 13 colonies?',
      answer: 2,
      choices: ['New Jersey', 'Pennsylvania', 'Florida', 'Georgia'],
      img: 'assets/images/florida.jpg'
    })
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

  var showQuestions = function() {
    // end response display
    stopResponse();

    // as long as there are still questions:
    if (currentQuestion < 8) {
      // show question
      startQuestion();
      $('#question').text(triviaGame[currentQuestion].question);
      var answers = triviaGame[currentQuestion].choices;
      // show answer choices by creating buttons
      for (i = 0; i < 4; i++) {
        var buttons = $('<button>');
        buttons.text(answers[i]);
        buttons.attr('value', answers[i]);
        buttons.attr('id', 'button' + i);
        buttons.attr('class', 'answer btn btn-info');
        $('#answer-choices')
          .append(buttons)
          .append('<br>');
      }
      // if any of the answer choices are clicked:
      $('.answer').click(function() {
        var userGuess = this.value;
        // stop question, reset timer
        stopQuestion();
        questionTimer = 11;
        var correctAnswer =
          triviaGame[currentQuestion].choices[
            triviaGame[currentQuestion].answer
          ];

        // conditional to check if the user's guess is right or wrong, display appropriate response
        if (userGuess === correctAnswer) {
          $('.main-content').empty();
          $('#question').text('Correct! The right answer was ' + correctAnswer);
          amtCorrect++;
          amtAnswered++;
          displayResponse();
          currentQuestion++;
        } else {
          $('.main-content').empty();
          $('#question').text('Wrong! The right answer was ' + correctAnswer);
          amtWrong++;
          amtAnswered++;
          displayResponse();
          currentQuestion++;
        }
      });
    } else {
      $('.main-content').empty();
      endGame();
      resetGame();
    }
  };

  // start counter for question
  var startQuestion = function() {
    questionInterval = setInterval(decrementQuestion, 1000);
  };

  // count down question timer until it hits 0, then stop question, reset timer
  var decrementQuestion = function() {
    if (questionTimer === 0) {
      stopQuestion();
      questionTimer = 11;
      var correctAnswer =
        triviaGame[currentQuestion].choices[triviaGame[currentQuestion].answer];
      $('.main-content').empty();
      $('#question').text(
        'You ran out of time! The right answer was ' + correctAnswer
      );
      displayResponse();
      currentQuestion++;
    } else if (questionTimer > 0) {
      questionTimer--;
      $('#time-remaining').html(questionTimer + ' Seconds Remaining!');
    }
  };

  // clear question counter
  var stopQuestion = function() {
    $('#time-remaining').text('');
    clearInterval(questionInterval);
  };

  // second interval for answer display
  var responseInterval;
  var responseTimer = 2;

  // start counter for answer display
  var startResponse = function() {
    responseInterval = setInterval(decrementResponse, 1000);
  };

  // lower response counter by 1 until 0, then show next question
  var decrementResponse = function() {
    if (responseTimer === 0) {
      responseTimer = 2;
      $('.main-content').empty();
      showQuestions();
    } else {
      responseTimer--;
    }
  };

  // clear response counter
  var stopResponse = function() {
    $('#time-remaining').text('');
    $('#images').empty();
    clearInterval(responseInterval);
  };

  // show image for current question
  var displayResponse = function() {
    if (currentQuestion <= 8) {
      var responseImg = $('<img>');
      responseImg.attr('src', triviaGame[currentQuestion].img);
      responseImg.attr('width', '650px');
      $('#images').append(responseImg);
      startResponse();
    } else {
      endGame();
    }
  };

  // end the game and show the final score to the player
  var endGame = function() {
    $('.main-content').empty();
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
    $('#play-again').text('Click to Play Again!');
  };

  // reset game function empties the final score div and starts the game over correctly, but won't allow player to play a 3rd time
  var resetGame = function() {
    $('#play-again').click(function() {
      // added this for 2nd time playing through, problem is they won't have option to play a 3rd time
      $('#final-score').empty();

      amtCorrect = 0;

      amtWrong = 0;

      amtAnswered = 0;

      currentQuestion = 0;

      questionTimer = 11;

      showQuestions();
    });
  };
});
