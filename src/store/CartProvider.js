//dependencies
import { useReducer } from 'react';
//components
import CartContext from './cart-context';

//initial cart state
const defaultCartState = {
	items: [],
	totalAmount: 0,
};

//cart reducer function (outside of component logic)
const cartReducer = (state, action) => {
	if (action.type === 'ADD') {
		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.amount;

		//checking if the item is already in the cart to add it to the amount and not as a separate item
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);
		const existingCartItem = state.items[existingCartItemIndex];
		let updatedItems;

		//updating existent item with new amount (or adding new item if not existent already)
		if (existingCartItem) {
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			};
			updatedItems = [...state.items]; //copying the existent object into a new one (not the same)
			updatedItems[existingCartItemIndex] = updatedItem; //overwriting the existing item with the updated item
		} else {
			updatedItems = state.items.concat(action.item);
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
	if (action.type === 'REMOVE') {
		//checking if the item is in the cart to be able of removing it
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.id
		);
		const existingItem = state.items[existingCartItemIndex];
		//updating total amount from the cart
		const updatedTotalAmount = state.totalAmount - existingItem.price;
		let updatedItems;
		//if the item to remove is just one in the cart, remove the entire item, if not, just decrease its amount
		if (existingItem.amount === 1) {
			updatedItems = state.items.filter((item) => item.id !== action.id);
		} else {
			const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
			updatedItems = [...state.items]; //copying the existent object into a new one (not the same)
			updatedItems[existingCartItemIndex] = updatedItem; //overwriting the existing item with the updated item
		}
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
	return defaultCartState;
};

const CartProvider = (props) => {
	//cart reducer
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);
	//context handlers
	const addItemToCartHandler = (item) => {
		dispatchCartAction({ type: 'ADD', item: item });
	};
	const removeItemFromCartHandler = (id) => {
		dispatchCartAction({ type: 'REMOVE', id: id });
	};
	//context
	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
