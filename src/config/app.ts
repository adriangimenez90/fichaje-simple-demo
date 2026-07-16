import type { Employee, NavigationView } from '../lib/types';

export const KEYS = {
	demoVersion: 'fs_demoVersion',
	session: 'fs_session',
	timeEntries: 'fs_timeEntries',
	vacations: 'fs_vacations',
	incidents: 'fs_incidents',
	holidays: 'fs_holidays',
	scheduledReports: 'fs_scheduledReports',
	users: 'fs_users',
	audit: 'fs_audit',
} as const;

export const DEMO_YEAR = 2026;
export const DEMO_VERSION = '2026-empresa-17-v1';

export const EMPLOYEES: Employee[] = [
	{ id: 'ana', name: 'Ana Martínez', department: 'Administración', vacationDays: 22 },
	{ id: 'laura', name: 'Laura Sánchez', department: 'Administración', vacationDays: 22 },
	{ id: 'sergio', name: 'Sergio Navarro', department: 'Administración', vacationDays: 22 },
	{ id: 'miguel', name: 'Miguel López', department: 'Operaciones', vacationDays: 22 },
	{ id: 'carlos', name: 'Carlos Gómez', department: 'Operaciones', vacationDays: 22 },
	{ id: 'elena', name: 'Elena Torres', department: 'Operaciones', vacationDays: 22 },
	{ id: 'javier', name: 'Javier Romero', department: 'Operaciones', vacationDays: 22 },
	{ id: 'daniel', name: 'Daniel Ortega', department: 'Operaciones', vacationDays: 22 },
	{ id: 'paula', name: 'Paula Molina', department: 'Comercial', vacationDays: 22 },
	{ id: 'ruben', name: 'Rubén Castillo', department: 'Comercial', vacationDays: 22 },
	{ id: 'alberto', name: 'Alberto Campos', department: 'Comercial', vacationDays: 22 },
	{ id: 'marta', name: 'Marta Ruiz', department: 'Atención al cliente', vacationDays: 22 },
	{ id: 'cristina', name: 'Cristina Vidal', department: 'Atención al cliente', vacationDays: 22 },
	{ id: 'noelia', name: 'Noelia Ferrer', department: 'Atención al cliente', vacationDays: 22 },
	{ id: 'irene', name: 'Irene Gil', department: 'RRHH', vacationDays: 22 },
	{ id: 'beatriz', name: 'Beatriz León', department: 'RRHH', vacationDays: 22 },
	{ id: 'raul', name: 'Raúl Moreno', department: 'Dirección', vacationDays: 22 },
];

export const EMPLOYEE_VIEWS: NavigationView[] = [
	{ id: 'fichar', label: 'Fichar', hint: 'Entrada, descanso y salida' },
	{ id: 'vacaciones', label: 'Vacaciones', hint: 'Saldo y solicitudes' },
	{ id: 'calendario', label: 'Calendario', hint: 'Registros del mes' },
];

export const VALIDATOR_VIEWS: NavigationView[] = [
	{ id: 'solicitudes', label: 'Solicitudes', hint: 'Aprobar o denegar' },
	{ id: 'calendario-equipo', label: 'Calendario equipo', hint: 'Vacaciones del equipo' },
	{ id: 'festivos', label: 'Festivos', hint: 'Calendario local' },
];

export const ADMIN_VIEWS: NavigationView[] = [
	{ id: 'dashboard', label: 'Inicio', hint: 'Resumen de hoy' },
	{ id: 'usuarios', label: 'Empleados', hint: 'Personas y roles' },
	{ id: 'fichajes', label: 'Fichajes', hint: 'Registros e incidencias' },
	{ id: 'vacaciones-admin', label: 'Vacaciones', hint: 'Solicitudes y planning' },
	{ id: 'exportaciones', label: 'Exportar', hint: 'Informes y descargas' },
	{ id: 'configuracion', label: 'Ajustes', hint: 'Festivos y demo' },
];

export const STATUS_LABELS: Record<string, string> = {
	correcto: 'Correcto',
	incidencia: 'Incidencia',
	pendiente: 'Pendiente',
	'sin fichaje': 'Sin fichaje',
	festivo: 'Festivo',
	vacaciones: 'Vacaciones',
	'fin de semana': 'Fin de semana',
	aprobada: 'Aprobada',
	denegada: 'Denegada',
	cancelada: 'Cancelada',
	revisada: 'Revisada',
	trabajando: 'Trabajando',
	pausa: 'En descanso',
	activo: 'Activo',
	inactivo: 'Inactivo',
};
