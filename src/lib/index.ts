import { TZDate } from '@date-fns/tz';

export function getTimezoneDate(timezone: string) {
	return new TZDate(new Date(), timezone);
}

export function getDayOfWeekLocalized(timezone: string) {
	const dateInRestorauntTimeZone = new TZDate(new Date(), timezone);
	const dayOfWeek = dateInRestorauntTimeZone.getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6;

	const dayOfWeekToName = {
		0: 'sunday',
		1: 'monday',
		2: 'tuesday',
		3: 'wednesday',
		4: 'thursday',
		5: 'friday',
		6: 'saturday'
	} as const;

	return dayOfWeekToName[dayOfWeek];
}

export function getTimezoneTime(timezone: string) {
	const dateInRestorauntTimeZone = new TZDate(new Date(), timezone);
	const dayOfWeekName = getDayOfWeekLocalized(timezone);

	const hours = dateInRestorauntTimeZone.getHours().toString().padStart(2, '0');

	return {
		dayOfWeekName,
		hours
	};
}

// https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
export function isValidIANATimezone(timezone: string): boolean {
	const date = new TZDate(new Date(), timezone);
	return !Number.isNaN(date.getDate());
}

export function printTransitionVariables() {
	console.log('old', getComputedStyle(document.documentElement).getPropertyValue('--vtranold'));
	console.log('new', getComputedStyle(document.documentElement).getPropertyValue('--vtrannew'));
}

export function setTransitionToLeft() {
	document.documentElement.style.setProperty(
		'--vt-old',
		// '90ms cubic-bezier(0.4, 0, 1, 1) both fade-out, 300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left'
		'var(--vt-main-to-side-old)'
	);
	document.documentElement.style.setProperty(
		'--vt-new',
		// '210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in, 300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right'
		'var(--vt-main-to-side-new)'
	);
}
export function setTransitionToRight() {
	document.documentElement.style.setProperty(
		'--vt-old',
		// '90ms cubic-bezier(0.4, 0, 1, 1) both fade-out, 300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-right'
		'var(--vt-side-to-main-old)'
	);
	document.documentElement.style.setProperty(
		'--vt-new',
		// '210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in, 300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-left'
		'var(--vt-side-to-main-new)'
	);
}

export const invalidCssCharsRegex = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^`{|}~ \t\n\r]/g;

export function formatCssPropertyValue(value: string): string {
	return value.replaceAll(invalidCssCharsRegex, '');
}
