//assets
import classes from './MealItem.module.css';
//components

const MealItem = (props) => {
	const priceFinal = `$${props.price.toFixed(2)}`; //rendering with decimals

	return (
		<li className={classes.meal}>
			<div>
				<h3>{props.name}</h3>
				<div className={classes.description}>{props.description}</div>
				<div className={classes.price}>{priceFinal}</div>
			</div>
			<div></div>
		</li>
	);
};

export default MealItem;
