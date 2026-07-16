export function downloadCsv(filename: string, rows: Record<string, string | number>[]) {
	const headers = Object.keys(rows[0] || { demo: 'Sin datos' });
	const body = rows.length ? rows : [{ demo: 'Sin datos' }];
	const csv = [
		headers.join(';'),
		...body.map((row) => headers.map((header) => csvValue(row[header])).join(';')),
	].join('\r\n');
	const blob = new Blob([`\ufeff${csv}`], { type: 'text/csv;charset=utf-8;' });
	const link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = filename;
	link.click();
	URL.revokeObjectURL(link.href);
}

export function csvValue(value: string | number | undefined) {
	const text = String(value ?? '');
	return `"${text.replaceAll('"', '""')}"`;
}
