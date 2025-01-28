export const workPlacesMapper = (data: string[]) => {
	return data.map(item => ({ label: item, value: item }))
}
