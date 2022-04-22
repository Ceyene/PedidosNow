//dependencies
import CartContext from './cart-context';

const CartProvider = (props) => {
	//context handlers
	const addItemToCartHandler = (item) => {};
	const removeItemFromCartHandler = (itemId) => {};
	//context
	const cartContext = {
		items: [],
		totalAmount: 0,
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
