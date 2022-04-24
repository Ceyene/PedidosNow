//dependencies
import React, { useContext, useState } from 'react';
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
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
	const [orderError, setOrderError] = useState(); //error state

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
	//submitting order handler
	const submitOrderHandler = async (userData) => {
		try {
			setIsSubmitting(true); //sending order state -> user experience
			//sending req to the backend with user and cart data
			const response = await fetch(
				'https://react-practice-131ce-default-rtdb.firebaseio.com/orders.json',
				{
					method: 'POST',
					body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
				}
			);
			//checking if there is an error before continue
			if (!response.ok) {
				throw new Error(
					'Something went wrong with the order. Please, try again...'
				);
			}
			setIsSubmitting(false); //done submitting
			setDidSubmit(true); //confirmed order
		} catch (error) {
			setIsSubmitting(false); //done submitting
			setOrderError(error.message); //setting error message
		}
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

	const cartModalContent = (
		<React.Fragment>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckout && (
				<Checkout onConfirm={submitOrderHandler} onCancel={props.onCloseCart} />
			)}
			{!isCheckout && modalActions}
		</React.Fragment>
	);

	//messages for different stages of the order -> user experience
	const isSubmittingModalContent = <p>Sending order data...</p>;
	const didSubmitModalContent = (
		<React.Fragment>
			<p>Successfully sent the order!</p>
			<button type="button" onClick={props.onCloseCart}>
				Close
			</button>
		</React.Fragment>
	);
	const orderErrorModalContent = (
		<React.Fragment>
			<p>{orderError}</p>
			<button type="button" onClick={props.onCloseCart}>
				Close
			</button>
		</React.Fragment>
	);

	return (
		<Modal onCloseCart={props.onCloseCart}>
			{!isSubmitting && !didSubmit && !orderError && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
			{didSubmit && didSubmitModalContent}
			{orderError && orderErrorModalContent}
		</Modal>
	);
};

export default Cart;
