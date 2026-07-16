import { DEMO_YEAR, EMPLOYEES } from '../config/app';
import { addDaysIso, dateRange, isWeekend } from '../lib/date';
import type {
	AppUser,
	AuditEntry,
	DemoData,
	EntryStatus,
	Holiday,
	Incident,
	IncidentStatus,
	Role,
	ScheduledReport,
	TimeBreak,
	TimeEntry,
	VacationRequest,
	VacationStatus,
} from '../lib/types';

function createDemoUsers(): AppUser[] {
	return [
		{
			id: 'admin_global',
			name: 'Administrador demo',
			email: 'admin.demo@fichajesimple.es',
			department: 'Dirección',
			role: 'admin_global',
			active: true,
		},
		{
			id: 'validador_vacaciones',
			name: 'Responsable de vacaciones',
			email: 'vacaciones.demo@fichajesimple.es',
			department: 'Administración',
			role: 'validador_vacaciones',
			active: true,
		},
		...EMPLOYEES.map((employee) => ({
			id: employee.id,
			name: employee.name,
			email:
				employee.id === 'ana'
					? 'ana.demo@fichajesimple.es'
					: employee.id === 'miguel'
						? 'miguel.demo@fichajesimple.es'
						: `${employee.id}@empresa-demo.es`,
			department: employee.department,
			role: 'empleado' as Role,
			active: true,
			employeeId: employee.id,
		})),
	];
}

function createYearlyDemoHolidays(): Holiday[] {
	return [
		{ id: 'holiday-2026-01-01', date: '2026-01-01', name: 'Año Nuevo', center: 'Centro Principal' },
		{ id: 'holiday-2026-01-06', date: '2026-01-06', name: 'Reyes', center: 'Centro Principal' },
		{ id: 'holiday-2026-03-19', date: '2026-03-19', name: 'San José', center: 'Centro Principal' },
		{ id: 'holiday-2026-05-01', date: '2026-05-01', name: 'Día del Trabajo', center: 'Centro Principal' },
		{ id: 'holiday-2026-08-15', date: '2026-08-15', name: 'Asunción', center: 'Centro Principal' },
		{ id: 'holiday-2026-10-09', date: '2026-10-09', name: 'Día de la Comunitat Valenciana', center: 'Centro Principal' },
		{ id: 'holiday-2026-10-12', date: '2026-10-12', name: 'Fiesta Nacional', center: 'Centro Principal' },
		{ id: 'holiday-2026-11-01', date: '2026-11-01', name: 'Todos los Santos', center: 'Centro Principal' },
		{ id: 'holiday-2026-12-06', date: '2026-12-06', name: 'Constitución', center: 'Centro Principal' },
		{ id: 'holiday-2026-12-08', date: '2026-12-08', name: 'Inmaculada', center: 'Centro Principal' },
		{ id: 'holiday-2026-12-25', date: '2026-12-25', name: 'Navidad', center: 'Centro Principal' },
	];
}

function demoSeedNumber(value: string) {
	let total = 0;
	for (let index = 0; index < value.length; index += 1) {
		total = (total * 31 + value.charCodeAt(index)) % 100000;
	}
	return total;
}

