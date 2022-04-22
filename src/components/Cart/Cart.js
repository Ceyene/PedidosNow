//dependencies
import { useContext } from 'react';
//components
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
//assets
import classes from './Cart.module.css';

const Cart = (props) => {
	//using cart context
	const cartCtx = useContext(CartContext);

	//dynamic cart total amount
	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

	//checking if cart isn't empty
	const hasItems = cartCtx.items.length > 0;

	//cart item handlers
	const cartItemRemoveHandler = (id) => {};
	const cartItemAddHandler = (item) => {};

	const cartItems = (
		<ul className={classes['cart-items']}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	return (
		<Modal onCloseCart={props.onCloseCart}>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={classes.actions}>
				<button className={classes['button-alt']} onClick={props.onCloseCart}>
					Close
				</button>
				{hasItems && <button className={classes.button}>Order</button>}
			</div>
		</Modal>
	);
};

export default Cart;
