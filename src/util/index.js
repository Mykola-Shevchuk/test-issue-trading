export const rangeHours = (from, to) =>
	new Date().getHours() >= new Date(from).getHours() &&
	new Date().getHours() <= new Date(to).getHours();