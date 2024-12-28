import { A } from '@solidjs/router'
import styles from './App.module.css'
import { createSignal } from 'solid-js'
import Profile from './components/profile/Profile'
import UserModal from './components/modals/UserModal'
import { UserProvider } from './contexts/UserContext'

const App = () => {
	return (
		<div class={styles.App}>
			<h1>Welcome to the Student Grouping App</h1>

			<p>
				<A href='/login'>Login</A> or navigate to <A href='/form'>Form Page</A>{' '}
				to enter student data.
			</p>
		</div>
	)
}

export default App
