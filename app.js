/*

User Story / Pseudo Code:

1) User clicks on a question in category (function: handleQuestionClick() )
    - on click, original display messaging (cached elements: questionDisplay & answerDisplay) are cleared (function: clear() )
    - handleQuestionClick function searches for the target.id of the question clicked
    - then searches array questionDirectory using the .find() method for any instance where target.id = questionID
    - returns the object within the questionDirectory array where a match is found 
        - saves that to variable currentQuestion to use for the handleAnswerClick() function later
    - then displays the question property associated with that matched object to the DOM for the user to see (cached element: questionDisplay)
        - submit answer button (cached element: submitAnswer) is enabled to submit
        - question square's style.color changes to signify current question being answered
        - event listener for handleQuestionClick() function is removed so no other question can be selected
    
2) User submits answer (function: handleAnswerClick() ) 
    - user types answer into input field (cached element: answerInput) and clicks submit answer (cached element: submitAnswer)
    - if answerInput.value = currentQuestion.answer (currentQuestion variable defined earlier in handleQuestionClick() function)
        - answerDislay.textContent displays correct answer messaging
        - user score is increased by value of question listed in questionDirectory array (currentQuestion.value)
    - if answerInput.value != currentQuestion.answer
        - answerDislay.textContent displays incorrect answer messaging
        - user score is decreased by value of question listed in questionDirectory array 
    - currentQuestion clicked property in questionDirectory is marked as clicked
    - submit answer button is disabled again until next question is clicked
    - event listener for handleQuestionClick() function is added back so next question can be selected

3) Board is updated (function: updateGame() )
    - using the forEach() method, questionDirectory is looped through to identify questions that have clicked property = true
        - if clicked, then textContent of question element is replaced with a "-" to signify quesiton has been attempted
        - event listener for handleQuestionClick() function is removed just for the attempted question so it can no longer be selected

4) First three steps above are repeated until all questions have been attempted (function: checkGameResult() )
    - Once every clicked property in the questionDirectory equals true (identified using the .every() method), score is assessed
        - if score is positive, then display winner messaging
        - if score is negative, then display loser messaging

5) User can select reset button to play again / start over (function: init() )
    - sets score back to 0
    - sets the currentQuestion selected back to null
    - sets all of the clicked properties in questionDirectory to false
    - adds back event listener for handleQuestionClick() function to all question elements
    - submit answer button is disabled
    - displays all initial game messaging
        - question display 
        - answer display
        - input value & placeholder
        - score display
        - question element textContent and style.color (cached element: originalValuesDisplay)
            - since question elements returns node list, cannot access textContent or style.color of elements directly
            - so original question element textContent and style.color properties are pushed into originalValuesDisplay array to be used during init() function
*/


/*-------------------------------- Constants --------------------------------*/

const questionDirectory = [
    // questions and answers are added to this array
        // must be added in same format with question & category ID's and values lined up.
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

    {categoryID: "category3", categoryName: "Around the World!",
     questionID: "column3-question1", clicked: false, value: "$100", question: "The pyramids of Giza are found in this country.", answer: "What is Egypt?"},
    {questionID: "column3-question2", clicked: false, value: "$200", question: "This U.S. state is famous for having the Grand Canyon", answer: "What is Arizona?"},
    {questionID: "column3-question3", clicked: false, value: "$300", question: "This country is shaped like a boot.", answer: "What is Italy?"},
    {questionID: "column3-question4", clicked: false, value: "$400", question: "The Eiffel Tower is located in this European city.", answer: "What is Paris?"},
    {questionID: "column3-question5", clicked: false, value: "$500", question: "This city is the capital of Canada.", answer: "What is Ottawa?"},

]

/*-------------------------------- Variables --------------------------------*/

let score = 0
let currentQuestion

/*------------------------ Cached Element References ------------------------*/

// Categories--------------------------------------------

const categoryEls = document.querySelectorAll(".category") // selecting category classes
let categoryNameArray = [] // create array to populate with categoryNames from questionDirectory        

