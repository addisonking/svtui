/*
Docs-only terminal scroll — quantizes wheel scrolling to discrete --line jumps
instead of smooth pixel scrolling, so the page moves the way a real terminal
scrolls (a row at a time). Keyboard scrolling (arrows, PageUp/Down, Space) is
left native, and scrolling inside nested scroll containers (the sidebar) is
left native too — only the main page wheel is hijacked. Never shipped (not a
component, not in the registry).
*/

if (typeof window !== 'undefined') {
	let pending = 0;

	const linePx = () => parseFloat(getComputedStyle(document.body).lineHeight) || 16;

	const onWheel = (e: WheelEvent) => {
		// Don't hijack scrolling inside the sidebar or any other scroll container.
		const t = e.target as Element | null;
		if (t?.closest?.('.sidebar')) return;

		e.preventDefault();

		let dy = e.deltaY;
		if (e.deltaMode === 1)
			dy *= linePx(); // units are lines
		else if (e.deltaMode === 2) dy *= window.innerHeight; // units are pages

		pending += dy;
		const lp = linePx();
		const lines = Math.trunc(pending / lp);
		if (lines === 0) return;
		pending -= lines * lp;
		window.scrollBy(0, lines * lp); // instant jump — discrete, like a terminal
	};

	window.addEventListener('wheel', onWheel, { passive: false });
}
