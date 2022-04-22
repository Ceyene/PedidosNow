//components
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
//assets
import classes from './AvailableMeals.module.css';

const DUMMY_MEALS = [
	{
		id: 'm1',
		name: 'Sushi',
		description: 'Finest fish and veggies',
		price: 22.99,
	},
	{
		id: 'm2',
		name: 'Empanadas criollas',
		description: 'An argentinian specialty!',
		price: 16.5,
	},
	{
		id: 'm3',
		name: 'Barbecue Burger',
		description: 'The biggest, raw, meaty',
		price: 12.99,
	},
	{
		id: 'm4',
		name: 'Veggie Bowl',
		description: 'Healthy and green',
		price: 18.99,
	},
];

const AvailableMeals = () => {
	const mealsList = DUMMY_MEALS.map((meal) => (
		<MealItem
			id={meal.id}
			key={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
