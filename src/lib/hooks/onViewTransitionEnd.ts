const onTransitionEndCallbacks: (() => void)[] = [];

export function onViewTransitionEnd(callback: () => void) {
	onTransitionEndCallbacks.push(callback);
}

export function triggerViewTransitionEndCallbacks() {
	if (onTransitionEndCallbacks.length === 0) return;

	// Execute the callbacks.
	onTransitionEndCallbacks.forEach((cb) => cb());

	// Clear the callback array.
	onTransitionEndCallbacks.length = 0;
}
