import { useNavigate } from '@solidjs/router'
import { useUser } from '../contexts/UserContext'
import { createEffect, Show } from 'solid-js'

const RoleRoute = props => {
	const { user, isLoading } = useUser()
	const navigate = useNavigate()

	createEffect(() => {
		if (!isLoading() && (!user() || !props.roles.includes(user().role))) {
			// Если загрузка завершена, но пользователь отсутствует или роль не подходит
			console.log('Доступ запрещён. Перенаправляем на /login')
			navigate('/login', { replace: true })
		}
	})

	return (
		<Show when={!isLoading() && user() && props.roles.includes(user().role)}>
			{props.children}
		</Show>
	)
}

export default RoleRoute
