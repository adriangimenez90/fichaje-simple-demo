export function currentTime() {
	const now = new Date();
	return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

export function currentTimeWithSeconds() {
	const now = new Date();
	return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
}

export function formatMinutes(minutes: number) {
	const hours = Math.floor(minutes / 60);
	const remainder = minutes % 60;
	return `${hours} h ${String(remainder).padStart(2, '0')} min`;
}

export function timeToMinutes(value: string) {
	const [hours, minutes] = value.split(':').map(Number);
	return hours * 60 + minutes;
}

export function addMinutesToTime(value: string, minutesToAdd: number) {
	const total = timeToMinutes(value) + minutesToAdd;
	const hours = Math.floor(total / 60) % 24;
	const minutes = total % 60;
	return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

export function formatSignedMinutes(minutes: number) {
	const sign = minutes > 0 ? '+' : minutes < 0 ? '-' : '';
	return `${sign}${formatMinutes(Math.abs(minutes))}`;
}
