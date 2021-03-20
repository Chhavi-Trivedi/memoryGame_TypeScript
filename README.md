

## Memory Game Using TypeScript and React
To run the app -

In the project directory, you can run:
### `npm install`
### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### Things done

A React TS application that is used to play the memory game with the help of useReducer 

### Algorithm -

1. The player will start the game 
2. he/she will click on a card 
3. once clicked the it will get checked with the last card(which initially is none)
4. if the two cards matches, both the cards will remain open othervise the older card will be closed
5. the process will repeate it we see all the cards open
6. when all the cards are opened 
7. the user will get a message box indicating "congrats, you won" 
8. the player can play the game again by clicking on the restart game button



I have use useReducer, useEffect and useState to save the states. 
These are called Hooks (such as a useReducer hook) they store the recent addition to React that enable
more of your components to be written as functions by providing less complex 
alternatives to class features. One significant advantage is that typing function
components in TypeScript is simpler and more direct.

### Screens

#### INITIAL-

![Initial Screen](https://github.com/Chhavi-Trivedi/memoryGame_TypeScript/blob/main/src/components/memory/Images/initial.png?raw=true)
#### MID-
![Mid Screen](https://github.com/Chhavi-Trivedi/memoryGame_TypeScript/blob/main/src/components/memory/Images/mid.png?raw=true)
#### RESULTS-
![Result Screen](https://github.com/Chhavi-Trivedi/memoryGame_TypeScript/blob/main/src/components/memory/Images/result.png?raw=true)
