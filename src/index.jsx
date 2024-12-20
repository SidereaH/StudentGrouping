import './index.css'
import { Router, Route } from '@solidjs/router'
import { render } from 'solid-js/web'
import App from './App'
import FormPage from './pages/FormPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import { UserProvider, useUser } from './contexts/UserContext'
import RoleRoute from './security/RoleRoute'
import { createEffect, Show } from 'solid-js'

const AppRouter = () => {
	const { isLoading } = useUser()

	// Пока пользователь не загрузился, показываем индикатор загрузки
	return (
		<Show
			when={!isLoading()}
			fallback={<p>Loading...</p>} // Индикатор загрузки
		>
			<Router>
				{/* Публичный маршрут */}
				<Route path='/login' component={LoginPage} />

				{/* Защищённый маршрут: доступен всем авторизованным */}
				<Route
					path='/profile'
					component={() => (
						<RoleRoute roles={['ROLE_USER', 'ROLE_ADMIN']}>
							<ProfilePage />
						</RoleRoute>
					)}
				/>

				{/* Защищённый маршрут: доступен только админам */}
				<Route
					path='/form'
					component={() => (
						<RoleRoute roles={['ROLE_ADMIN']}>
							<FormPage />
						</RoleRoute>
					)}
				/>

				{/* Главная страница */}
				<Route path='/' component={App} />
			</Router>
		</Show>
	)
}

const root = document.getElementById('root')

render(
	() => (
		<UserProvider>
			<AppRouter />
		</UserProvider>
	),
	root
)
