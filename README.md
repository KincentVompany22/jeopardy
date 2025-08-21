# It's Time to Play: Jeopardy!

![Jeopardy Game](/images/jeopardy-game.png)

## Description & Gameplay

This project is a browser-based recreation of the classic trivia game show ***Jeopardy!*** using the skills we have learned so far in the General Assembly Software Engineering Bootcamp. Players select questions from a board of categories (_as seen in the image above_), submit their answers via an input field, and have their score updated based on whether they are correct or incorrect. The game continues until all questions have been answered. The player wins or loses depending on whether their final score is positive or negative, respectively.

#### Notes on Gameplay

There are several features missing when compared to traditional Jeopardy! gameplay, if you are familiar with the show, that are elaborated on in the _Next Steps & Future Enhancements_ section below. These ommitted features include, _Daily Doubles_ and _Final Jeopardy_ among others.

>Given the nature of this game relies on user inputs in place of verbal answers, spelling, punctuation, and most importantly _phrasing_ are **extremely** important in ensuring responses are marked correctly.

#### Background Info

I chose to create a Jeopardy game because I love trivia and Jeopardy! has always been one of my favorite shows. I enjoy the challenge of quick thinking and testing knowledge across different categories. From the start of this project, I envisioned how the Jeopardy board and gameplay could be replicated using code, and I wanted to take on that challenge to bring my favorite trivia game into a digital format.

## External Resources / Attributions

This project was built without major external libraries or frameworks. I relied primarily on my own logic and coding skills learned in class thus far, as well as experimenting and problem-solving through trial and error. Reference checks were made to previous lecture and lab materials as well as standard documentation like MDN Web Docs for JavaScript, CSS, and HTML.

#### Use of AI

Throughout this project, I made slight use of generative AI sites, such as chatGPT, to help with the following:

- Simplify my psuedo code before starting the build.
- Provide further explanation of array iterator methods, such as find() and filter().
- Brainstorm fun trivia categories and example questions to include in the game.

## Technologies Used

- **JavaScript** – core game logic, event handling, and DOM manipulation.
- **HTML** – structure of the game board, display areas, and input elements.
- **CSS** – styling the game board and display areas.

## Next Steps & Planned Future Enhancements

- **Daily Double**: Add a question that allows players to wager any portion of their score when selected. 
- **Final Jeopardy**: Add the ability to place a wager and answer one final question if they end the game with a positive score.
- **Dynamic Categories**: Allow categories and questions to be randomly selected from a larger question bank, so the board is different each playthrough.
- **Multiplayer Support**: Enable multiple players to take turns answering questions, more closely mimicking the real Jeopardy! format.
- **Time Limit Feature**: Add an answer time limit when each question is clicked, more closely mimicking the real Jeopardy! format.v