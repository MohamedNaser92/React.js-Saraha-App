import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Notfound from './components/Notfound/Notfound';
import SendMessage from './components/SendMessage/SendMessage';
import './App.css';
import { useContext, useEffect } from 'react';
import { TokenContext } from './Context/token';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
	const queryClient = new QueryClient();

	let { setToken } = useContext(TokenContext);

	useEffect(() => {
		if (localStorage.getItem('userToken')) {
			setToken(localStorage.getItem('userToken'));
		}
	}, []);

	const routes = createBrowserRouter([
		{
			path: '',
			element: <Layout />,
			children: [
				{ path: 'register', element: <Register /> },
				{ path: 'login', element: <Login /> },
				{
					path: 'profile',
					element: (
						<ProtectedRoutes>
							<Profile />
						</ProtectedRoutes>
					),
				},
				{
					path: 'message/:id',
					element: <SendMessage />,
				},

				{ path: '*', element: <Notfound /> },
			],
		},
	]);
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={routes}></RouterProvider>
		</QueryClientProvider>
	);
}

export default App;
