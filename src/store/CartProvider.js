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
		const updatedItems = state.items.concat(action.item);
		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.totalAmount;
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
	if (action.type === 'REMOVE') {
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
	const removeItemFromCartHandler = (itemId) => {
		dispatchCartAction({ type: 'REMOVE', itemId: itemId });
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
