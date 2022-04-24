//dependencies
import { useEffect, useState } from 'react';
//components
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
//assets
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
	//meals state
	const [meals, setMeals] = useState([]);

	//fetching meals data when component is first rendered
	useEffect(() => {
		//not async function as useEffect callback, but as an internal function
		const fetchMeals = async () => {
			const response = await fetch(
				'https://react-practice-131ce-default-rtdb.firebaseio.com/meals.json'
			);
			const responseData = await response.json(); //firebase will return an object, we need an array
			const loadedMeals = [];
			for (const key in responseData) {
				loadedMeals.push({
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price,
				});
			}
			setMeals(loadedMeals); //saving obtained array to our meals state
		};
		//executing function
		fetchMeals();
	}, []);

	const mealsList = meals.map((meal) => (
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
