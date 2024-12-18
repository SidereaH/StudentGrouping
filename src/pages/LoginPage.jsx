import { createSignal } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { useUser } from '../contexts/UserContext' // Импортируем контекст

import { validateEmail, validatePassword } from '../utils/validation'
import styles from './LoginPage.module.css'

// Функция для отправки запроса на авторизацию
const loginUser = async credentials => {
	const response = await fetch('http://localhost:8081/api/auth/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: credentials.email,
			password: credentials.password,
		}),
	})

	if (!response.ok) {
		throw new Error('Invalid credentials')
	}

	return response.json() // Возвращаем объект с токенами
}

// Функция для получения данных о пользователе с помощью accessToken
const getUserInfo = async (accessToken, email) => {
	const response = await fetch('http://localhost:8081/api/secured/user', {
		method: 'POST',
		headers: {
			authorization: `${accessToken}`,
		},
		body: JSON.stringify({
			user_email: `${email}`,
		}),
	})
	if (response.status == 401) {
		try {
			refreshToken = localStorage.getItem('refreshToken')
			const res = await fetch('http://localhost:8081/api/auth/token/refresh', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					refresh_token: `${refreshToken}`,
				}),
			})

			if (!res.ok) {
				throw new Error(`Error: ${res.status}`)
			}
			const { newRefreshToken, newToken } = await res.json()
			localStorage.setItem('refreshToken', newRefreshToken)
			localStorage.setItem('accessToken', newToken)
			return getUserInfo(newToken, email)
		} catch (err) {
			setError(err.message)
		}
	}
	if (!response.ok) {
		throw new Error('Failed to fetch user info')
	}

	return response.json() // Возвращаем информацию о пользователе
}

// Функция для обновления токена
// const refreshAccessToken = async refreshToken => {
// 	const response = await fetch(
// 		`http://localhost:8081/auth/refresh?refreshToken=${refreshToken}`,
// 		{
// 			method: 'POST',
// 			headers: {
// 				authorization: `${localStorage.getItem('accessToken')}`,
// 			},
// 		}
// 	)

// 	if (!response.ok) {
// 		throw new Error('Failed to refresh token')
// 	}

// 	return response.json() // Возвращаем новый accessToken
// }

const LoginPage = () => {
	const [credentials, setCredentials] = createSignal({
		email: '',
		password: '',
	})
	const [errors, setErrors] = createSignal({
		email: null,
		password: null,
	})
	const [touched, setTouched] = createSignal({
		email: false,
		password: false,
	})

	const navigate = useNavigate()
	const { setUser } = useUser() // Получаем функцию для установки пользователя

	// Валидация отдельного поля
	const validateField = (field, value) => {
		let error = null

		switch (field) {
			case 'email':
				error = validateEmail(value)
				break
			case 'password':
				error = validatePassword(value)
				break
		}

		setErrors(prev => ({ ...prev, [field]: error }))
		return error
	}

	const handleInput = (field, value) => {
		setCredentials(prev => ({ ...prev, [field]: value }))
		if (touched()[field]) {
			validateField(field, value)
		}
	}

	const handleBlur = field => {
		setTouched(prev => ({ ...prev, [field]: true }))
		validateField(field, credentials()[field])
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setErrors({
			email: null,
			password: null,
		})

		const emailError = validateField('email', credentials().email)
		const passwordError = validateField('password', credentials().password)

		if (emailError || passwordError) {
			return
		}

		try {
			// Отправка запроса на авторизацию
			const { accessToken, email, refreshToken } = await loginUser(
				credentials()
			)
			console.log('Login successful.', email, refreshToken, accessToken)

			// Сохраняем токены в localStorage
			localStorage.setItem('accessToken', accessToken)
			localStorage.setItem('refreshToken', refreshToken)
			localStorage.setItem('email', email)

			// Получаем информацию о пользователе
			const userInfo = await getUserInfo(accessToken, email)
			console.log('User info:', userInfo.user)

			// Устанавливаем информацию о пользователе в контексте
			setUser(userInfo.user)

			// Перенаправляем на страницу профиля
			navigate('/profile')
		} catch (err) {
			setErrors(prev => ({ ...prev, submit: err.message }))
		}
	}

	// Обработка обновления токена, если accessToken истек
	const handleTokenExpiration = async () => {
		const refreshToken = localStorage.getItem('refreshToken')
		if (!refreshToken) {
			console.log('No refresh token found')
			return
		}

		try {
			// Попытка обновить accessToken с использованием refreshToken
			const { accessToken, refreshToken: newRefreshToken } =
				await refreshAccessToken(refreshToken)
			// Сохраняем обновленные токены в localStorage
			localStorage.setItem('accessToken', accessToken)
			localStorage.setItem('refreshToken', newRefreshToken)
			console.log('Token refreshed successfully')
		} catch (err) {
			console.error('Failed to refresh token:', err)
		}
	}

	return (
		<div class={styles.loginContainer}>
			<div class={styles.loginBox}>
				<h1>Login</h1>
				<form onSubmit={handleSubmit}>
					{errors().submit && <div class={styles.error}>{errors().submit}</div>}
					<div class={styles.inputGroup}>
						<label for='email'>Email</label>
						<input
							id='email'
							type='email'
							value={credentials().email}
							onInput={e => handleInput('email', e.target.value)}
							onBlur={() => handleBlur('email')}
							classList={{
								[styles.inputError]: errors().email && touched().email,
							}}
							placeholder='SecondFM@rostov-don.ithub.ru'
						/>
						{errors().email && touched().email && (
							<div class={styles.errorMessage}>{errors().email}</div>
						)}
					</div>
					<div class={styles.inputGroup}>
						<label for='password'>Password</label>
						<input
							id='password'
							type='password'
							value={credentials().password}
							onInput={e => handleInput('password', e.target.value)}
							onBlur={() => handleBlur('password')}
							classList={{
								[styles.inputError]: errors().password && touched().password,
							}}
							placeholder='Enter your password'
						/>
						{errors().password && touched().password && (
							<div class={styles.errorMessage}>{errors().password}</div>
						)}
					</div>
					<button type='submit' disabled={errors().email || errors().password}>
						Login
					</button>
				</form>
			</div>
		</div>
	)
}

export default LoginPage
