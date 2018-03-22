$(document).ready(function() {
  // set timer to 30
  var timer = 30;

  // keep user's score
  var amtCorrect = 0;

  var amtWrong = 0;

  var amtAnswered = 0;

  // keep track of questions and answers
  var answers = [];

  var currentQuestion = 0;

  var triviaGame = [
    (questionOne = {
      question: 'What is the capital of Ireland?',
      answer: 2,
      choices: ['Cork', 'Wexford', 'Dublin', 'Galway']
    }),
    (questionTwo = {
      question: 'Who was the 3rd President of the United States?',
      answer: 0,
      choices: [
        'Thomas Jefferson',
        'John Adams',
        'James Madison',
        'Ben Franklin'
      ]
    }),
    (questionThree = {
      question: 'Who directed the movie "Inception"?',
      answer: 1,
      choices: [
        'Martin Scorsese',
        'Christopher Nolan',
        'Quentin Tarantino',
        'J.J. Abrams'
      ]
    }),
    (questionFour = {
      question: 'Who won the SuperBowl this year?',
      answer: 3,
      choices: [
        'New York Giants',
        'New England Patriots',
        'Pittsburgh Steelers',
        'Philadelphia Eagles'
      ]
    }),
    (questionFive = {
      question: 'What color IS NOT on the British flag?',
      answer: 0,
      choices: ['Green', 'White', 'Red', 'Blue']
    }),
    (questionSix = {
      question: 'Who starred in the movie "Rocky"?',
      answer: 1,
      choices: [
        'Al Pacino',
        'Sylvester Stallone',
        'Robert DeNiro',
        'George Clooney'
      ]
    }),
    (questionSeven = {
      question: 'What NBA team won the NBA Championship in 2017?',
      answer: 3,
      choices: [
        'San Antonio Spurs',
        'Boston Celtics',
        'Cleveland Cavaliers',
        'Golden State Warriors'
      ]
    }),
    (questionEight = {
      question: 'Which of these WAS NOT one of the original 13 colonies?',
      answer: 2,
      choices: ['New Jersey', 'Pennsylvania', 'Florida', 'Georgia']
    })
  ];

  var hide = function(element) {
    $(element).css('visibility', 'hidden');
  };

  var display = function(element) {
    $(element).css('visibility', 'visibile');
  };

  var clear = function() {
    $('#game-start').empty();
  };

  var startGame = function() {
    counter = setInterval(timeRemaining, 1000);
    $('#game-start').empty();
    showQuestion();
  };

  var showQuestion = function() {
    if (currentQuestion <= 7) {
      $('#question').html(
        '<h2>' + triviaGame[currentQuestion].question + '</h2>'
      );
      answers = triviaGame[currentQuestion].choices;
      display('.answer');
      for (var i = 0; i < answers.length; i++) {
        $('#answer' + i).html('<h3>' + answers[i] + '</h3>');
      }
    } else {
      endGame();
    }
  };

  var showAnswers = function() {
    $('#answer-choices').html(triviaGame[currentQuestion].choices);
  };

  var nextQuestion = function() {
    clearInterval();
    timer = 30;
  };

  var timeRemaining = function() {
    timer--;
    $('#time-remaining').html('<h2>Time Remaining: ' + timer + ' Seconds');
    if (timer === 0) {
      showAnswers();
    }
  };

  var stop = function() {
    clearInterval(counter);
  };

  var endGame = function() {
    // show results
  };

  $('button').click(function() {
    startGame();
    timeRemaining();
  });

  $('.answer').click(function() {
    var answerChosen = $(this);
    var value = answerChosen.attr('value');
    var correctAnswer = triviaGame[currentQuestion].answer;

    if (value === correctAnswer) {
      $('#answer-choices').empty();
      $('#question').empty();
      $('#answer').html(
        '<h2>You are correct!' +
          '<br>' +
          '<h3>The correct answer was ' +
          answers[correctAnswer] +
          '.'
      );
      setInterval(nextQuestion, 5000);
      amtAnswered++;
      amtCorrect++;
      currentQuestion++;
      showQuestion();
    } else {
      amtWrong++;
      amtAnswered++;
      currentQuestion++;
      timer = 30;
      $('#question').empty();
      showQuestion();
    }
  });
});