const pushCategoryArray = () => {
    questionDirectory.forEach((category) => {
        categoryNameArray.push(category.categoryName) // push categoryNames from questionDirectory to categoryNameArray
    })
}

pushCategoryArray()     
    // console.dir(categoryNameArray) // checking that categoryNameArray is populating
    // working, however, pushes undefined values because looking at every object in questionDirectory array for category name when only one per element

const removeUndefined = () => {
    categoryNameArray = categoryNameArray.filter((category) => { // filter out all undefined elements in categoryNameArray
        return category
    })
}

removeUndefined()
    // console.dir(categoryNameArray) // checking that categoryNameArray now only has valid elements

const assignCategoryName = () => {
    categoryEls.forEach((category,index) => {
          return category.textContent = categoryNameArray[index] // add elements in updated categoryNameArray as textContent for category elements
    })
}

assignCategoryName()

// Questions--------------------------------------------

const questionEls = document.querySelectorAll(".question")
    // console.dir(questionEls) // returns questiionEls node list
 
const originalValuesDisplay = []
    // cannot access questionEls textContent directly as it is node list
    // need empty array to hold textContent and color.style for all the questionEls elements

questionEls.forEach((element) => { // forEach can look at each elements properties and then push them to object array originalValuesDisplay
    originalValuesDisplay.push({
        text: element.textContent, // pushing textContent
        color: element.style.color // pushing style.color
        })
})
    // console.log(originalValuesDisplay) // confirming array populates with correct property values

const questionDisplay = document.getElementById("question-display")
    //console.dir(questionDisplay)

const originalQuestionDisplay = questionDisplay.textContent
    // console.dir(originalQuestionDisplay)

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

// Score, Reset & Results --------------------------------------------

const scoreDisplay = document.getElementById("score-display")
    //console.dir(scoreDisplay)

const resetButton = document.getElementById("reset")
    //console.dir(resetButton)

const originalResetButton = resetButton.textContent
    // console.dir(originalResetButton)

const gameResultHeader = document.querySelector("header")
    // parent of question, answer and future winner / loser messaging

const gameResultText = document.createElement("p")
    
/*-------------------------------- Functions --------------------------------*/

const clear = () => { // properties start empty & everytime quesiton is clicked become empty
    
    answerDisplay.textContent = "" 
    answerInput.value = "" 

}

const handleQuestionClick = (event) => { 

    clear()

    let boardID = event.target.id
        // console.dir(event.target.id) // grabbing correct element ID from click
    let IDmatch = questionDirectory.find((question) => {
        return question.questionID === boardID // return object inside questionDirectory array where target.id matches questionID 
        // quite proud of realizing that the easiest way to return the correct question was to match the ID's for the elements and the question array
    })
        //console.dir(IDmatch) // checking correct object is returned

    currentQuestion = IDmatch // storing selected question object to access later
    questionDisplay.textContent = currentQuestion.question
    submitAnswer.disabled = false

    let squareClicked = document.getElementById(boardID)
    squareClicked.style.color = "white" // changing question element dislay once clicked to signify question selected
    
    questionDirectory.forEach((question,index) => { // remove event listener from all question elements so user cannot select another during answer
        questionEls[index].removeEventListener("click",handleQuestionClick)
    })

}
   
const handleSubmit = (event) => {

    if (answerInput.value === currentQuestion.answer) { // referencing currentQuestion defined in handleQuestionClick()
        answerDisplay.textContent = " ✅ That is correct!" 
        score = score + parseInt(currentQuestion.value.replace("$","")) // .replace() strips "$" so score can be calculated
        // console.log(score) // checking math is working for correct answer
    } else {
        answerDisplay.textContent = `❌ I'm sorry, but no. We were looking for "${currentQuestion.answer}"`
        score = score - parseInt(currentQuestion.value.replace("$",""))
        // console.log(score) // checking math is working for incorrect answer
    }

    currentQuestion.clicked = true 
        // adjusting clicked property in current question object of questionDisplay array 
        // used to determine when the game is over in checkGameResult()
        // console.dir(currentQuestion) // checking to see if clicked property updates

    if (score < 0) { // score formatting
        scoreDisplay.textContent = `-$${Math.abs(score)}` // if negative, use Math.abs() method to extract absolute value of score 
    } else {
        scoreDisplay.textContent = `$${score}` // if positive, just display score as is
    }

    submitAnswer.disabled = true // ensures user cannot click submit again without selecting next question

    questionDirectory.forEach((question,index) => { 
        questionEls[index].addEventListener("click",handleQuestionClick) // add back event listener to all question elements so user can click next question
    })

    updateGame()

    checkGameResult()

}

