/*

User Story / Pseudo Code:

1) User clicks on a question in category (function: handleQuestionClick() )
    - on click, original display messaging (cached elements: questionDisplay & answerDisplay) are cleared (function: clear () )
    - handleQuestionClick function searches for the target.id of the question clicked
    - then searches array questionDirectory using the .find() method for any instance where target.id = questionID
    - returns the object within the questionDirectory array where a match is found 
        - saves that to variable currentQuestion to use for the handleAnswerClick() function
    - then displays the question property associated with that matched object to the DOM for the user to see (cached element: questionDisplay)
        - submit answer button (cached element: submitAnswer) is enabled to submit
        - question square's style.color changes to signify current question being answered
        - event listener for handleQuestionClick() function is removed so no other question can be selected
    
2) User submit answer (function: handleAnswerClick() ) 
    - user types in answer into input field (cached element: answerInput) and clicks submit answer (cached element: submitAnswer)
    - if answerInput.value = currentQuestion.answer (currentQuestion variable defined earlier in handleQuestionClick() function)
        - answerDislay.textContent displays correct answer messaging
        - user score is increased by value of question listed in questionDirectory array (currentQuestion.value)
    - if answerInput.value != currentQuestion.answer
        - answerDislay.textContent displays incorrect answer messaging
        - user score is decreased by value of question listed in questionDirectory array 
    - currentQuestion clicked property in questionDirectory is marked as clicked
    - submit answer button is disabled again until another question is clicked
    - event listener for handleQuestionClick() function is added back so next question can be selected

3) Board is updated (function: updateGame() )
    - using the forEach() method, questionDirectory is looped through to identify questions that have clicked property = true
        - if clicked, then textContent of question element is replaced with a "-" to signify quesiton has been attempted
        - event listener for handleQuestionClick() function is removed just for the attempted question so it can no longer be selected

4) First three steps above are repeated until all questions have been attempted (function: gameResult() )
    - Once every clicked property in the questionDirectory equals true (identified using the .every() method), score is assessed
        - if score is positive, then display winner messaging
        - if score is negative, then display loser messaging

5) User can select reset button to play again / start over (function: init() )
    - sets score back to 0
    - sets the currentQuestion selected back to null
    - sets all of the clicked properties in questionDirectory to false
    - adds back the event listener for handleQuestionClick() function to all question elements
    - submit answer button is disabled
    - displays all initial game messaging
        - question display 
        - answer display
        - input value & placeholder
        - score display
        - question element textContent and style.color (cached element: originalValuesDisplay)
            - Since question elements returns a node list, cannot access textContent or style.color of elements directly
            - so original question element textContent and style.color properties are pushed into originalValuesDisplay array to be used during init() function
*/


/*-------------------------------- Constants --------------------------------*/

const questionDirectory = [
    // questions and answers are added to this array
        // must be added in same format with question & category ID's and values lined up or will break
    // have to add categoryID and categoryName key / property pairs to existing object or it messes up the ID match in handleQuestionClick
    // only need to add categoryID and categoryName key / property pairs once because of the .find() method used to identify them 
    {categoryID: "category1", categoryName: "SNL Celebrity Jeopardy!",
     questionID: "column1-question1", clicked: false, value: "$100", question: "This barnyard animal says 'Moo.'", answer: "What is a cow?"},
    {questionID: "column1-question2", clicked: false, value: "$200", question: "It comes out of your faucet, and you shower in it too.", answer: "What is water?"},
    {questionID: "column1-question3", clicked: false, value: "$300", question: "This color is the only one that ends in 'urple.'", answer: "What is purple?"},
    {questionID: "column1-question4", clicked: false, value: "$400", question: "This number comes after two.", answer: "What is three?"},
    {questionID: "column1-question5", clicked: false, value: "$500", question: "A state that ends in 'Hampshire.'", answer: "What is New Hampshire?"},

    {categoryID: "category2", categoryName: "Bites & Beverages",
     questionID: "column2-question1", clicked: false, value: "$100", question: "This fruit keeps the doctor away if eaten once a day.", answer: "What is an apple?"},
    {questionID: "column2-question2", clicked: false, value: "$200", question: "It's the Italian word for “ice cream.”", answer: "What is gelato?"},
    {questionID: "column2-question3", clicked: false, value: "$300", question: "These legumes are used to make hummus.", answer: "What are chickpeas?"},
    {questionID: "column2-question4", clicked: false, value: "$400", question: "This cocktail of vodka, tomato juice, and spices is often enjoyed at brunch.", answer: "What is a Bloody Mary?"},
    {questionID: "column2-question5", clicked: false, value: "$500", question: "This spice, sometimes called “red gold,” is the most expensive in the world by weight and comes from the stigma of a flower.", answer: "What is saffron?"},
]

