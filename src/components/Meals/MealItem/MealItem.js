//components
import MealItemForm from './MealItemForm';
//assets
import classes from './MealItem.module.css';

const MealItem = (props) => {
	const priceFinal = `$${props.price.toFixed(2)}`; //rendering with decimals

	return (
		<li className={classes.meal}>
			<div>
				<h3>{props.name}</h3>
				<div className={classes.description}>{props.description}</div>
				<div className={classes.price}>{priceFinal}</div>
			</div>
			<div>
				<MealItemForm id={props.id} />
			</div>
		</li>
	);
};

export default MealItem;
