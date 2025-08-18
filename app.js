/*

User Story / Pseudo Code:
- User clicks on a question in category
    - Create an event handler function (handleQuestionClick) that displays the corresponding question from the questionDirectory array for that index
- Question displays in display (id: questionDisplay)
- User types in answer into input field and clicks submit answer (id: submitAnswer)
    - Create another event handler function (handleSubmit) that displays the corresponding answer from the questionDirectory array for that index
- Correct answer is shown in display (id: answerDisplay) 
    - Questions and Answers will be kept within an array (questionDirectory)
    - Upon clicking the submit answer button (id: submitAnswer), function will look into object to identify if user input matches correct answer property for that question

- If inputted answer (value) === stored answer, then answer is correct
    - Add value of question (textContent of id: columnQuestion#) to score
- If inputted answer != stored answer, then answer is incorrect
    - Subtract value of question (textContent of id: columnQuestion#) from score
        - Will need to convert textContent of question to integer to run calculation (parseInt)

- Once score is added, attempted question textContent is removed from board and game continues
    - Until next question is clicked, the previous question, answer, and inputted answer remain on screen
- Once all questions are answered (textContent for whole board is "") then analyze current score
    - If current score is positive - user wins!
    - If current score is negative - user loses
        - Might need to store textContent for board in an array (like TicTacToe)
- User can play again by clicking Start Over Button (id reset)
    - Runs init function to reset board, return all textContent to board
*/

/*-------------------------------- Constants --------------------------------*/

const questionDirectory = [
    {questionID: "column1-question1", clicked: false, value: "$100", question: "This barnyard animal says 'Moo'", answer: "What is a cow?"},
    {questionID: "column1-question2", clicked: false, value: "$200", question: "It comes out of your faucet, and you shower in it too.", answer: "What is water?"},
    {questionID: "column1-question3", clicked: false, value: "$300", question: "This color is the only one that ends in 'urple.'", answer: "What is purple?"},
    {questionID: "column1-question4", clicked: false, value: "$400", question: "This number comes after two", answer: "What is three?"},
    {questionID: "column1-question5", clicked: false, value: "$500", question: "She is married to your father", answer: "Who is your mother?"},
]

// console.log(parseInt(questionDirectory[1].value.replace("$",""))) // this formula strips dollar sign from text to turn it into integer for calcs. Used below.




/*-------------------------------- Variables --------------------------------*/

let board
let winner
let score = 0
let currentQuestion


/*------------------------ Cached Element References ------------------------*/

const questionEls = document.querySelectorAll(".question")
    console.dir(questionEls)

const questionDisplay = document.getElementById("question-display")
    console.dir(questionDisplay)

const answerInput = document.getElementById("answer-input-button")
   console.dir(answerInput)

const submitAnswer = document.getElementById("submit-answer") 
    console.dir(submitAnswer)

const answerDisplay = document.getElementById("answer-display")
    console.dir(answerDisplay)

const scoreDisplay = document.getElementById("score-display")
    console.dir(scoreDisplay)

const resetButton = document.getElementById("reset")
    console.dir(resetButton)



/*-------------------------------- Functions --------------------------------*/

const init = () => {
    board
    winner = false
    score = 0
    currentQuestion = null
}

init()

const handleQuestionClick = (event) => { // has to grab the id of the element and match it to the id of the questionDirectory to pull out the correct question
   // console.dir(event.target.id) // grabbing correct ID from click
    let boardID = event.target.id
    let IDmatch = questionDirectory.find((question) => {
        return question.questionID === boardID // returns the object where the target ID matches the question ID 
    })
   //console.dir(IDmatch) // checking the correct object was returned
   if (IDmatch) { 
    // console.log(IDmatch.question)
    currentQuestion = IDmatch // storing the current object of the selected question so you can access the object properties later
    // console.dir(currentQuestion) // testing to see the currently selected object
    questionDisplay.textContent = IDmatch.question // returns the question property of the object!!!
    } else {
    return
   } 
//updateGame() // so that when the next question is clicked it will 
}

const handleSubmit = (event) => {
    // answerDisplay.textContent = currentQuestion.answer
    if (answerInput.value === currentQuestion.answer) {
        answerDisplay.textContent = "That is correct!" 
        score = score + parseInt(currentQuestion.value.replace("$","")) // stripping $ so that math can be performed
        // console.log(score) // just checking the math is working
    } else {
        answerDisplay.textContent = `I'm sorry, but no. The correct answer we were looking for was "${currentQuestion.answer}"`
        score = score - parseInt(currentQuestion.value.replace("$",""))
        // console.log(score) // just checking the math is working
    }
    scoreDisplay.textContent = score
    currentQuestion.clicked = true

    console.dir(currentQuestion)
    // look into styling this all above

   updateGame()
}

const updateGame = () => {
    questionDirectory.forEach((question) => { // looping through the questionDirectory
    if (question.clicked === true) { // which happens once we click submit answer button - line118

        document.getElementById(question.questionID).textContent= "" 
        console.log(document.getElementById(question.questionID).textContent= "")



    } else {
        return
    }
})
}

// const checkWinner()
// if score once all questions are clicked = true is positive then winner!
// if negative then loser




/*----------------------------- Event Listeners -----------------------------*/

questionEls.forEach((question) => {
    question.addEventListener("click",handleQuestionClick)
})

submitAnswer.addEventListener("click",handleSubmit)

resetButton.addEventListener("click",init)
// in order for this to work need to incorporate updateGame into functionality