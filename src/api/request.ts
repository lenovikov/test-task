export const api = async <T, K = undefined>(path: string, method: string = 'GET', body?: K): Promise<T> => {
	const baseUrl = 'https://dummyjson.com/' // Базовый URL
	const headers: HeadersInit = {
		'Content-Type': 'application/json' // Указываем тип содержимого
	}

	const config: RequestInit = {
		method,
		headers
	}

	// Добавляем тело запроса только для методов, которые его поддерживают
	if (method !== 'GET' && body) {
		config.body = JSON.stringify(body)
	}

	const response = await fetch(`${baseUrl}${path}`, config)

	if (!response.ok) {
		// Более информативная ошибка
		throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`)
	}

	const data: T = await response.json()
	return data
}
