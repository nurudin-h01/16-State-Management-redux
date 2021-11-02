import Item1 from '../images/avocado.jpg'
import Item2 from '../images/carrot.jpg'
import Item3 from '../images/corn.jpg'
import Item4 from '../images/garlic.jpg'
import Item5 from '../images/red-chili.jpg'
import Item6 from '../images/tomato.jpg'

import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, ADD_SHIPPING, SUB_SHIPPING } from '../actions/action-types/cartActions'



const initState = {
  items: [
    { id: 1, title: 'Avocado', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 110, img: Item1 },
    { id: 2, title: 'Carrot', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 80, img: Item2 },
    { id: 3, title: 'Corn', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 120, img: Item3 },
    { id: 4, title: 'Garlic', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 260, img: Item4 },
    { id: 5, title: 'Red Chili', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 160, img: Item5 },
    { id: 6, title: 'Tomato', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 90, img: Item6 }
  ],
  addedItems: [],
  total: 0

}
const cartReducer = (state = initState, action) => {

  //INSIDE HOME COMPONENT
  if (action.type === ADD_TO_CART) {
    let add = state.items.find(item => item.id === action.payload)
    let exist = state.addedItems.find(item => action.payload === item.id)
    if (exist) {
      add.quantity += 1
      return {
        ...state,
        total: state.total + add.price
      }
    }
    else {
      add.quantity = 1;
      return {
        ...state,
        addedItems: [...state.addedItems, add],
        total: state.total + add.price
      }
    }
  }
  if (action.type === REMOVE_ITEM) {
    let remove = state.addedItems.find(item => action.payload === item.id)
    let new_items = state.addedItems.filter(item => action.payload !== item.id)
    return {
      ...state,
      addedItems: new_items,
      total: state.total - (remove.price * remove.quantity)
    }
  }
  //INSIDE CART COMPONENT
  if (action.type === ADD_QUANTITY) {
    let add_Quantity = state.items.find(item => item.id === action.payload)
    add_Quantity.quantity += 1
    return {
      ...state,
      total: state.total + add_Quantity.price
    }
  }
  if (action.type === SUB_QUANTITY) {
    let addedItem = state.items.find(item => item.id === action.payload)
    if (addedItem.quantity === 1) {
      let new_items = state.addedItems.filter(item => item.id !== action.payload)
      return {
        ...state,
        addedItems: new_items,
        total: state.total - addedItem.price
      }
    }
    else {
      addedItem.quantity -= 1
      return {
        ...state,
        total: state.total - addedItem.price
      }
    }
  }

  if (action.type === ADD_SHIPPING) {
    return {
      ...state,
      total : state.total + 6
    }

   
  }

  if (action.type === SUB_SHIPPING) {
    return {
      ...state,
      total : state.total - 6
    }
    
  }

  else {
    return state
  }

}

export default cartReducer
