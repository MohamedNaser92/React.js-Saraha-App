import styles from './Profile.module.css';
import avatar from '../../img/avatar.png';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useQuery } from 'react-query';
import PopUp from '../PopUp/PopUp';
function Profile() {
	const [modalShow, setModalShow] = useState(false);
	const [allMessages, setAllMessages] = useState([]);
	const [userId, setUserID] = useState('');
	const [userName, setUserName] = useState('');
	const [sharelink, setSharelink] = useState('');

	const handleOpenModal = () => {
		const basrUrl = 'http://localhost:3000';
		const url = `${basrUrl}/message/${userId}`;
		setSharelink(url);

		setModalShow(true);
	};
	function getUserData() {
		let decoded = jwtDecode(localStorage.getItem('userToken'));
		setUserID(decoded.id);
		setUserName(decoded.name);
	}

	function getMessages() {
		return axios.get('https://sara7aiti.onrender.com/api/v1/message', {
			headers: { token: localStorage.getItem('userToken') },
		});
	}

	let query = useQuery('messages', getMessages);

	useEffect(() => {
		if (query.data) {
			setAllMessages(query.data.data?.allMessages);
		}

		getUserData();
	}, [query.data]);
	return (
		<>
			<div>
				<div className="container text-center py-5 my-5 text-center ">
					<div className="card pt-5 bg-body-secondary">
						<a data-toggle="modal" data-target="#profile">
							<img src={avatar} className="avatar " alt="avatar" />
						</a>
						<h3 className="py-2">{userName}</h3>

						<Link
							onClick={handleOpenModal}
							className="btn btn-default-outline share">
							<i className="fas fa-share-alt" /> Share Profile
						</Link>

						<PopUp
							show={modalShow}
							onHide={() => setModalShow(false)}
							sharelink={sharelink}
						/>
						{/* <Link
							data-toggle="modal"
							to={'/message'}
							className="btn btn-default-outline share ">
							<i className="fas fa-share-alt" /> Share Profile
						</Link> */}
					</div>
				</div>

				{/* =================messages=================== */}
				<div className="container text-center my-5 text-center ">
					<div className="row">
						{allMessages.length == 0 ? (
							<div className="col-md-12">
								<div className="card py-5 bg-body-secondary">
									<p>You don't have any messages... </p>
								</div>
							</div>
						) : (
							''
						)}
						{allMessages.map((ele) => (
							<div
								className="card py-5 bg-body-secondary  mb-5 t fs-2 text fw-bold"
								key={ele._id}>
								<p>{ele.messageContent}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default Profile;
