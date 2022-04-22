//dependencies
import { Fragment } from 'react';
import ReactDOM from 'react-dom';
//assets
import classes from './Modal.module.css';

//backdrop component
const Backdrop = (props) => {
	return <div className={classes.backdrop}></div>;
};

//modal overlay component
const ModalOverlay = (props) => {
	return (
		<div className={classes.modal}>
			<div className={classes.content}>{props.children}</div>
		</div>
	);
};

const portalElement = document.getElementById('overlays');

//modal component
const Modal = (props) => {
	return (
		<Fragment>
			{ReactDOM.createPortal(<Backdrop />, portalElement)}
			{ReactDOM.createPortal(
				<ModalOverlay>{props.children}</ModalOverlay>,
				portalElement
			)}
		</Fragment>
	);
};

export default Modal;
