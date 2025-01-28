import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { App } from './App.tsx'
import './index.css'

import { routes } from './shared/lib/routes.tsx'

import { Provider } from 'react-redux'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App>
					<Routes>
						{routes.map(({ route, component }) => (
							<Route key={route} path={route} element={component} />
						))}
					</Routes>
				</App>
			</BrowserRouter>
		</Provider>
	</StrictMode>
)
