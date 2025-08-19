/*

User Story / Pseudo Code:
- User clicks on a question in category
    - Create an event handler function (handleQuestionClick) that displays the corresponding question from the questionDirectory array for that index
    - target.id of the question squares match the questionID of the corresponding question
- Question displays in display (id: questionDisplay)
- User types in answer into input field and clicks submit answer (id: submitAnswer)
    - Create another event handler function (handleSubmit) that displays the corresponding answer from the questionDirectory array for that index
- After submit answer button is clicked (handleSubmit function is run), something will be shown in the answer display  (id: answerDisplay)
    - Questions and Answers are kept within an array (questionDirectory)
    - Upon clicking the submit answer button (id: submitAnswer), function will look into object to identify if user input matches correct answer property for that question
- If inputted answer (value) === stored answer, then answer is correct and "That is correct!" is displayed in answerDisplay
    - Add value of question (questionDirectory.value) to score
- If inputted answer != stored answer, then answer is incorrect. State its incorrect and display correct answer.
    - Subtract value of question (questionDirectory.value) from score
        - In calculations, convert value of question to integer from string and remove $ to run calculation (parseInt & . replace)
- Once score is added, attempted question textContent is removed from board to signal question has been clicked and game continues
    - Make just answered question unclickable.
    - Until next question is clicked, the previous question, answer, and inputted answer remain on screen
        - Done so through the clear() function



- Once all questions are answered (questionDirectory.clicked = true for all questions) then analyze current score
    - Use the every() method to indentify that every questionDirectory.clicked = true
    - If current score is positive - user wins!
    - If current score is negative - user loses
        - Might need to store textContent for board in an array (like TicTacToe)
- User can play again by clicking Start Over Button (id reset)
    - Runs init function to reset board, return all textContent to board
*/

/*-------------------------------- Constants --------------------------------*/

const questionDirectory = [
    // have to add categoryID and categoryName key / property pairs to existing object or it messes up the ID match in handleQuestionClick
    // only need to add categoryID and categoryName key / property pairs once because of the .find() method used to identify them 
    {categoryID: "category1", categoryName: "SNL Celebrity Jeopardy!",
     questionID: "column1-question1", clicked: false, value: "$100", question: "This barnyard animal says 'Moo'", answer: "What is a cow?"},
    {questionID: "column1-question2", clicked: false, value: "$200", category: "SNL Celebrity Jeopardy!", question: "It comes out of your faucet, and you shower in it too.", answer: "What is water?"},
    {questionID: "column1-question3", clicked: false, value: "$300", category: "SNL Celebrity Jeopardy!", question: "This color is the only one that ends in 'urple.'", answer: "What is purple?"},
    {questionID: "column1-question4", clicked: false, value: "$400", category: "SNL Celebrity Jeopardy!", question: "This number comes after two", answer: "What is three?"},
    {questionID: "column1-question5", clicked: false, value: "$500", category: "SNL Celebrity Jeopardy!", question: "She is married to your father", answer: "Who is your mother?"},

    {categoryID: "category2", categoryName: "Food & Drink",
     questionID: "column2-question1", clicked: false, value: "$100", question: "This fruit keeps the doctor away if eaten once a day", answer: "What is an apple?"},
    {questionID: "column2-question2", clicked: false, value: "$200", question: "It's the Italian word for “ice cream.”", answer: "What is gelato?"},
    {questionID: "column2-question3", clicked: false, value: "$300", question: "This legume is used to make hummus.", answer: "What are chickpeas?"},
    {questionID: "column2-question4", clicked: false, value: "$400", question: "This cocktail of vodka, tomato juice, and spices is often enjoyed at brunch.", answer: "What is a Bloody Mary?"},
    {questionID: "column2-question5", clicked: false, value: "$500", question: "This spice, sometimes called “red gold,” is the most expensive in the world by weight and comes from the stigma of a flower.", answer: "What is saffron?"},
    
]

// console.log(parseInt(questionDirectory[1].value.replace("$",""))) // this formula strips dollar sign from text to turn it into integer for calcs. Used below.




/*-------------------------------- Variables --------------------------------*/

let score = 0
let currentQuestion


/*------------------------ Cached Element References ------------------------*/

// Categories
const categoryOne = document.getElementById("category1")
    // console.dir(categoryOne) returns element object
    const categoryOneTitle = questionDirectory.find((question) => { // finds the first instance of "category1"
        return question.categoryID === "category1"
    }) // console.dir(categoryOneTitle)// returns the category 1 object to pull category name from
    categoryOne.textContent = categoryOneTitle.categoryName
    
const categoryTwo = document.getElementById("category2")
    const categoryTwoTitle = questionDirectory.find((question) => { 
        return question.categoryID === "category2"
    })
    categoryTwo.textContent = categoryTwoTitle.categoryName

// Questions
const questionEls = document.querySelectorAll(".question")
    console.dir(questionEls)

const questionDisplay = document.getElementById("question-display")
    console.dir(questionDisplay)

const originalQuestionDisplay = questionDisplay.textContent

// Answers
const answerInput = document.getElementById("answer-input")
   console.dir(answerInput)

const submitAnswer = document.getElementById("submit-answer-button") 
    console.dir(submitAnswer)

const answerDisplay = document.getElementById("answer-display")
    console.dir(answerDisplay)

const originalAnswerDisplay = answerDisplay.textContent

