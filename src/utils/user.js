// Функция для получения данных о пользователе с помощью accessToken
export const getUserInfo = async (accessToken, email) => {
	const response = await fetch('http://localhost:8081/api/secured/user', {
		method: 'POST',
		headers: {
			authorization: `${accessToken}`,
		},
		body: JSON.stringify({
			user_email: `${email}`,
		}),
	})
	if (response.status === 401) {
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
	} else if (!response.ok) {
		throw new Error('Failed to fetch user info')
	}

	return response.json() // Возвращаем информацию о пользователе
}
export const distributeUser = async (
	accessToken,
	refreshToken,
	email,
	firstSpec,
	secondSpec
) => {
	try {
		const response = await fetch('http://localhost:8081/api/distribute', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: accessToken, // жвт токен
			},
			body: JSON.stringify({
				user_mail: email,
				first_priority: firstSpec,
				second_priority: secondSpec,
			}),
		})
		if (!response.ok) {
			if (response.status === 401) {
				try {
					refreshToken = localStorage.getItem('refreshToken')
					const res = await fetch(
						'http://localhost:8081/api/auth/token/refresh',
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								refresh_token: `${refreshToken}`,
							}),
						}
					)

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
			} else if (!response.ok) {
				throw new Error('Failed to fetch user info')
			}
		}

		const data = await response.json()
		return data
	} catch (error) {
		console.error('Ошибка при отправке данных:', error)
		throw error
	}
}
