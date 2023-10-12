import styles from './SendMessage.module.css';
import avatar from '../../img/avatar.png';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../Redux/messagesSlice';
function SendMessage() {
	let id = useParams();

	//
	// async function addMessage(values) {
	// 	let data = { ...values, receivedId: id.id };
	// 	let res = await axios.post(
	// 		'https://sara7aiti.onrender.com/api/v1/message',
	// 		data
	// 	);
	// }
	//   let formik = useFormik({
	// 	initialValues: { messageContent: '' },
	// 	onSubmit: (values) => {
	// 		addMessage(values);
	// 	},
	// });

	//TODO using Redux
	const dispatch = useDispatch();
	const sendingStatus = useSelector((state) => state.messages);

	const formik = useFormik({
		initialValues: { messageContent: '' },
		onSubmit: (values) => {
			if (sendingStatus !== 'pending') {
				dispatch(
					sendMessage({
						messageContent: values.messageContent,
						receivedId: id.id,
					})
				);
			}
		},
	});

	return (
		<>
			<div>
				<div className="container text-center py-5 my-5 text-center">
					<div className="card py-5 mb-5">
						<a href="" data-toggle="modal" data-target="#profile">
							<img src={avatar} className="avatar " alt="avatar" />
						</a>

						<div className="container w-50 m-auto mt-2">
							<form onSubmit={formik.handleSubmit}>
								<textarea
									className="form-control"
									name="messageContent"
									value={formik.values.messageContent}
									id="messageContent"
									onChange={formik.handleChange}
									cols={10}
									rows={9}
									placeholder="You cannot send a Sarahah to yourself, share your profile with your friends :)"
								/>
								<button type="submit" className="btn btn-outline-info mt-3">
									<i className="far fa-paper-plane" /> Send
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default SendMessage;
