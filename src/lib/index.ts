import { TZDate } from '@date-fns/tz';
import { onMount } from 'svelte';

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

export function vt_set_home_to_other() {
	onMount(() => {
		document.documentElement.style.setProperty('--vt-old', 'var(--vt-main-to-side-old)');
		document.documentElement.style.setProperty('--vt-new', 'var(--vt-main-to-side-new)');
	});
}
export function vt_set_other_to_home() {
	onMount(() => {
		document.documentElement.style.setProperty('--vt-old', 'var(--vt-side-to-main-old)');
		document.documentElement.style.setProperty('--vt-new', 'var(--vt-side-to-main-new)');
	});
}

export function normalizeCssValue(value: string): string {
	const invalidCssCharsRegex = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^`{|}~ \t\n\r]/g;

	return value.replaceAll(invalidCssCharsRegex, '');
}

export function getElementClosestToViewportTop<ElementT>(
	selector: string,
	cutoff: number = 0
): ElementT | null {
	let closestDistance = Infinity;
	let closestElement: ElementT | null = null;

	document.querySelectorAll(selector).forEach((el) => {
		const boundingRect = el.getBoundingClientRect();
		const dist = boundingRect.top + boundingRect.height;

		if (dist < 0 || dist - cutoff < 0) {
			// If the element is above the viewport and its bottom is above the cutoff, ignore it.
			return;
		}

		if (dist < closestDistance) {
			closestDistance = dist;
			closestElement = el as ElementT;
		}
	});

	return closestElement;
}

export function getClosestElementToCenterY<ElementT>(selector: string): ElementT | null {
	// Center of the viewport. Y coord.
	const centerTargetPos = window.innerHeight / 2;

	// Get all elements matching the selector.
	const elements = document.querySelectorAll(selector);
	if (elements.length === 0) {
		return null;
	}

	// Find the closest element to the center of the viewport.
	let closestElement: null | Element = null;
	let closestDistance = Infinity;
	elements.forEach((element) => {
		const rect = element.getBoundingClientRect();
		const elementCenterY = rect.top + rect.height / 2;

		const distance = Math.abs(elementCenterY - centerTargetPos);

		if (distance < closestDistance) {
			closestDistance = distance;
			closestElement = element;
		}
	});

	return closestElement;
}