const updateGame = () => {

    questionDirectory.forEach((question,index) => { 
        if (question.clicked === true) {
            questionEls[index].textContent = "-"
            questionEls[index].removeEventListener("click",handleQuestionClick) // removes the handleQuestionClick event listener from just the answered questions
        } else {
            return
        }
    })

}

const checkGameResult = () => {

    if (questionDirectory.every((question) => {
        return question.clicked === true }) 
        &&
        score > 0) {
            gameResultHeader.prepend(gameResultText) // prepend adds element as first chilld of parent
            gameResultText.textContent = `🏆 Congratulations, you are a Jeopardy champion! You're going home with $${score}!`
            gameResultText.style.color = "#ffcc00"
            resetButton.textContent = "Play again?"
        
    } else if (questionDirectory.every((question) => {
        return question.clicked === true}) 
        && score < 0) {
            gameResultHeader.prepend(gameResultText)
            gameResultText.textContent = `👎 Sorry, you lost. Click the button at the bottom to play again!`
            gameResultText.style.color = "#ffcc00"
            resetButton.textContent = "Play again?"

    } else {
        return
    }

}

const init = () => {

    score = 0
    currentQuestion = null

    questionDirectory.forEach((question) => { 
        question.clicked = false
    })
        // console.log("Init works") // confirming init() function works before adding all of display changes
    
    gameResultText.remove() // using remove() method to remove the game result text
    questionDisplay.textContent = originalQuestionDisplay
    answerDisplay.textContent = originalAnswerDisplay
    answerInput.placeholder = originalInputPlaceholder
    answerInput.value = ""
    submitAnswer.disabled = true

    questionEls.forEach((element,index) => { // again forEach can access the properties wihin the questionEls node
        element.textContent = originalValuesDisplay[index].text // cycle through each index of originalValuesDisplay array to add textContent property stored in 'text' key
        element.style.color = originalValuesDisplay[index].color // cycle through each index of originalValuesDisplay array to add stye.color property stored in 'color' key
    })

    questionEls.forEach((question) => {
        question.addEventListener("click",handleQuestionClick) // add back event listener to each question element
        
    })

    scoreDisplay.textContent = 0
    resetButton.textContent = originalResetButton

}

/*----------------------------- Event Listeners -----------------------------*/

questionEls.forEach((question) => {
    question.addEventListener("click",handleQuestionClick)
})

submitAnswer.addEventListener("click",handleSubmit)

resetButton.addEventListener("click",init)

/*----------------------------- Code Graveyard -----------------------------*/


// Old Manual Category Name textContent Assignment Code

/*
const categoryOne = document.getElementById("category1")
    // console.dir(categoryOne) // returns element object
    const categoryOneTitle = questionDirectory.find((question) => { // finds the first instance of "category1"
        return question.categoryID === "category1"
    }) 
    // console.dir(categoryOneTitle) // returns the category1 object to pull category name from
    categoryOne.textContent = categoryOneTitle.categoryName
    
const categoryTwo = document.getElementById("category2")
    const categoryTwoTitle = questionDirectory.find((question) => { 
        return question.categoryID === "category2"
    })
    categoryTwo.textContent = categoryTwoTitle.categoryName

const categoryThree = document.getElementById("category3")
    const categoryThreeTitle = questionDirectory.find((question) => { 
        return question.categoryID === "category3"
    })
    categoryThree.textContent = categoryThreeTitle.categoryName
*/


// Attempted Daily Double Wager Functionality

/*
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


// Final Jeopardy Wager Psuedo Code

/*
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