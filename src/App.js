//dependencies
import { Fragment, useState } from 'react';
//components
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';

function App() {
	//managing cart state
	const [cartIsShown, setCartIsShown] = useState(false);
	//cart handlers
	const showCartHandler = () => {
		setCartIsShown(true);
	};
	const hideCartHandler = () => {
		setCartIsShown(false);
	};

	return (
		<Fragment>
			{cartIsShown && <Cart onCloseCart={hideCartHandler} />}
			<Header onShowCart={showCartHandler} />
			<main>
				<Meals />
			</main>
		</Fragment>
	);
}

export default App;
