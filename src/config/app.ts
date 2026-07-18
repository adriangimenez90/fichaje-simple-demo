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
	{ id: 'fichar', label: 'Hoy', hint: 'Jornada y fichaje' },
	{ id: 'vacaciones', label: 'Ausencias', hint: 'Vacaciones y permisos' },
	{ id: 'calendario', label: 'Calendario', hint: 'Jornadas y ausencias' },
	{ id: 'perfil', label: 'Perfil', hint: 'Tus datos laborales' },
];

export const VALIDATOR_VIEWS: NavigationView[] = [
	{ id: 'solicitudes', label: 'Solicitudes', hint: 'Vacaciones y permisos' },
	{ id: 'calendario-equipo', label: 'Calendario', hint: 'Disponibilidad del equipo' },
	{ id: 'festivos', label: 'Festivos', hint: 'Calendario laboral' },
];

export const ADMIN_VIEWS: NavigationView[] = [
	{ id: 'admin-inicio', label: 'Inicio', hint: 'Resumen de la empresa' },
	{ id: 'personas', label: 'Personas', hint: 'Empleados y accesos' },
	{ id: 'registros', label: 'Registros', hint: 'Jornadas e incidencias' },
	{ id: 'vacaciones-admin', label: 'Ausencias', hint: 'Vacaciones y permisos' },
	{ id: 'informes', label: 'Informes', hint: 'Exportación y seguimiento' },
	{ id: 'configuracion', label: 'Configuración', hint: 'Empresa y políticas' },
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
