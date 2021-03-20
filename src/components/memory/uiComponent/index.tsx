// Algorithm -
// the player will start the game 
// he/she will click on a card 
// once clicked the it will get checked with the last card(which initially is none)
//if the two cards matches, both the cards will remain open
//othervise the older card will be closed
//the process will repeate it we see all the cards open
//when all the cards are opened 
//the user will got the game
//a message box will come
//indicating "congrats, you won" 
//the player can play the game again 
//by clicking on the restart game button



// we will use useReducer, useEffect and useState to save the state 
//Hooks (such as a useReducer hook) are a recent addition to React that enable
//more of your components to be written as functions by providing less complex 
//alternatives to class features. One significant advantage is that typing function
//components in TypeScript is simpler and more direct.



import React, { useReducer, useEffect, useState } from 'react';

import { Flip } from 'react-awesome-reveal';
import ModalComponent from '../resultModal';
import { Images } from '../Images';
import { DefaultImg } from '../Images';
import '../uiComponent/ui.css';

// there are two actions 
// 1. when we click the card
// when we restart
type Actions =
  | { type: 'CARD_CLICKED', index: number }
  | { type: 'RESTART' }

//cardtype is a interface use to store 
//details about the card
interface CardTypes {
  id: number,
  imgUrl?: string,
  open?: boolean,
}

// IState stores the details of the current state
interface IState {
  mCards: CardTypes[],
  clickedCardId: Array<any>,
  clickedCardCount: number;
  resultStatus?: boolean
}

//This is to randomly suffle the cards is the  screen
const shuffleCards = () => {
  let updatedCards = [];
  for (var i = 0; i < 12; i++) {
    updatedCards.push({
      imgUrl: Images[Math.floor(i / 2)],
      id: i,
      open: false
    })
  }
  updatedCards.sort(() => Math.random() - 0.5);
  return updatedCards;
}

//for initial state
const initialState: IState = { mCards: shuffleCards(), clickedCardCount: 0, clickedCardId: [],resultStatus:false };

//to check if we won the match
const checkResult = (cards: Array<CardTypes>) => {
  let value = true;
  cards.map(eachCard => {
    if (eachCard.open === false) {
      value = false;
    }
    return 1;
  })
  if (value) {
    return value
  }

}

// reducer function to change the state
// if the last card clicked matched the current card we'll set them both open
//else keep close the last one
const reducer: React.Reducer<IState, Actions> = (state, action) => {
  switch (action.type) {
    
    case 'CARD_CLICKED':
      let value = [...state.mCards];
      value[action.index].open = true;

      let updatedClickedId = [...state.clickedCardId];
      if (updatedClickedId.length === 2) {
        if (value[updatedClickedId[0]].imgUrl !== value[updatedClickedId[1]].imgUrl) {
          value[updatedClickedId[0]].open = false;
          value[updatedClickedId[1]].open = false;
        }
        updatedClickedId.splice(0, 2);
      }
      let result = checkResult([...state.mCards]);


      updatedClickedId.push(action.index);

      return { ...state, mCards: value, clickedCardId: updatedClickedId, clickedCardCount: state.clickedCardCount + 1,resultStatus: result };

      case 'RESTART':
        return { mCards: shuffleCards(), clickedCardCount: 0, clickedCardId: [],resultStatus:false };
       
    default:
      throw new Error();
  }
}

const Uirender: React.FC = () => {
  const [state, dispatch] = useReducer<React.Reducer<IState, Actions>>(reducer, initialState);
  const [isResultOpen ,setIsResultOpen] = useState<boolean>(false);

  useEffect(() => {
    if(state.resultStatus){
      setIsResultOpen(true);
    }
  }, [state.resultStatus])

  const handleClick = (id: number, isOpen: boolean) => {
    if (!isOpen)
      dispatch({ type: 'CARD_CLICKED', index: id })
  }

  const handleModalClose = () => {
   setIsResultOpen(false);
  }

  const handleRestart = () => {
    dispatch({type:'RESTART'})
    handleModalClose();
  }

  return (


    <div className="container">
      {state.mCards && state.mCards.map((eachCard, i) =>
        <Flip key={eachCard.id}>
          <div>
            <figure className="figure-block">
              <img className="img-block"
                src={eachCard.open ? eachCard.imgUrl : DefaultImg}
                alt="Memory"
                onClick={() => handleClick(i, eachCard.open || false)} />
            </figure>
          </div>
        </Flip>
      )}
// when player won 
      {state.resultStatus &&
       <ModalComponent
        isModalOpen = { isResultOpen }
        title = { 'Result' }
        onClose = { handleModalClose }
        renderItems = {
          <>
           <h3> Congrats , You Won !</h3>
           <button onClick = { handleRestart } className='button-class'>Restart</button>
          </>
        }
        />
      }
    </div>
  );
}
export default Uirender;


