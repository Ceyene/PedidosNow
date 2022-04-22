//assets
import classes from './MealsSummary.module.css';

const MealsSummary = () => {
	return (
		<section className={classes.summary}>
			<h2>Just order it, we cook</h2>
			<p>Hungry? Tired from work? We have something for you.</p>
			<p>
				See our wide variety of delicious food and choose your next meal. You
				just need to order it, we send it to your home.
			</p>
		</section>
	);
};

export default MealsSummary;
