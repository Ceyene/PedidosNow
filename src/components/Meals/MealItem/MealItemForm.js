//dependencies
import { useRef, useState } from 'react';
//components
import Input from '../../UI/Input';
//assets
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
	//amount validation state
	const [amountIsValid, setAmountIsValid] = useState(true);

	//creating input ref
	const amountInputRef = useRef();

	//form handler
	const submitHandler = (event) => {
		event.preventDefault();
		//accesing to the input ref -> value is always a string (even with inputs type='number')
		const enteredAmount = amountInputRef.current.value;
		const enteredAmountNumber = +enteredAmount; //converting the ref value to a number with the + operator
		//checking if amount number is valid
		if (
			enteredAmount.trim().length === 0 ||
			enteredAmountNumber < 1 ||
			enteredAmountNumber > 5
		) {
			setAmountIsValid(false);
			return;
		}
		//adding a cart item using the context handler method (here info about item to add isn't complete, so just calling it)
		props.onAddToCart(enteredAmountNumber);
	};

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<Input
				ref={amountInputRef}
				label="Amount"
				input={{
					id: 'amount_' + props.id,
					type: 'number',
					min: '1',
					max: '5',
					step: '1',
					defaultValue: '1',
				}}
			/>
			<button>+ Add</button>
			{!amountIsValid && <p>Please, enter a valid amount (1 - 5)</p>}
		</form>
	);
};

export default MealItemForm;
