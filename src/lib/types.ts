export type Role = 'admin_global' | 'validador_vacaciones' | 'empleado';
export type EntryStatus = 'correcto' | 'incidencia' | 'pendiente' | 'sin fichaje';
export type VacationStatus = 'pendiente' | 'aprobada' | 'denegada' | 'cancelada';
export type EmployeeVacationFilter = 'all' | 'aprobada-futura' | 'disfrutada' | VacationStatus;
export type IncidentStatus = 'pendiente' | 'revisada';
export type TeamCalendarMode = 'month' | 'planning';
export type AdminTodayFilter = 'all' | 'trabajando' | 'pausa' | 'sin-fichar' | 'vacaciones';
export type AdminIncidentFilter = IncidentStatus | 'all';

export type Session = {
	id: string;
	email: string;
	name: string;
	role: Role;
	department?: string;
	employeeId?: string;
};

export type AppUser = {
	id: string;
	name: string;
	email: string;
	department: string;
	role: Role;
	active: boolean;
	employeeId?: string;
};

export type Employee = {
	id: string;
	name: string;
	department: string;
	vacationDays: number;
};

export type TimeBreak = {
	start: string;
	end?: string;
	kind?: 'manual' | 'quick' | 'meal';
	label?: string;
};

export type TimeEntry = {
	id: string;
	employeeId: string;
	date: string;
	start?: string;
	breaks: TimeBreak[];
	end?: string;
	status: EntryStatus;
	notes?: string;
};

export type VacationRequest = {
	id: string;
	employeeId: string;
	from: string;
	to: string;
	days: number;
	status: VacationStatus;
	comment?: string;
	denialReason?: string;
	createdAt: string;
	decidedAt?: string;
};

export type Incident = {
	id: string;
	employeeId: string;
	date: string;
	type: string;
	detail: string;
	status: IncidentStatus;
	createdAt: string;
	reviewedAt?: string;
};

export type Holiday = {
	id: string;
	date: string;
	name: string;
	center: string;
};

export type AuditEntry = {
	id: string;
	at: string;
	user: string;
	action: string;
	detail: string;
};

export type ScheduledReport = {
	id: string;
	reportType: string;
	frequency: string;
	sendDay: string;
	recipient: string;
	format: string;
	active: boolean;
	createdAt: string;
};

export type DemoData = {
	timeEntries: TimeEntry[];
	vacations: VacationRequest[];
	incidents: Incident[];
	holidays: Holiday[];
	scheduledReports: ScheduledReport[];
	users: AppUser[];
	auditLog: AuditEntry[];
};

export type NavigationView = {
	id: string;
	label: string;
	hint: string;
};
