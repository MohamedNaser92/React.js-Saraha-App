import { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useContext } from 'react';
import { TokenContext } from '../../Context/token';

function Login() {
	const [isLoading, setIsLoading] = useState(false);
	const [apiErrors, setApiErrors] = useState('');
	let nvigate = useNavigate();
	let { setToken } = useContext(TokenContext);
	const validationSchema = Yup.object({
		email: Yup.string()
			.email('Invalid email address')
			.required('Email is required'),
		password: Yup.string()
			.required('Password is required')
			.matches(
				/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
				'Password should satart with capital letter and contain special charecter, small letter and numbers'
			),
	});

	function login(values) {
		setIsLoading(true);
		axios
			.post(`https://sara7aiti.onrender.com/api/v1/user/signin`, values)
			.then((data) => {
				// console.log(data);
				if (data.data.message === 'welcome') {
					setIsLoading(false);
					localStorage.setItem('userToken', data.data.token);
					setToken(data.data.token);

					nvigate('/profile');
				}
			})
			.catch((err) => {
				// console.log(err.response.data.error);
				setApiErrors(err.response.data.error);
				setIsLoading(false);
			});
	}

	let formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
			rePassword: '',
			age: 12,
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			login(values);
		},
	});

	return (
		<>
			<section
				className="vh-150 bg-image"
				style={{
					backgroundImage:
						'url("https://as1.ftcdn.net/v2/jpg/03/03/57/00/1000_F_303570054_NXBYGgQABt5HPUkRgi9SjQVgMbD7iymv.jpg")',
				}}>
				<div className="mask d-flex align-items-center h-100 gradient-custom-3  ">
					<div className="container h-100">
						<div className="row d-flex justify-content-center align-items-center h-100">
							<div className="col-12 col-md-9 col-lg-7 col-xl-6">
								<div
									className="card bg-dark text-bg-danger mt-5 mb-5"
									style={{ borderRadius: 15, backgroundColor: '' }}>
									<div className="card-body p-5">
										<h2 className="text-uppercase text-center mb-5">
											login
											<i className="far fa-edit user-icon ms-3" />
										</h2>

										<form onSubmit={formik.handleSubmit}>
											<div className="form-outline mb-4">
												<label className="form-label" htmlFor="email">
													Email
												</label>
												<input
													type="email"
													id="email"
													className="form-control form-control-lg mb-1"
													placeholder="Enter your email"
													name="email"
													value={formik.values.email}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
												/>
												{formik.errors.email && formik.touched.email ? (
													<span className="text-danger ms-3 fw-bold">
														{formik.errors.email}
													</span>
												) : (
													''
												)}
											</div>
											<div className="form-outline mb-4">
												<label className="form-label" htmlFor="password">
													Password
												</label>
												<input
													type="password"
													id="password"
													className="form-control form-control-lg mb-1"
													placeholder="Enter your password"
													name="password"
													value={formik.values.password}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
												/>
												{formik.errors.password && formik.touched.password ? (
													<div className="text-danger ms-3 fw-bold">
														{formik.errors.password}
													</div>
												) : (
													''
												)}
											</div>

											{apiErrors ? (
												<div className="text-danger m-3 fw-bold text-center">
													{apiErrors}
												</div>
											) : (
												''
											)}
											<div className="d-flex justify-content-center">
												<button
													type="submit"
													className={`btn btn-info btn-block btn-lg gradient-custom-4 text-body ${styles.butn}`}>
													{isLoading ? (
														<i className="fa fa-spin fa-spinner"></i>
													) : (
														<>
															<i className="far fa-edit"></i> Login
														</>
													)}
												</button>
											</div>
											<p className="text-center  mt-5 mb-0 text-white">
												Dont ave an account?
												<Link
													to={'/register'}
													className="fw-bold ms-3 text-white">
													<u>Register here</u>
												</Link>
											</p>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Login;
