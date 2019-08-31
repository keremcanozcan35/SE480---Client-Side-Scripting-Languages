//this js document is for the quiz page (index2.html)

(function() {
  //Here is the question with answers 
  var quizQuestions = [{
    question: "What is 12*5?",
    choices: [2, 5, 60, 15, 20],
    correctAnswer: 2
  }, {
    question: "Name of the seventh planet from sun?",
    choices: ["Saturn", "Mars", "Earth", "Neptune", "Uranus"],
    correctAnswer: 4
  }, {
    question: "What is 8+9?",
    choices: [17, 18, 10, 19, 15],
    correctAnswer: 0
  },{
    question: "What is the color of the milk of hypotatamus?",
    choices: ["Red", "Blue", "Pink", "Black","White"],
    correctAnswer: 2
  },{
    question: "What is 1*7?",
    choices: [4, 5, 6, 7, 8],
    correctAnswer: 3
  }, {
    question: "What is the capital city of Spain?",
    choices: ["Ankara", "Barcelona", "Roma", "Los Angeles", "Madrid"],
    correctAnswer: 4
  }, {
    question: "What is 7-1?",
    choices: [4, 5, 6, 7, 8],
    correctAnswer: 2
  }, {
    question: "What is the diameter of Earth?(miles)",
    choices: [7000, 3000, 8000, 9000, 10000],
    correctAnswer: 2
  }];
  
  var quizQuestionsCounter = 0; //Tracks question number
  var userChoices = []; //User choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Function that it gives the questions
  displayNext();
  
  // Click handler function for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If the user not select any choice
    if (isNaN(userChoices[quizQuestionsCounter])) {
      alert('Please make a selection!');
    } else {
      quizQuestionsCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    quizQuestionsCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    quizQuestionsCounter = 0;
  userChoices = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(quizQuestions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < quizQuestions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += quizQuestions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    userChoices[quizQuestionsCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      //KCO
      if(quizQuestionsCounter < quizQuestions.length){
        var nextQuestion = createQuestionElement(quizQuestionsCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(userChoices[quizQuestionsCounter]))) {
          $('input[value='+userChoices[quizQuestionsCounter]+']').prop('checked', true);
        }
        
        // For the previous button
        if(quizQuestionsCounter === 1){
          $('#prev').show();
        } else if(quizQuestionsCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // This part for the score's of the game
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < userChoices.length; i++) {
      if (userChoices[i] === quizQuestions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    //here is the score of your exam
    score.append('You got ' + numCorrect + ' questions out of ' +
                 quizQuestions.length + ' right!!!');
    return score;
  }
})();