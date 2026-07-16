import { todayIso } from '../lib/date';
import { currentTime, timeToMinutes } from '../lib/time';
import type { EntryStatus, TimeBreak, TimeEntry } from '../lib/types';

export function activeBreak(entry?: TimeEntry) {
	return entry?.breaks.find((item) => item.start && !item.end);
}

export function formatBreaks(entry?: TimeEntry) {
	if (!entry?.breaks.length) return 'Sin descansos';
	return entry.breaks
		.map((item) => `${breakLabel(item)} ${item.start}-${item.end || 'abierta'}`)
		.join(', ');
}

export function breakLabel(item: TimeBreak) {
	if (item.label) return item.label;
	if (item.kind === 'meal') return 'Comida';
	if (item.kind === 'quick') return 'Pausa rápida';
	return 'Descanso manual';
}

export function workedMinutes(entry?: TimeEntry) {
	if (!entry?.start) return 0;

	let end = entry.end;
	if (!end && entry.date === todayIso()) end = activeBreak(entry)?.start || currentTime();
	if (!end) return 0;

	let total = elapsedMinutes(entry.start, end);
	entry.breaks.forEach((pause) => {
		if (!pause.end) return;
		total -= elapsedMinutes(pause.start, pause.end);
	});
	return Math.max(total, 0);
}

export function breakMinutes(entry?: TimeEntry) {
	if (!entry?.breaks.length) return 0;
	return entry.breaks.reduce((sum, pause) => {
		const end = pause.end || (entry.date === todayIso() ? currentTime() : pause.start);
		return sum + elapsedMinutes(pause.start, end);
	}, 0);
}

export function elapsedMinutes(start: string, end: string) {
	const startMinutes = timeToMinutes(start);
	let endMinutes = timeToMinutes(end);
	if (endMinutes < startMinutes) endMinutes += 24 * 60;
	return Math.max(endMinutes - startMinutes, 0);
}

export function validateManualTimeAdjustment(
	start: string,
	end: string,
	breaks: TimeBreak[],
	endNextDay: boolean,
	openBreakIndex: number,
) {
	if (!start) return 'Indica una hora de entrada para guardar el ajuste.';
	if (!isTimeValue(start)) return 'La hora de entrada no tiene un formato válido.';
	if (end && !isTimeValue(end)) return 'La hora de salida no tiene un formato válido.';

	const startMinutes = timeToMinutes(start);
	const endMinutes = end ? relativeWorkdayMinutes(end, start, endNextDay) : undefined;

	if (end && !endNextDay && timeToMinutes(end) < startMinutes) {
		return 'La salida no debería ser anterior a la entrada. Si fue al día siguiente, marca la opción correspondiente.';
	}

	for (let index = 0; index < breaks.length; index += 1) {
		const item = breaks[index];
		const label = `Pausa ${index + 1}`;

		if (!item.start) return `${label}: indica una hora de inicio.`;
		if (!isTimeValue(item.start)) return `${label}: el inicio no tiene un formato válido.`;
		if (item.end && !isTimeValue(item.end)) return `${label}: el fin no tiene un formato válido.`;

		const pauseStart = relativeWorkdayMinutes(item.start, start, endNextDay);
		const pauseEnd = item.end ? relativeWorkdayMinutes(item.end, start, endNextDay) : undefined;

		if (pauseStart < startMinutes) return `${label}: la pausa no debería empezar antes de la entrada.`;
		if (pauseEnd !== undefined && pauseEnd < pauseStart) return `${label}: el fin de pausa no debería ser anterior al inicio.`;
		if (endMinutes !== undefined && pauseStart > endMinutes) return `${label}: la pausa no debería empezar después de la salida.`;
		if (endMinutes !== undefined && pauseEnd === undefined) return `${label}: completa el fin de pausa antes de guardar una salida.`;
		if (endMinutes === undefined && pauseEnd === undefined && index !== openBreakIndex) {
			return `${label}: solo puede quedar abierta la pausa actual.`;
		}
		if (endMinutes !== undefined && pauseEnd !== undefined && pauseEnd > endMinutes) {
			return `${label}: la pausa no debería terminar después de la salida.`;
		}
	}

	return '';
}

function relativeWorkdayMinutes(value: string, start: string, allowNextDay: boolean) {
	const minutes = timeToMinutes(value);
	const startMinutes = timeToMinutes(start);
	return allowNextDay && minutes < startMinutes ? minutes + 24 * 60 : minutes;
}

function isTimeValue(value: string) {
	return /^\d{2}:\d{2}$/.test(value);
}

export function recalculateTimeEntryStatus(entry: TimeEntry): EntryStatus {
	if (!entry.start) return 'sin fichaje';
	if (activeBreak(entry)) return 'pendiente';
	if (!entry.end && entry.date < todayIso()) return 'incidencia';
	return 'correcto';
}
