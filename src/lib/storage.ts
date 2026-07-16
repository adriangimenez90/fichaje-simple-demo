import { DEMO_VERSION, KEYS } from '../config/app';
import type { DemoData } from './types';

function readCollection<T>(key: string, fallback: T[]): T[] {
	const raw = localStorage.getItem(key);
	if (!raw) return fallback;

	try {
		const parsed = JSON.parse(raw) as T[];
		return Array.isArray(parsed) ? parsed : fallback;
	} catch {
		return fallback;
	}
}

export function loadDemoDataFromStorage(defaults: DemoData): DemoData {
	if (localStorage.getItem(KEYS.demoVersion) !== DEMO_VERSION) {
		saveDemoDataToStorage(defaults);
		return defaults;
	}

	const data: DemoData = {
		timeEntries: readCollection(KEYS.timeEntries, defaults.timeEntries),
		vacations: readCollection(KEYS.vacations, defaults.vacations),
		incidents: readCollection(KEYS.incidents, defaults.incidents),
		holidays: readCollection(KEYS.holidays, defaults.holidays),
		scheduledReports: readCollection(KEYS.scheduledReports, defaults.scheduledReports),
		users: readCollection(KEYS.users, defaults.users),
		auditLog: readCollection(KEYS.audit, defaults.auditLog),
	};

	saveDemoDataToStorage(data);
	return data;
}

export function saveDemoDataToStorage(data: DemoData): void {
	localStorage.setItem(KEYS.demoVersion, DEMO_VERSION);
	localStorage.setItem(KEYS.timeEntries, JSON.stringify(data.timeEntries));
	localStorage.setItem(KEYS.vacations, JSON.stringify(data.vacations));
	localStorage.setItem(KEYS.incidents, JSON.stringify(data.incidents));
	localStorage.setItem(KEYS.holidays, JSON.stringify(data.holidays));
	localStorage.setItem(KEYS.scheduledReports, JSON.stringify(data.scheduledReports));
	localStorage.setItem(KEYS.users, JSON.stringify(data.users));
	localStorage.setItem(KEYS.audit, JSON.stringify(data.auditLog));
}
