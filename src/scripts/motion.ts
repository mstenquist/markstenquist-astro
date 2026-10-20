// Cursor crosshair, parallax, tilt and scroll-linked effects.
// Everything is driven by data attributes so pages stay plain markup:
//   data-parallax="0.12"   drift vertically as the element passes the viewport centre
//   data-parallax-max="80" clamp that drift (px)
//   data-mouse="24"        follow the pointer by up to N px
//   data-tilt              rotate in 3D toward the pointer
//   data-magnetic          lean toward the pointer while hovered
//   data-progress          width tracks how far the page has been read
//   data-timeline          its .timeline-fill grows as the section scrolls in
//   data-cursor-label="…"  text shown in the cursor chip while hovering

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

interface Layer {
	el: HTMLElement;
	parallax: number;
	max: number;
	mouse: number;
	tilt: boolean;
	offsetY: number;
}

const layers: Layer[] = [...document.querySelectorAll<HTMLElement>('[data-parallax], [data-mouse], [data-tilt]')].map((el) => ({
	el,
	parallax: Number(el.dataset.parallax ?? 0),
	max: Number(el.dataset.parallaxMax ?? Infinity),
	mouse: Number(el.dataset.mouse ?? 0),
	tilt: el.hasAttribute('data-tilt'),
	offsetY: 0,
}));
const progressBars = [...document.querySelectorAll<HTMLElement>('[data-progress]')];
const timelines = [...document.querySelectorAll<HTMLElement>('[data-timeline]')];

const pointer = { x: -100, y: -100, px: 0, py: 0 };
let queued = false;

function frame() {
	queued = false;
	const vh = window.innerHeight;

	if (!reduceMotion) {
		for (const layer of layers) {
			// Measure without the drift we applied last frame, so the effect never feeds back on itself.
			const rect = layer.el.getBoundingClientRect();
			const centre = rect.top - layer.offsetY + rect.height / 2;
			// Rest where the element sits with the page at the top, or at the viewport centre for anything
			// further down, so nothing starts out of place.
			const anchor = Math.min(vh / 2, centre + window.scrollY);
			const drift = layer.parallax ? Math.max(-layer.max, Math.min(layer.max, (anchor - centre) * -layer.parallax)) : 0;
			layer.offsetY = drift;
			const mx = pointer.px * layer.mouse;
			const my = pointer.py * layer.mouse;
			const tilt = layer.tilt ? ` rotateX(${(pointer.py * -10).toFixed(2)}deg) rotateY(${(pointer.px * 14).toFixed(2)}deg)` : '';
			layer.el.style.transform = `translate3d(${mx.toFixed(1)}px, ${(drift + my).toFixed(1)}px, 0)${tilt}`;
		}
	}

	if (progressBars.length) {
		const max = Math.max(1, document.documentElement.scrollHeight - vh);
		const pct = Math.min(100, (window.scrollY / max) * 100);
		for (const bar of progressBars) bar.style.width = `${pct}%`;
	}

	for (const timeline of timelines) {
		const fill = timeline.querySelector<HTMLElement>('.timeline-fill');
		if (!fill) continue;
		const rect = timeline.getBoundingClientRect();
		const pct = reduceMotion ? 100 : Math.max(8, Math.min(100, ((vh * 0.9 - rect.top) / (vh * 0.6)) * 100));
		fill.style.width = `${pct}%`;
	}
}

function queue() {
	if (queued) return;
	queued = true;
	requestAnimationFrame(frame);
}

window.addEventListener('scroll', queue, { passive: true });
window.addEventListener('resize', queue);
document.fonts?.ready.then(queue);
queue();

if (finePointer && !reduceMotion) {
	const x = document.createElement('div');
	const y = document.createElement('div');
	const chip = document.createElement('div');
	x.className = 'cursor-x';
	y.className = 'cursor-y';
	chip.className = 'cursor-chip';
	for (const el of [x, y, chip]) el.setAttribute('aria-hidden', 'true');
	document.body.append(x, y, chip);

	let cursorQueued = false;
	let target: EventTarget | null = null;

	const drawCursor = () => {
		cursorQueued = false;
		x.style.transform = `translate3d(0, ${pointer.y}px, 0)`;
		y.style.transform = `translate3d(${pointer.x}px, 0, 0)`;
		chip.style.transform = `translate3d(${pointer.x + 14}px, ${pointer.y + 14}px, 0)`;
		const labelled = target instanceof Element ? target.closest<HTMLElement>('[data-cursor-label]') : null;
		chip.classList.toggle('is-label', !!labelled);
		chip.textContent = labelled
			? (labelled.dataset.cursorLabel ?? '')
			: `x ${Math.round(pointer.x)} · y ${Math.round(pointer.y + window.scrollY)}`;
	};

	window.addEventListener(
		'pointermove',
		(event) => {
			if (event.pointerType !== 'mouse') return;
			pointer.x = event.clientX;
			pointer.y = event.clientY;
			pointer.px = event.clientX / window.innerWidth - 0.5;
			pointer.py = event.clientY / window.innerHeight - 0.5;
			target = event.target;
			document.body.classList.add('has-cursor');
			if (!cursorQueued) {
				cursorQueued = true;
				requestAnimationFrame(drawCursor);
			}
			queue();
		},
		{ passive: true },
	);
	document.documentElement.addEventListener('pointerleave', () => document.body.classList.remove('has-cursor'));

	for (const el of document.querySelectorAll<HTMLElement>('[data-magnetic]')) {
		el.addEventListener('pointermove', (event) => {
			const rect = el.getBoundingClientRect();
			const dx = ((event.clientX - rect.left) / rect.width - 0.5) * 16;
			const dy = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
			el.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
		});
		el.addEventListener('pointerleave', () => {
			el.style.transform = '';
		});
	}
}

// Highlight the "On this page" link for the section being read.
const tocLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-toc] a')];
if (tocLinks.length && 'IntersectionObserver' in window) {
	const byId = new Map(tocLinks.map((link) => [decodeURIComponent(link.hash.slice(1)), link]));
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				for (const link of tocLinks) link.classList.toggle('is-active', link === byId.get(entry.target.id));
			}
		},
		{ rootMargin: '-20% 0px -70% 0px' },
	);
	for (const id of byId.keys()) {
		const heading = document.getElementById(id);
		if (heading) observer.observe(heading);
	}
}
