import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useContext } from 'react';
// import { CounterContext } from '../../Context/counter';
import { TokenContext } from '../../Context/token';
function Navbar() {
	// let { counter } = useContext(CounterContext);
	let { token, setToken } = useContext(TokenContext);
	let navigate = useNavigate();
	function logout() {
		localStorage.removeItem('userToken');
		setToken(null);
		navigate('/login');
	}
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container">
					<Link className="navbar-brand" aria-current="page" to={''}>
						Sar
						<i
							className="fa-regular fa-spin fa-envelope fa-xl "
							style={{ color: '#fafafa', margin: '4px' }}
						/>
						aha
					</Link>

					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
							{/* <li className="nav-item">
								<Link className="nav-link active" aria-current="page" to={''}>
									Home
								</Link>
							</li> */}
							{token ? (
								<>
									<li className="nav-item">
										<Link
											className="nav-link active"
											aria-current="page"
											to={'profile'}>
											Profile
											{/* <span
										className={`text-white position-relative ${styles.counter}`}>
										{counter}
									</span> */}
										</Link>
									</li>
									<li className="nav-item">
										<button className="nav-link active" onClick={logout}>
											Logout
											{/* <span
										className={`text-white position-relative ${styles.counter}`}>
										{counter}
									</span> */}
										</button>
									</li>
								</>
							) : (
								<>
									<li className="nav-item">
										<Link
											className="nav-link active"
											aria-current="page"
											to={'register'}>
											Register
										</Link>
									</li>
									<li className="nav-item">
										<Link
											className="nav-link active"
											aria-current="page"
											to={'login'}>
											Login
										</Link>
									</li>
								</>
							)}
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
