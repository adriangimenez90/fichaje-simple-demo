export function todayIso() {
	return isoFromDate(new Date());
}

export function isoFromDate(date: Date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}

export function startOfWeekIso(date: string) {
	const weekStart = new Date(`${date}T12:00:00`);
	const offset = (weekStart.getDay() + 6) % 7;
	weekStart.setDate(weekStart.getDate() - offset);
	return isoFromDate(weekStart);
}

export function startOfMonthIso(date: Date) {
	return isoFromDate(new Date(date.getFullYear(), date.getMonth(), 1));
}

export function addDaysIso(date: string, amount: number) {
	const next = new Date(`${date}T12:00:00`);
	next.setDate(next.getDate() + amount);
	return isoFromDate(next);
}

export function clampDateIso(date: string, min: string, max: string) {
	if (date < min) return min;
	if (date > max) return max;
	return date;
}

export function diffDays(from: string, to: string) {
	const start = new Date(`${from}T12:00:00`).getTime();
	const end = new Date(`${to}T12:00:00`).getTime();
	return Math.round((end - start) / 86400000);
}

export function dateRange(from: string, to: string) {
	const total = Math.max(diffDays(from, to), 0);
	return Array.from({ length: total + 1 }, (_, index) => addDaysIso(from, index));
}

export function isWeekend(date: string) {
	const day = new Date(`${date}T12:00:00`).getDay();
	return day === 0 || day === 6;
}

export function isDateWithin(date: string, from: string, to: string) {
	return date >= from && date <= to;
}

export function rangesOverlap(fromA: string, toA: string, fromB: string, toB: string) {
	return fromA <= toB && fromB <= toA;
}

export function dateInRange(date: string, from: string, to: string) {
	return (!from || date >= from) && (!to || date <= to);
}

export function minDate(a: string, b: string) {
	return a < b ? a : b;
}

export function maxDate(a: string, b: string) {
	return a > b ? a : b;
}

export function monthKey(date: string) {
	return date.slice(0, 7);
}

export function monthLabel(month: string) {
	const [year, monthIndex] = month.split('-').map(Number);
	return new Date(year, monthIndex - 1, 1).toLocaleDateString('es-ES', {
		month: 'long',
		year: 'numeric',
	});
}

export function monthRangeFromInput(month: string) {
	const safeMonth = /^\d{4}-\d{2}$/.test(month) ? month : todayIso().slice(0, 7);
	const [year, monthIndex] = safeMonth.split('-').map(Number);
	return {
		from: `${safeMonth}-01`,
		to: isoFromDate(new Date(year, monthIndex, 0)),
	};
}

export function weekInputValue(date: string) {
	const target = new Date(`${date}T12:00:00`);
	const day = target.getDay() || 7;
	target.setDate(target.getDate() + 4 - day);
	const yearStart = new Date(target.getFullYear(), 0, 1);
	const week = Math.ceil((((target.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
	return `${target.getFullYear()}-W${String(week).padStart(2, '0')}`;
}

export function weekRangeFromInput(weekValue: string) {
	const safeWeek = /^\d{4}-W\d{2}$/.test(weekValue) ? weekValue : weekInputValue(todayIso());
	const [yearText, weekText] = safeWeek.split('-W');
	const year = Number(yearText);
	const week = Number(weekText);
	const fourthJan = new Date(year, 0, 4);
	const weekOneOffset = (fourthJan.getDay() + 6) % 7;
	const monday = new Date(fourthJan);
	monday.setDate(fourthJan.getDate() - weekOneOffset + (week - 1) * 7);
	const from = isoFromDate(monday);
	return {
		from,
		to: addDaysIso(from, 6),
	};
}
