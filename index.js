const STORE = [{
        question: 'What would you name this dish?',
        imgSrc: "broccoli-pic.jpg",
        imgAlt: "picture of broccoli",
        answers: [
            'string beans',
            'broccoli',
            'cauliflower',
            'mushrooms'
        ],
        correctAnswer: 'broccoli'
    },
    {
        question: 'What would you name this dish?',
        imgSrc: "string-bean-pic.jpg",
        imgAlt: "picture of string beans",
        answers: [
            'string beans',
            'broccoli',
            'cauliflower',
            'mushrooms'
        ],
        correctAnswer: 'string beans'
    },
    {
        question: 'Which of these are baked in wine sauce?',
        answers: [
            'Shwarma Chicken',
            'Pepper Steak',
            'Chicken Marsala',
            'Fried Chicken'
        ],
        correctAnswer: 'Chicken Marsala'
    },
    {
        question: 'Which of these flavors of fried chicken is sweet?',
        answers: [
            'Cap\'n Crunch',
            'Pretzel',
            'Fire Poppers',
            'Southern Fried'
        ],
        correctAnswer: 'Cap\'n Crunch'
    },
    {
        question: 'Which of these flavors of chicken is spicy?',
        answers: [
            'Cap\'n Crunch',
            'Pretzel',
            'Fire Poppers',
            'Southern Fried'
        ],
        correctAnswer: 'Fire Poppers'
    },
]

let score = 0;
let questionNumber = 0;

function generateQuestion() {
    if (questionNumber < STORE.length) {
        return createThing(questionNumber);
    } else {
        $('.questionBox').hide();
        $('.questionNumber').text(5);
    }
}

function updateScore() {
    score++;
    $('.score').text(score);
}

function updateQuestionNumber() {
    questionNumber++
    $('.questionNumber').text(questionNumber + 1);
}

function updateImg(questionKey) {
    $('img').remove();
    if (!!STORE[questionKey].imgSrc) {
        $('.questionBox').append(`<img src="${STORE[questionKey].imgSrc}" />`);
    }
}

updateImg(0);
updateImg(1);

function resetStats() {
    score = 0;
    questionNumber = 0;
    $('.score').text(0);
    $('.questionNumber').text(0);
}

function startQuiz() {
    $('.altBox').hide();
    $('.startQuiz').on('click', '.startButton', function(event) {
        $('.startQuiz').hide();
        $('.questionNumber').text(1);
        $('.questionBox').show();
        $('.questionBox').prepend(generateQuestion());
    });
}

function submitAnswer() {
    $('.questionNumberBox').on('submit', function(event) {
        event.preventDefault();
        $('.altBox').hide();
        $('.response').show();
        let selected = $('input:checked');
        let answer = selected.val();
        let correct = STORE[questionNumber].correctAnswer;
        if (answer === correct) {
            correctAnswer();
        } else {
            wrongAnswer();
        }
    });
}

function createThing(questionIndex) {
    let formMaker = $(`<form>
    <fieldset>
    <legend class="questionText">${STORE[questionIndex].question}
    </legend>
    </fieldset>
    </form>`)
    let fieldSelector = $(formMaker).find('fieldset');

    STORE[questionIndex].answers.forEach(function(answerValue, answerIndex) {
        $(`<label class="size" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span> </label>
        `).appendTo(fieldSelector);
    });
    $(`<button type="submit" class="submitButton button"> SUBMIT</button>
    `).appendTo(fieldSelector);
    return formMaker;
}

function correctAnswer() {
    $('.response').html(
        ` <h3>You are right!</h3>
        <button type="button" class="nextButton button">NEXT</button>`
    );
    updateScore();
}

function wrongAnswer() {
    $('.respnse').html(
        `<h3>Sorry, wrong answer</h3>
        <p class="size">It's actually:</p>
        <p class="size">${STORE[questionNumber].correctAnswer}</p>
        <button type="button" class="nextButton button">NEXT</button>`
    );
}

function nextQuestion() {
    $('.questionNumberBox').on('click', '.nextButton', function(event) {
        $('.altBox').hide();
        $('.questionBox').show();
        updateQuestionNumber();
        $('.questionBox form').replaceWith(generatequestion());
    });
}

function restartQuiz() {
    $('.nextQuestionBox').on('click', '.restartButton', function(event) {
        event.preventDefault();
        resetStats();
        $('.altBox').hide();
        $('.startQuiz').show();
    });
}

function makeQuiz() {
    startQuiz();
    generateQuestion();
    submitAnswer();
    nextQuestion();
    restartQuiz();
}

$(makeQuiz);