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
      question: 'Who won the SuperBowl this year?',
      answer: 3,
      choices: [
        'New York Giants',
        'New England Patriots',
        'Pittsburgh Steelers',
        'Philadelphia Eagles'
      ],
      img: 'assets/images/eagles-superbowl.jpg'
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
      img: 'assets/images/sylvester-stallone-rocky.jpg'
    }),
    (questionSeven = {
      question: 'What NBA team won the NBA Championship in 2017?',
      answer: 3,
      choices: [
        'San Antonio Spurs',
        'Boston Celtics',
        'Cleveland Cavaliers',
        'Golden State Warriors'
      ],
      img: 'assets/images/warriors-logo.jpg'
    }),
    (questionEight = {
      question: 'Which of these WAS NOT one of the original 13 colonies?',
      answer: 2,
      choices: ['New Jersey', 'Pennsylvania', 'Florida', 'Georgia'],
      img: 'assets/images/florida.jpg'
    })
  ];

  var amtCorrect = 0;

  var amtWrong = 0;

  var amtAnswered = 0;

  var currentQuestion = 0;

  var questionInterval;

  var questionTimer = 10;

  function decrementQuestion() {
    if (questionTimer === 0) {
      currentQuestion++;
      amtAnswered++;
    } else {
      $('#time-remaining').text(questionTimer);
      questionTimer--;
    }
  }

  function startQuestion() {
    questionInterval = setInterval(decrementQuestion, 1000);
  }

  function stopQuestion() {
    $('#time-remaining').empty();
    clearInterval(questionInterval);
  }

  // second interval for answer display
  var responseInterval;
  var responseTimer = 5;

  function decrementResponse() {
    if (responseTimer === 0) {
      responseTimer = 5;
      $('.main-content').empty();
      showQuestions();
    } else {
      responseTimer--;
      $('#time-remaining').text(responseTimer);
    }
  }

  function startResponse() {
    responseInterval = setInterval(decrementResponse, 1000);
  }

  function stopResponse() {
    $('#time-remaining').text('');
    $('#images').empty();
    clearInterval(responseInterval);
  }

  // start game by clicking button
  $('#start-game').click(function() {
    $('#start-game').hide();
    showQuestions();
  });

  var showQuestions = function() {
    stopResponse();

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
        buttons.attr('class', 'answer');
        $('#answer-choices')
          .append(buttons)
          .append('<br>');
      }
      $('.answer').click(function() {
        var userGuess = this.value;
        stopQuestion();
        questionTimer = 10;
        var correctAnswer =
          triviaGame[currentQuestion].choices[
            triviaGame[currentQuestion].answer
          ];

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
    }
  };

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

  var endGame = function() {
    $('.main-content').empty();
    $('#images').append(
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
  };
});
