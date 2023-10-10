import styles from './PopUp.module.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function PopUp(props) {
	const { sharelink } = props;
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered>
			<Modal.Header closeButton className="bg-dark">
				<Modal.Title id="contained-modal-title-vcenter">
					Share link to recive messages
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="bg-dark">
				<h4>Your link</h4>
				<p>{sharelink}</p>
			</Modal.Body>
			<Modal.Footer className="bg-dark">
				<Button className="btn btn-info" onClick={props.onHide}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default PopUp;
