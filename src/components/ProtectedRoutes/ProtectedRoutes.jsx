import { Navigate } from 'react-router-dom';
import styles from './ProtectedRoutes.module.css';
function ProtectedRoutes(props) {
	if (localStorage.getItem('userToken')) {
		return props.children;
	} else {
		return <Navigate to={'/login'} />;
	}
}

export default ProtectedRoutes;
