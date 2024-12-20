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
    }
    if (!response.ok) {
        throw new Error('Failed to fetch user info')
    }

    return response.json() // Возвращаем информацию о пользователе
}