// console.log(parseInt(questionDirectory[1].value.replace("$",""))) // this formula strips dollar sign from text to turn it into integer for calcs. Used below.

/*-------------------------------- Variables --------------------------------*/

let score = 0
let currentQuestion

/*------------------------ Cached Element References ------------------------*/

// Categories--------------------------------------------
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

// Questions--------------------------------------------
const questionEls = document.querySelectorAll(".question")
    //console.dir(questionEls)
 
// the questionEls directly does not have textContent, the elements within it do so you cannot just write questionEls.textContent like I did for the originalQuestion & Answer Display 
const originalValuesDisplay = [] // need empty array to hold the textContents and color.style for all the questionEls

questionEls.forEach((element) => { // add to this array with a forEach loop
    originalValuesDisplay.push({
        text: element.textContent, // forEach can look at each elements textContent and then push it to my new object array
        color: element.style.color // also forEach can look at each elements style.color and then push it to my new object array
        })
})
//console.log(originalValuesDisplay) // confirming array populates with correct values

const questionDisplay = document.getElementById("question-display")
    //console.dir(questionDisplay)

const originalQuestionDisplay = questionDisplay.textContent
    //console.dir(originalQuestionDisplay)

// Answers--------------------------------------------
const answerInput = document.getElementById("answer-input")
    //console.dir(answerInput)

const originalInputPlaceholder = answerInput.placeholder
    //console.dir(originalInputPlaceholder)

const submitAnswer = document.getElementById("submit-answer-button") 
    //console.dir(submitAnswer)

const answerDisplay = document.getElementById("answer-display")
    //console.dir(answerDisplay)

const originalAnswerDisplay = answerDisplay.textContent
    //console.dir(originalAnswerDisplay)

// Score & Reset--------------------------------------------
const scoreDisplay = document.getElementById("score-display")
    //console.dir(scoreDisplay)

const resetButton = document.getElementById("reset")
    //console.dir(resetButton)


/*-------------------------------- Functions --------------------------------*/

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
        // quite proud of realizing that the easiest way to return the correct question was to match the ID's for the elements and the question array
    })
   //console.dir(IDmatch) // checking the correct object was returned
    currentQuestion = IDmatch // storing the current object of the selected question so you can access the object properties later
    // console.dir(currentQuestion) // testing to see the currently selected object
    questionDisplay.textContent = currentQuestion.question // returns the question property of the object and displays it in questionDisplay!!
    submitAnswer.disabled = false // disabled property on the submitAnswer button is false (meaning its clickable) when the handleQuestionClick function is run
    let squareClicked = document.getElementById(boardID)
    squareClicked.style.color = "white" // changing question element dislay to white once clicked
    questionDirectory.forEach((question,index) => { // once a question is clicked, remove event listener from all questions so you are locked into the question, cant change it
        questionEls[index].removeEventListener("click",handleQuestionClick)
    })
}
   
