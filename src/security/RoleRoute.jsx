import { useNavigate } from '@solidjs/router'
import { useUser } from '../contexts/UserContext'
import { createEffect } from 'solid-js'

const RoleRoute = props => {
	const { user } = useUser() // Получаем текущего пользователя
	const navigate = useNavigate()

	createEffect(() => {
		const currentUser = user()

		// Проверяем, авторизован ли пользователь и есть ли у него требуемая роль
		if (!currentUser || !props.roles.includes(currentUser.role)) {
			console.log('не получилось не фортануло', currentUser.user)
			navigate('/login', { replace: true }) // Перенаправляем на страницу входа
		}
	})

	// Показываем дочерние компоненты только если пользователь имеет правильную роль
	return user() && props.roles.includes(user().role) ? props.children : null
}

export default RoleRoute
