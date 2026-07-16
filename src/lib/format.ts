export function formatDate(date: string) {
	return new Date(`${date}T12:00:00`).toLocaleDateString('es-ES', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});
}

export function formatDayHeader(date: string) {
	return new Date(`${date}T12:00:00`).toLocaleDateString('es-ES', {
		day: '2-digit',
		month: '2-digit',
	});
}

export function weekdayShort(date: string) {
	return new Date(`${date}T12:00:00`).toLocaleDateString('es-ES', {
		weekday: 'short',
	});
}

export function formatDateTime(value: string) {
	return new Date(value).toLocaleString('es-ES', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
}

export function statusClass(status: string) {
	return status
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/\s+/g, '-');
}

export function escapeHtml(value: string) {
	return value.replace(/[&<>"']/g, (character) => {
		const entities: Record<string, string> = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#39;',
		};
		return entities[character] || character;
	});
}
