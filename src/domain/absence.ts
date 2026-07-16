import {
	dateRange,
	isDateWithin,
	isWeekend,
	maxDate,
	minDate,
	rangesOverlap,
} from '../lib/date';
import type {
	AbsenceType,
	Employee,
	EmployeeVacationFilter,
	Holiday,
	VacationBalance,
	VacationConflict,
	VacationRequest,
} from '../lib/types';

export function resolveAbsenceTypeId(
	request: VacationRequest,
): string {
	return request.absenceTypeId || 'vacation';
}

export function findAbsenceType(
	request: VacationRequest,
	absenceTypes: readonly AbsenceType[],
): AbsenceType | undefined {
	const requestedType = absenceTypes.find((item) => item.id === resolveAbsenceTypeId(request));
	return requestedType || absenceTypes.find((item) => item.id === 'vacation');
}

export function normalizeAbsenceRequest(
	request: VacationRequest,
): VacationRequest {
	return {
		...request,
		absenceTypeId: resolveAbsenceTypeId(request),
	};
}

export function isVacationRequest(
	request: VacationRequest,
): boolean {
	return resolveAbsenceTypeId(request) === 'vacation';
}

export function absenceUsesHours(
	request: VacationRequest,
	absenceTypes: readonly AbsenceType[],
): boolean {
	return findAbsenceType(request, absenceTypes)?.unit === 'hours';
}

export function absenceDeductsVacationBalance(
	request: VacationRequest,
	absenceTypes: readonly AbsenceType[],
): boolean {
	return findAbsenceType(request, absenceTypes)?.deductsVacationBalance ?? true;
}

export function isBusinessDay(
	date: string,
	holidays: Holiday[],
): boolean {
	return !isWeekend(date) && !holidays.some((holiday) => holiday.date === date);
}

export function businessDaysBetween(
	from: string,
	to: string,
	holidays: Holiday[],
): number {
	return dateRange(from, to).filter((date) => isBusinessDay(date, holidays)).length;
}

export function businessRangesOverlap(
	fromA: string,
	toA: string,
	fromB: string,
	toB: string,
	holidays: Holiday[],
): boolean {
	if (!rangesOverlap(fromA, toA, fromB, toB)) return false;
	return dateRange(maxDate(fromA, fromB), minDate(toA, toB)).some((date) => isBusinessDay(date, holidays));
}

export function isActiveVacationRequest(
	request: VacationRequest,
): boolean {
	return request.status === 'aprobada' || request.status === 'pendiente';
}

export function vacationRequestDays(
	request: VacationRequest,
	holidays: Holiday[],
): number {
	return businessDaysBetween(request.from, request.to, holidays);
}

export function countVacationDaysInRange(
	employeeId: string,
	from: string,
	to: string,
	vacations: VacationRequest[],
	holidays: Holiday[],
): number {
	return vacations
		.filter(
			(request) =>
				request.employeeId === employeeId &&
				request.status === 'aprobada' &&
				rangesOverlap(from, to, request.from, request.to),
		)
		.reduce((sum, request) => {
			return (
				sum +
				dateRange(maxDate(from, request.from), minDate(to, request.to)).filter((date) =>
					isBusinessDay(date, holidays),
				).length
			);
		}, 0);
}

export function isFutureApprovedVacation(
	request: VacationRequest,
	today: string,
): boolean {
	return request.status === 'aprobada' && request.from > today;
}

export function isEnjoyedVacation(
	request: VacationRequest,
	today: string,
): boolean {
	return request.status === 'aprobada' && request.from <= today;
}

export function filterEmployeeVacationRequests(
	requests: VacationRequest[],
	filter: EmployeeVacationFilter,
	today: string,
): VacationRequest[] {
	if (filter === 'all') return requests;
	if (filter === 'aprobada-futura') return requests.filter((request) => isFutureApprovedVacation(request, today));
	if (filter === 'disfrutada') return requests.filter((request) => isEnjoyedVacation(request, today));
	return requests.filter((request) => request.status === filter);
}

export function calculateVacationBalance(
	employee: Employee,
	vacations: VacationRequest[],
	holidays: Holiday[],
	today: string,
): VacationBalance {
	const own = vacations.filter((request) => request.employeeId === employee.id);
	const enjoyed = own
		.filter((request) => isEnjoyedVacation(request, today))
		.reduce((sum, item) => sum + vacationRequestDays(item, holidays), 0);
	const futureApproved = own
		.filter((request) => isFutureApprovedVacation(request, today))
		.reduce((sum, item) => sum + vacationRequestDays(item, holidays), 0);
	const pending = own
		.filter((request) => request.status === 'pendiente')
		.reduce((sum, item) => sum + vacationRequestDays(item, holidays), 0);
	const denied = own
		.filter((request) => request.status === 'denegada')
		.reduce((sum, item) => sum + vacationRequestDays(item, holidays), 0);
	const canceled = own
		.filter((request) => request.status === 'cancelada')
		.reduce((sum, item) => sum + vacationRequestDays(item, holidays), 0);
	const committed = enjoyed + futureApproved + pending;
	return {
		available: Math.max(employee.vacationDays - committed, 0),
		used: enjoyed,
		enjoyed,
		futureApproved,
		pending,
		denied,
		canceled,
	};
}

export function vacationConflictDetails(
	request: VacationRequest,
	scopeEmployees: Employee[],
	vacations: VacationRequest[],
	holidays: Holiday[],
): VacationConflict[] {
	const scopeIds = new Set(scopeEmployees.map((employee) => employee.id));
	return vacations
		.filter(
			(item) =>
				item.id !== request.id &&
				item.employeeId !== request.employeeId &&
				scopeIds.has(item.employeeId) &&
				isActiveVacationRequest(item) &&
				businessRangesOverlap(request.from, request.to, item.from, item.to, holidays),
		)
		.map((item) => ({
			request: item,
			from: maxDate(request.from, item.from),
			to: minDate(request.to, item.to),
		}))
		.sort((a, b) => a.from.localeCompare(b.from));
}

export function vacationConflictCounts(
	request: VacationRequest,
	scopeEmployees: Employee[],
	vacations: VacationRequest[],
	holidays: Holiday[],
): {
	approved: number;
	pending: number;
} {
	const details = vacationConflictDetails(request, scopeEmployees, vacations, holidays);
	const approved = new Set(details.filter((item) => item.request.status === 'aprobada').map((item) => item.request.employeeId));
	const pending = new Set(details.filter((item) => item.request.status === 'pendiente').map((item) => item.request.employeeId));

	return {
		approved: approved.size,
		pending: pending.size,
	};
}
