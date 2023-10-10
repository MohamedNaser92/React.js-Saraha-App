import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import axios from 'axios';

function Register() {
	const [isLoading, setIsLoading] = useState(false);
	const [apiErrors, setApiErrors] = useState('');
	let nvigate = useNavigate();
	//Validatin
	const validationSchema = Yup.object({
		name: Yup.string()
			.max(15, 'Name must be less than 15 charachters...')
			.min(3, 'Name must be more than 3 charachter...')
			.required('Name is  required'),
		email: Yup.string()
			.email('Invalid email address')
			.required('Email is required'),
		password: Yup.string()
			.required('Password is required')
			.matches(
				/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
				'Password should satart with capital letter and contain special charecter, small letter and numbers'
			),
		rePassword: Yup.string()
			.oneOf([Yup.ref('password')], "Passwords doesn't matches")
			.required('Required'),
		age: Yup.number()
			.min(12, 'You must be over 12')
			.integer()
			.required('Reaquired'),
	});

	// Register Function
	function register(values) {
		setIsLoading(true);
		axios
			.post(`https://sara7aiti.onrender.com/api/v1/user`, values)
			.then((data) => {
				// console.log(data);
				if (data.data.message === 'Added') {
					setIsLoading(false);
					nvigate('/login');
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
		validationSchema,
		onSubmit: (values) => {
			register(values);
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
											register
											<i className="far fa-edit user-icon ms-3" />
										</h2>

										<form onSubmit={formik.handleSubmit}>
											<div className="form-outline mb-4">
												<label className="form-label " htmlFor="username">
													Username
												</label>

												<input
													type="text"
													id="username"
													className="form-control form-control-lg mb-1"
													placeholder="Enter your name"
													name="name"
													value={formik.values.name}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
												/>

												{formik.errors.name && formik.touched.name ? (
													<span className="text-danger ms-3 fw-bold">
														{formik.errors.name}
													</span>
												) : (
													''
												)}
											</div>
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
											<div className="form-outline mb-4">
												<label className="form-label" htmlFor="rePassword">
													Repeate password
												</label>
												<input
													type="password"
													id="rePassword"
													className="form-control form-control-lg mb-1"
													placeholder="Repeate your password"
													name="rePassword"
													value={formik.values.rePassword}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
												/>
												{formik.errors.rePassword &&
												formik.touched.rePassword ? (
													<span className="text-danger ms-3 fw-bold">
														{formik.errors.rePassword}
													</span>
												) : (
													''
												)}
											</div>
											<div className="form-outline mb-4">
												<label className="form-label" htmlFor="age">
													Age
												</label>
												<input
													type="number"
													id="age"
													className="form-control form-control-lg mb-1"
													placeholder="Enter your age"
													name="age"
													value={formik.values.age}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
												/>
												{formik.errors.age && formik.touched.age ? (
													<span className="text-danger ms-3 fw-bold">
														{formik.errors.age}
													</span>
												) : (
													''
												)}
											</div>
											<div className="form-check d-flex justify-content-center mb-5">
												<input
													className="form-check-input me-2"
													type="checkbox"
													defaultValue
													id="form2Example3cg"
												/>

												<label
													className="form-check-label "
													htmlFor="form2Example3g">
													I agree all statements in
													<a href="#!" className="text-white ms-2">
														<u>Terms of service</u>
													</a>
												</label>
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
															<i className="far fa-edit"></i> Register
														</>
													)}
												</button>
											</div>
											<p className="text-center  mt-5 mb-0 text-white">
												Have already an account?
												<Link to={'/login'} className="fw-bold ms-3 text-white">
													<u>Login here</u>
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

export default Register;
