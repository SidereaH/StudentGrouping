import { createContext, createSignal, useContext, onMount } from 'solid-js'

const UserContext = createContext()

export const UserProvider = props => {
	const [user, setUser] = createSignal(null)

	const [isLoading, setIsLoading] = createSignal(true)
	// Загружаем пользователя из localStorage при загрузке приложения
	onMount(() => {
		const storedUser = localStorage.getItem('user')
		if (storedUser) {
			console.log(storedUser, 'сохранилбиля')
			setUser(JSON.parse(storedUser))
		}
		setIsLoading(false)
	})

	// Обновляем localStorage при изменении пользователя
	const updateUser = newUser => {
		setUser(newUser)
		if (newUser) {
			localStorage.setItem('user', JSON.stringify(newUser))
			localStorage.setItem('email', JSON.stringify(newUser.email))
		} else {
			localStorage.removeItem('user')
		}
	}

	return (
		<UserContext.Provider value={{ user, setUser: updateUser, isLoading }}>
			{props.children}
		</UserContext.Provider>
	)
}

export const useUser = () => {
	return useContext(UserContext)
}
