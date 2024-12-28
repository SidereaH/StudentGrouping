import { updateToken } from './token'

export const GetAvaliableSpecialities = async () => {
	let accessToken = localStorage.getItem('accessToken')
	console.log('Fetching specialities...')
	const response = await fetch('http://localhost:8081/api/get/specialities', {
		method: 'GET',
		headers: {
			authorization: `${accessToken}`,
		},
	})
	if (response.status === 401) {
		accessToken = updateToken()
		console.log('Token updated, retrying...')
		return GetAvaliableSpecialities()
	}
	const data = await response.json()
	console.log('Specialities fetched:', data)
	return data
}