const handleSubmit = (event) => {
    if (answerInput.value === currentQuestion.answer) { // grabbing the value which is what is typed in
        answerDisplay.textContent = " ✅ That is correct!" 
        score = score + parseInt(currentQuestion.value.replace("$","")) // stripping $ so that math can be performed
        // console.log(score) // just checking the math is working
    } else {
        answerDisplay.textContent = `❌ I'm sorry, but no. We were looking for "${currentQuestion.answer}"`
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

    questionDirectory.forEach((question,index) => { // once you click submit, I add back the event listener so that you can click the next question
        questionEls[index].addEventListener("click",handleQuestionClick) // but then remove it only from the questions whose clicked property = true in the updateGame() function so you cant click it again later
    })


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
        questionDisplay.textContent = "Congratulations, you are a Jeopardy champion! 🏆"
        answerDisplay.textContent = `You're going home with $${score}!`
        // finalJeopardy()
    } else if (questionDirectory.every((question) => {
        return question.clicked === true
    }) && score < 0) {
        questionDisplay.textContent = "Sorry, you lost."
        answerDisplay.textContent = "Click the button below to try again!"
        resetButton.textContent = "Play again?"
    } else {
        return
    }
}



const init = () => {
    score = 0
    currentQuestion = null
    submitAnswer.disabled = true // cant click submit answer button without clicking a question first
    questionDirectory.forEach((question) => { // change all of the clicked properties in my questionDirectory back to false when restarting game
        question.clicked = false
    })
    // console.log("Init works") // confirming that the function works before adding all of the display changes
    questionDisplay.textContent = originalQuestionDisplay
    answerDisplay.textContent = originalAnswerDisplay
    answerInput.placeholder = originalInputPlaceholder
    answerInput.value = ""
    scoreDisplay.textContent = 0
    questionEls.forEach((element,index) => { // again forEach can access the properties wihin the questionEls node
        element.textContent = originalValuesDisplay[index].text // cycle through each index of the originalValuesDisplay array to add the textContent stored in the 'text' key of my object array originalValueDisplay
        element.style.color = originalValuesDisplay[index].color // cycle through each index of the originalValuesDisplay array to add the stye.color stored in the 'color' key of my object array originalValueDisplay
    })
    questionEls.forEach((question) => {
        question.addEventListener("click",handleQuestionClick) // since we removed the event handler in the updateGame function, we have to add it back
        // when running init() or we wont be able to click any questions after restarting
})
}

/*----------------------------- Event Listeners -----------------------------*/

questionEls.forEach((question) => {
    question.addEventListener("click",handleQuestionClick)
})

submitAnswer.addEventListener("click",handleSubmit)


resetButton.addEventListener("click",init)
// in order for this to work need to incorporate updateGame into functionality


/*----------------------------- Code Graveyard -----------------------------*/


/*
Attempted Daily Double Wager Functionality

// conditional below placed in handleQuestionClick function
 if (IDmatch.isDailyDouble === false) { // value inputted in questionDirectory object
        return
    } else if (IDmatch.isDailyDouble === true) {
        dailyDouble()
    }


const dailyDouble = () => {
    const scoreDiv = document.querySelector(".score")
    const wagerInputBox = document.createElement("input")
    scoreDiv.appendChild(wagerInputBox)
        wagerInputBox.placeholder = "Make your wager!"
    const wagerSubmitBtn = document.createElement("button")
    wagerSubmitBtn.textContent = "Submit Wager"
    scoreDiv.appendChild(wagerSubmitBtn)

    let input = wagerInputBox.value
    let wager = parseInt(input)

    wagerSubmitBtn.addEventListener("click",console.log(wager))
}
*/

/*
Final Jeopardy Wager Psuedo Code

const finalJeopardyDirectory = {category: "TEST CAT", question: "TEST QUE", answer: "TEST ANS"} 

const finalJeopardy = () => {
need to have input box appear to make wager
once wager is submitted then questionDisplay.textContent = finalJeopardyDirectory.question
once answer is inputted in input box, user clicks submit answer
need to create new eventHandler / event listener called handleFinalJeopardySubmit
checks if guessed answer = finalJeopardyDirectory.answer
    If yes, then score is increased by wager amount
    If no, then score is decreased by wager amount
}

*/