// Score & Reset
const scoreDisplay = document.getElementById("score-display")
    console.dir(scoreDisplay)

const resetButton = document.getElementById("reset")
    console.dir(resetButton)


/*-------------------------------- Functions --------------------------------*/

const init = () => {
    score = 0
    currentQuestion = null
    questionDirectory.forEach((question) => { // need to change all of the clicked properties back to false when restarting game
        question.clicked = false
    })
    // console.log("Init works") // confirming that the function works before adding all of the display changes
    questionDisplay.textContent = originalQuestionDisplay
    answerDisplay.textContent = originalAnswerDisplay
    scoreDisplay.textContent = 0
    // NEED TO RESET BOARD // CREATE CACHED ELEMENTS FOR BOARD ALSO
}
// init()


const clear = () => {
    answerDisplay.textContent = "" // starts out empty and everytime a quesiton is clicked it becomes empty
    answerInput.value = "" // starts out empty and everytime a question is clicked it becomes empty

    // need to add functionality that when you click a question you cannot click another question until you click the submit asnwer button
}

const handleQuestionClick = (event) => { // has to grab the id of the element and match it to the id of the questionDirectory to pull out the correct question
   // console.dir(event.target.id) // grabbing correct ID from click
    clear() // clears the board of the previous answer and input value when new question is clicked
    let boardID = event.target.id
    let IDmatch = questionDirectory.find((question) => {
        return question.questionID === boardID // returns the object where the target ID matches the question ID 
        // quite proud of realizing that the easiest way to return the correct questin was to match the ID's for the elements and the question array
    })
   //console.dir(IDmatch) // checking the correct object was returned
   if (IDmatch) { 
    // console.log(IDmatch.question)
    currentQuestion = IDmatch // storing the current object of the selected question so you can access the object properties later
    // not necessary, could use IDmatch later but it helps with naming
    // console.dir(currentQuestion) // testing to see the currently selected object
    questionDisplay.textContent = IDmatch.question // returns the question property of the object and displays it in questionDisplay!!
    } else {
    return
   } 
   submitAnswer.disabled = false // disabled property on the submitAnswer button is false (meaning its clickable) when the handleQuestionClick function is run
   // This means you are able to click it -- line 133
}

const handleSubmit = (event) => {
    if (answerInput.value === currentQuestion.answer) { // grabbing the value which is what is typed in
        answerDisplay.textContent = "That is correct!" 
        score = score + parseInt(currentQuestion.value.replace("$","")) // stripping $ so that math can be performed
        // console.log(score) // just checking the math is working
    } else {
        answerDisplay.textContent = `I'm sorry, but no. We were looking for "${currentQuestion.answer}"`
        score = score - parseInt(currentQuestion.value.replace("$",""))
        // console.log(score) // just checking the math is working
    }
    scoreDisplay.textContent = score
    currentQuestion.clicked = true // setting this to true so that I can assess which squares are not clickable anymore
    // will be used to determine when the game is over as well gameResult()

    submitAnswer.disabled = true // Then once the handleSubmit function is run, disabled turns to true so you cannot click the submit button again
    // until you run the handleQuestionClick function (click another question!)

    // console.dir(currentQuestion) // checking to see if clicked turns to true once submit answer button is clicked
    // look into styling this all above

    // need to add functionality here that once the submit button is clicked, you have to click another question before clicking the button again
    // right now if you click submit twice in a row it will adjust your score again
   updateGame()
   gameResult() // check if the game is over after every answer submission

   // can probably break out the scoring mechanics into its own function and call it here to clean up the handleSubmit function 
}



const updateGame = () => {
    questionDirectory.forEach((question,index) => { // looping through the questionDirectory array
    if (question.clicked === true) { // which happens once we click submit answer button - line 128
        questionEls[index].textContent = "-" // this should still work even with more question columns
        questionEls[index].removeEventListener("click",handleQuestionClick) // removes the handleQuestionClick event listener once the questionDirectory.clicked = true
        } else {
        return
    }
})
}

const gameResult = () => {
    if (questionDirectory.every((question) => {
        return question.clicked === true
    }) && score > 0) {
        questionDisplay.textContent = "Congratulations, you won! Make your Final Jeopardy wager below!"
        //answerDisplay.textContent = final jeopardy category
        // resetButton.textContent = "Play again?" - will have to say this after final jeopardy
    } else if (questionDirectory.every((question) => {
        return question.clicked === true
    }) && score < 0) {
        questionDisplay.textContent = "Sorry, you lost."
        answerDisplay.textContent = "No final Jeopardy for you."
        resetButton.textContent = "Play again?"
    } else {
        return
    }
}


// can probably add a feature that if you win, a new input box appears asking how much you would want to wager on final jeopardy
// create a variable called wager and start it at 0 // also add a key property pair to your questionDirectory for a final jeopardy question
// then after wager is made, display the final jeopardy question in the displayQuestion

// after building final jeopardy, maybe you can use same functionality to add a daily double somewhere
// add new property / key pair to all of the questions called dailyDouble. Set to true for the daily double and false for all of the others
// if that question is selected, have wager box appear







/*----------------------------- Event Listeners -----------------------------*/

questionEls.forEach((question) => {
    question.addEventListener("click",handleQuestionClick)
})

submitAnswer.addEventListener("click",handleSubmit)


resetButton.addEventListener("click",init)
// in order for this to work need to incorporate updateGame into functionality