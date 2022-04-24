//dependencies
import { useEffect, useState } from 'react';
//components
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
//assets
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]); //meals state
	const [isLoading, setIsLoading] = useState(true); //loading state
	const [httpError, setHttpError] = useState(); //error state

	//fetching meals data when component is first rendered
	useEffect(() => {
		//not async function as useEffect callback, but as an internal function
		const fetchMeals = async () => {
			const response = await fetch(
				'https://react-practice-131ce-default-rtdb.firebaseio.com/meals.json'
			);

			//checking if there is an error before continue
			if (!response.ok) {
				throw new Error('Something went wrong...');
			}

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
			setIsLoading(false); //done loading
		};

		//executing and catching errors
		fetchMeals().catch((error) => {
			setIsLoading(false); //done loading
			setHttpError(error.message); //setting error state with our new error message
		});
	}, []);

	//checking if it's loading before rendering
	if (isLoading) {
		return (
			<section className={classes.MealsLoading}>
				<p>Loading...</p>
			</section>
		);
	}

	//checking if there is an error before rendering
	if (httpError) {
		return (
			<section className={classes.MealsError}>
				<p>{httpError}</p>
			</section>
		);
	}

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
