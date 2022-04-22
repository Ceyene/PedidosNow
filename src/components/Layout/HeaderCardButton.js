//dependencies
import { useContext, useEffect, useState } from 'react';
//components
import CartContext from '../../store/cart-context';
//assets
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCardButton.module.css';

const HeaderCardButton = (props) => {
	//button css animation state
	const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
	//handling cart context
	const cartCtx = useContext(CartContext);
	const numberOfCartItems = cartCtx.items.reduce((currNumber, item) => {
		return currNumber + item.amount;
	}, 0);

	//destructuring items from cart context
	const { items } = cartCtx;

	//dynamic className for button css animation
	const btnClasses = `${classes.button} ${
		btnIsHighlighted ? classes.bump : ''
	}`;

	//useEffect: adding an animation each time an item is added to the cart
	useEffect(() => {
		//checking if the cart isn't empty
		if (cartCtx.items.length === 0) {
			return;
		}
		setBtnIsHighlighted(true);

		//resetting the effect after duration of the animation
		const timer = setTimeout(() => {
			setBtnIsHighlighted(false);
		}, 300);

		//adding it as a cleanup function
		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	return (
		<button className={btnClasses} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCardButton;
