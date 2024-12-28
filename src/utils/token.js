export const updateToken = async () => {
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
		return newToken
	} catch (err) {
		setError(err.message)
	}
}
