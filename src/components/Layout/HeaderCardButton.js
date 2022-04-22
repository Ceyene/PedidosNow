//dependencies
import { useContext } from 'react';
//components
import CartContext from '../../store/cart-context';
//assets
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCardButton.module.css';

const HeaderCardButton = (props) => {
	//handling cart context
	const cartCtx = useContext(CartContext);
	const numberOfCartItems = cartCtx.items.reduce((currNumber, item) => {
		return currNumber + item.amount;
	}, 0);

	return (
		<button className={classes.button} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCardButton;
