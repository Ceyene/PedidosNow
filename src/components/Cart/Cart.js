//dependencies
import { useContext, useState } from 'react';
//components
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
//assets
import classes from './Cart.module.css';

const Cart = (props) => {
	//checkout form state
	const [isCheckout, setIsCheckout] = useState(false);

	//using cart context
	const cartCtx = useContext(CartContext);

	//dynamic cart total amount
	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

	//checking if cart isn't empty
	const hasItems = cartCtx.items.length > 0;

	//cart item handlers
	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};
	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};
	//checkout form handler
	const orderHandler = () => {
		setIsCheckout(true);
	};

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

	const modalActions = (
		<div className={classes.actions}>
			<button className={classes['button-alt']} onClick={props.onCloseCart}>
				Close
			</button>
			{hasItems && (
				<button className={classes.button} onClick={orderHandler}>
					Order
				</button>
			)}
		</div>
	);

	return (
		<Modal onCloseCart={props.onCloseCart}>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckout && <Checkout onCancel={props.onCloseCart} />}
			{!isCheckout && modalActions}
		</Modal>
	);
};

export default Cart;
