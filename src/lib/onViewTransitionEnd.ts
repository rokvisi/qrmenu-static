const callbacks: (() => void)[] = [];

export function onViewTransitionEnd(callback: () => void) {
	callbacks.push(callback);
}

export function triggerViewTransitionEnd() {
	if (callbacks.length === 0) return;

	// Execute the callbacks.
	callbacks.forEach((cb) => cb());

	// Clear the callback array.
	callbacks.length = 0;
}