function demoClock(minutes: number) {
	const hour = Math.floor(minutes / 60);
	const minute = minutes % 60;
	return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

function demoTimestamp(date: string, time = '09:00') {
	return `${date}T${time}:00.000Z`;
}

function demoBusinessDay(date: string, holidayDates: Set<string>) {
	return !isWeekend(date) && !holidayDates.has(date);
}

function demoBusinessDaysBetween(from: string, to: string, holidayDates: Set<string>) {
	return dateRange(from, to).filter((date) => demoBusinessDay(date, holidayDates)).length;
}

function createYearlyDemoVacations(holidaySeed: Holiday[]): VacationRequest[] {
	const holidayDates = new Set(holidaySeed.map((holiday) => holiday.date));
	const plan: Array<{
		employeeId: string;
		from: string;
		to: string;
		status: VacationStatus;
		comment: string;
		denialReason?: string;
	}> = [
		{ employeeId: 'ana', from: '2026-01-26', to: '2026-01-26', status: 'aprobada', comment: 'Asunto familiar' },
		{ employeeId: 'ana', from: '2026-08-10', to: '2026-08-14', status: 'aprobada', comment: 'Vacaciones de verano' },
		{ employeeId: 'laura', from: '2026-03-30', to: '2026-04-01', status: 'aprobada', comment: 'Descanso planificado' },
		{ employeeId: 'laura', from: '2026-09-14', to: '2026-09-18', status: 'aprobada', comment: 'Vacaciones anuales' },
		{ employeeId: 'sergio', from: '2026-05-04', to: '2026-05-05', status: 'aprobada', comment: 'Puente personal' },
		{ employeeId: 'sergio', from: '2026-08-13', to: '2026-08-14', status: 'aprobada', comment: 'Descanso de verano' },
		{ employeeId: 'miguel', from: '2026-02-16', to: '2026-02-20', status: 'aprobada', comment: 'Semana libre' },
		{ employeeId: 'miguel', from: '2026-07-27', to: '2026-07-31', status: 'aprobada', comment: 'Vacaciones de verano' },
		{ employeeId: 'carlos', from: '2026-03-16', to: '2026-03-16', status: 'aprobada', comment: 'Trámite personal' },
		{ employeeId: 'carlos', from: '2026-09-07', to: '2026-09-11', status: 'aprobada', comment: 'Descanso anual' },
		{ employeeId: 'elena', from: '2026-04-06', to: '2026-04-08', status: 'aprobada', comment: 'Vacaciones cortas' },
		{ employeeId: 'elena', from: '2026-10-05', to: '2026-10-09', status: 'aprobada', comment: 'Semana de descanso' },
		{ employeeId: 'javier', from: '2026-01-19', to: '2026-01-23', status: 'aprobada', comment: 'Vacaciones de invierno' },
		{ employeeId: 'javier', from: '2026-08-24', to: '2026-08-28', status: 'aprobada', comment: 'Vacaciones familiares' },
		{ employeeId: 'daniel', from: '2026-06-22', to: '2026-06-26', status: 'aprobada', comment: 'Semana de verano' },
		{ employeeId: 'daniel', from: '2026-12-21', to: '2026-12-24', status: 'aprobada', comment: 'Navidad' },
		{ employeeId: 'paula', from: '2026-02-09', to: '2026-02-10', status: 'aprobada', comment: 'Descanso corto' },
		{ employeeId: 'paula', from: '2026-07-20', to: '2026-07-24', status: 'aprobada', comment: 'Vacaciones de verano' },
		{ employeeId: 'ruben', from: '2026-04-20', to: '2026-04-24', status: 'aprobada', comment: 'Viaje familiar' },
		{ employeeId: 'ruben', from: '2026-11-09', to: '2026-11-13', status: 'aprobada', comment: 'Descanso anual' },
		{ employeeId: 'alberto', from: '2026-05-18', to: '2026-05-22', status: 'aprobada', comment: 'Semana libre' },
		{ employeeId: 'alberto', from: '2026-12-28', to: '2026-12-31', status: 'aprobada', comment: 'Fin de año' },
		{ employeeId: 'marta', from: '2026-03-02', to: '2026-03-06', status: 'aprobada', comment: 'Vacaciones aprobadas' },
		{ employeeId: 'marta', from: '2026-08-03', to: '2026-08-07', status: 'aprobada', comment: 'Vacaciones de verano' },
		{ employeeId: 'cristina', from: '2026-06-08', to: '2026-06-12', status: 'aprobada', comment: 'Semana libre' },
		{ employeeId: 'cristina', from: '2026-09-21', to: '2026-09-23', status: 'aprobada', comment: 'Descanso pendiente' },
		{ employeeId: 'noelia', from: '2026-01-12', to: '2026-01-16', status: 'aprobada', comment: 'Vacaciones de invierno' },
		{ employeeId: 'noelia', from: '2026-10-19', to: '2026-10-23', status: 'aprobada', comment: 'Vacaciones anuales' },
		{ employeeId: 'irene', from: '2026-02-23', to: '2026-02-27', status: 'aprobada', comment: 'Descanso anual' },
		{ employeeId: 'irene', from: '2026-07-06', to: '2026-07-10', status: 'aprobada', comment: 'Vacaciones de verano' },
		{ employeeId: 'beatriz', from: '2026-05-25', to: '2026-05-29', status: 'aprobada', comment: 'Semana libre' },
		{ employeeId: 'beatriz', from: '2026-11-23', to: '2026-11-27', status: 'aprobada', comment: 'Descanso planificado' },
		{ employeeId: 'raul', from: '2026-08-17', to: '2026-08-21', status: 'aprobada', comment: 'Vacaciones dirección' },
		{ employeeId: 'raul', from: '2026-12-07', to: '2026-12-11', status: 'aprobada', comment: 'Puente de diciembre' },
		{ employeeId: 'ana', from: '2026-08-31', to: '2026-09-02', status: 'pendiente', comment: 'Pendiente de confirmar calendario escolar' },
		{ employeeId: 'laura', from: '2026-08-12', to: '2026-08-17', status: 'pendiente', comment: 'Revisar cobertura de Administración' },
		{ employeeId: 'miguel', from: '2026-12-28', to: '2026-12-31', status: 'pendiente', comment: 'Vacaciones de fin de año' },
		{ employeeId: 'carlos', from: '2026-10-06', to: '2026-10-09', status: 'pendiente', comment: 'Pendiente de cuadrar turnos' },
		{ employeeId: 'paula', from: '2026-11-10', to: '2026-11-12', status: 'pendiente', comment: 'Viaje comercial familiar' },
		{ employeeId: 'marta', from: '2026-09-21', to: '2026-09-25', status: 'pendiente', comment: 'Semana solicitada' },
		{ employeeId: 'irene', from: '2026-12-07', to: '2026-12-11', status: 'pendiente', comment: 'Puente de diciembre' },
		{ employeeId: 'noelia', from: '2026-07-20', to: '2026-07-21', status: 'pendiente', comment: 'Asunto personal' },
		{ employeeId: 'sergio', from: '2026-09-30', to: '2026-10-02', status: 'denegada', comment: 'Solicitud en cierre mensual', denialReason: 'Periodo de cierre mensual' },
		{ employeeId: 'elena', from: '2026-08-24', to: '2026-08-28', status: 'denegada', comment: 'Semana completa', denialReason: 'Solape con demasiadas ausencias en el departamento' },
		{ employeeId: 'cristina', from: '2026-08-03', to: '2026-08-07', status: 'denegada', comment: 'Vacaciones de verano', denialReason: 'Cobertura insuficiente en Atención al cliente' },
		{ employeeId: 'alberto', from: '2026-12-21', to: '2026-12-24', status: 'denegada', comment: 'Navidad', denialReason: 'Pendiente de reorganizar turnos' },
		{ employeeId: 'beatriz', from: '2026-07-06', to: '2026-07-10', status: 'denegada', comment: 'Semana de julio', denialReason: 'Cobertura insuficiente en RRHH' },
		{ employeeId: 'carlos', from: '2026-05-18', to: '2026-05-22', status: 'denegada', comment: 'Semana solicitada', denialReason: 'Solape con demasiadas ausencias en el departamento' },
		{ employeeId: 'ana', from: '2026-04-13', to: '2026-04-14', status: 'cancelada', comment: 'Cancelada por cambio de planes' },
		{ employeeId: 'miguel', from: '2026-10-13', to: '2026-10-16', status: 'cancelada', comment: 'Cancelada por necesidades del equipo' },
		{ employeeId: 'paula', from: '2026-05-11', to: '2026-05-11', status: 'cancelada', comment: 'Cancelada por agenda comercial' },
	];

	return plan.map((request, index) => ({
		id: `vac-${request.employeeId}-${request.from}-${request.status}`,
		employeeId: request.employeeId,
		from: request.from,
		to: request.to,
		days: demoBusinessDaysBetween(request.from, request.to, holidayDates),
		status: request.status,
		comment: request.comment,
		denialReason: request.denialReason,
		createdAt: demoTimestamp(addDaysIso(request.from, -28 - (index % 9))),
		decidedAt: request.status === 'pendiente' ? undefined : demoTimestamp(addDaysIso(request.from, -20 - (index % 6)), '11:30'),
	}));
}

function createYearlyDemoTimesheets(vacationSeed: VacationRequest[], holidaySeed: Holiday[]) {
	const holidayDates = new Set(holidaySeed.map((holiday) => holiday.date));
	const approvedVacationDates = new Set<string>();
	const timeEntriesSeed: TimeEntry[] = [];
	const incidentsSeed: Incident[] = [];

	vacationSeed
		.filter((request) => request.status === 'aprobada')
		.forEach((request) => {
			dateRange(request.from, request.to)
				.filter((date) => demoBusinessDay(date, holidayDates))
				.forEach((date) => approvedVacationDates.add(`${request.employeeId}|${date}`));
		});

	EMPLOYEES.forEach((employee, employeeIndex) => {
		dateRange(`${DEMO_YEAR}-01-01`, `${DEMO_YEAR}-12-31`).forEach((date, dayIndex) => {
			if (!demoBusinessDay(date, holidayDates)) return;
			if (approvedVacationDates.has(`${employee.id}|${date}`)) return;

			const marker = demoSeedNumber(`${employee.id}-${date}-${employeeIndex}`);
			const missedDay = marker % 211 === 0;
			const missingEnd = !missedDay && marker % 239 === 0;
			const openBreak = !missedDay && !missingEnd && marker % 293 === 0;
			const earlyEnd = !missedDay && !missingEnd && !openBreak && marker % 317 === 0;
			const pendingCorrection = !missedDay && !missingEnd && !openBreak && !earlyEnd && marker % 359 === 0;
			const issue = missedDay || missingEnd || openBreak || earlyEnd || pendingCorrection;
			const incidentReviewed = date < '2026-07-01' || marker % 5 === 0;
			const incidentStatus: IncidentStatus = incidentReviewed ? 'revisada' : 'pendiente';

			if (missedDay) {
				incidentsSeed.push({
					id: `incident-missed-${employee.id}-${date}`,
					employeeId: employee.id,
					date,
					type: 'Sin fichaje',
					detail: 'No consta entrada registrada en una jornada laborable.',
					status: incidentStatus,
					createdAt: demoTimestamp(date, '18:10'),
					reviewedAt: incidentReviewed ? demoTimestamp(addDaysIso(date, 1), '10:15') : undefined,
				});
				return;
			}

			const startMinutes = 480 + ((marker + employeeIndex * 7) % 76);
			const hasBreak = openBreak || marker % 6 !== 0;
			const breakStartMinutes = 810 + ((marker + dayIndex) % 91);
			const breakDuration = 20 + (marker % 56);
			const breakEndMinutes = breakStartMinutes + breakDuration;
			const breakKind: TimeBreak['kind'] = marker % 4 === 0 ? 'meal' : 'manual';
			const breaks: TimeBreak[] = hasBreak
				? [
						{
							start: demoClock(breakStartMinutes),
							end: openBreak ? undefined : demoClock(breakEndMinutes),
							kind: breakKind,
							label: breakKind === 'meal' ? 'Comida' : 'Descanso',
						},
					]
				: [];
			const normalEndMinutes = 1005 + ((marker + employeeIndex * 13) % 106);
			const earlyEndMinutes = startMinutes + 360 + (marker % 35);
			const minimumEnd = hasBreak && !openBreak ? breakEndMinutes + 45 : startMinutes + 420;
			const endMinutes = Math.max(earlyEnd ? earlyEndMinutes : normalEndMinutes, minimumEnd);
			const end = missingEnd || openBreak ? undefined : demoClock(endMinutes);
			const status: EntryStatus = issue ? 'incidencia' : 'correcto';

			timeEntriesSeed.push({
				id: `time-${employee.id}-${date}`,
				employeeId: employee.id,
				date,
				start: demoClock(startMinutes),
				breaks,
				end,
				status,
				notes: missingEnd
					? 'Salida pendiente de revisar'
					: openBreak
						? 'Pausa abierta pendiente de cierre'
						: earlyEnd
							? 'Jornada incompleta'
							: pendingCorrection
								? 'Corrección pendiente de validar'
								: undefined,
			});

			if (!issue) return;

			const incidentType = missingEnd
				? 'Salida olvidada'
				: openBreak
					? 'Pausa abierta'
					: earlyEnd
						? 'Jornada incompleta'
						: 'Corrección pendiente';
			incidentsSeed.push({
				id: `incident-${employee.id}-${date}`,
				employeeId: employee.id,
				date,
				type: incidentType,
				detail: missingEnd
					? 'Jornada sin salida registrada.'
					: openBreak
						? `Pausa iniciada a las ${breaks[0]?.start || 'sin hora'} pendiente de cierre.`
						: earlyEnd
							? `Salida registrada antes de la jornada prevista: ${end}.`
							: 'El empleado ha solicitado revisar este registro.',
				status: incidentStatus,
				createdAt: demoTimestamp(date, '18:20'),
				reviewedAt: incidentReviewed ? demoTimestamp(addDaysIso(date, 1), '10:30') : undefined,
			});
		});
	});

	return { timeEntries: timeEntriesSeed, incidents: incidentsSeed };
}

function createDemoAuditLog(): AuditEntry[] {
	return [
		{
			id: 'audit-init-2026-demo',
			at: '2026-01-02T09:00:00.000Z',
			user: 'Sistema demo',
			action: 'Datos iniciales',
			detail: 'Se cargaron datos ficticios anuales de Empresa Demo.',
		},
	];
}

function createDemoScheduledReports(): ScheduledReport[] {
	return [
		{
			id: 'report-weekly-default',
			reportType: 'Resumen semanal',
			frequency: 'Semanal',
			sendDay: 'Lunes',
			recipient: 'responsable.vacaciones@empresa-demo.es',
			format: 'CSV + PDF',
			active: true,
			createdAt: '2026-01-05T09:00:00.000Z',
		},
	];
}

export function createDemoData(): DemoData {
	const holidays = createYearlyDemoHolidays();
	const vacations = createYearlyDemoVacations(holidays);
	const yearlyTimesheets = createYearlyDemoTimesheets(vacations, holidays);

	return {
		timeEntries: yearlyTimesheets.timeEntries,
		vacations,
		incidents: yearlyTimesheets.incidents,
		holidays,
		scheduledReports: createDemoScheduledReports(),
		users: createDemoUsers(),
		auditLog: createDemoAuditLog(),
	};
}
