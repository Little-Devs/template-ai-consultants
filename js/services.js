// Responsive Unsplash helper — smaller images on mobile
function _unsplashUrl(photoId, opts) {
  const w = window.innerWidth < 768 ? 800 : 1400;
  const q = opts?.q || 70;
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${w}&q=${q}`;
}

// Services-only: Lottie animations — lazy-loaded per slide
const _lottieRegistry = {
  'ADAPTIVE':     { containerId: 'service-adaptive-visualization', path: 'data/Loading Lottie animation.json', anim: null },
  'FOUNDATIONAL': { containerId: 'service-foundational-visualization', path: 'data/Arrow Down.json', anim: null },
  'APPLIED':      { containerId: 'service-applied-visualization', path: 'data/LZD TEch.json', anim: null },
  'COMPLIANT':    { containerId: 'service-compliant-visualization', path: 'data/Success (2).json', anim: null },
  'PROTECTED':    { containerId: 'service-protected-visualization', path: 'data/Authentication Lock Login.json', anim: null },
  'AUDITABLE':    { containerId: 'service-auditable-visualization', path: 'data/Document OCR Scan.json', anim: null },
};
let fallingMoneyAnim = null;

function _loadLottie(key) {
  const entry = _lottieRegistry[key];
  if (!entry || entry.anim) return entry?.anim || null;
  if (!window.lottie) return null;
  const container = document.getElementById(entry.containerId);
  if (!container) return null;
  entry.anim = lottie.loadAnimation({
    container,
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: entry.path,
  });
  // Foundational fallback: hide static fallback once animation data loads
  if (key === 'FOUNDATIONAL') {
    const fallback = document.getElementById('service-foundational-fallback');
    if (fallback) fallback.classList.remove('hidden');
    entry.anim.addEventListener('DOMLoaded', () => { if (fallback) fallback.classList.add('hidden'); });
    entry.anim.addEventListener('data_failed', () => { if (fallback) fallback.classList.remove('hidden'); });
  }
  return entry.anim;
}

function _getLottieAnim(key) {
  return _lottieRegistry[key]?.anim || null;
}

function ensureFallingMoneyAnimation() {
  if (fallingMoneyAnim || !window.lottie) return;
  const container = document.getElementById('falling-money-container');
  if (!container) return;
  fallingMoneyAnim = lottie.loadAnimation({
    container,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'data/Falling money.json',
  });
}

function triggerFallingMoney() {
  const container = document.getElementById('falling-money-container');
  const popup = document.getElementById('discount-popup');
  if (!container || !popup) return;

  container.classList.remove('hidden');
  popup.classList.remove('hidden');
  setTimeout(() => {
    popup.classList.remove('scale-90', 'opacity-0');
    popup.classList.add('scale-100', 'opacity-100');
  }, 50);

  ensureFallingMoneyAnimation();
  if (fallingMoneyAnim) {
    fallingMoneyAnim.goToAndPlay(0, true);
  }

  setTimeout(() => {
    popup.classList.add('scale-90', 'opacity-0');
    popup.classList.remove('scale-100', 'opacity-100');
    setTimeout(() => {
      popup.classList.add('hidden');
      container.classList.add('hidden');
    }, 500);
  }, 6000);
}

// Lottie animations are now lazy-loaded via _loadLottie() when each slide is shown.

// Flag: true during initial tab entrance animation so updateService() skips its own scramble
let _isInitialEntrance = false;


// --- About Page Data & Tabs ---
        const serviceData = [
	            {
	                id: '01',
	                name: 'Strategy',
	                headline: "'Lorem ipsum dolor.'",
	                posterNum: '+01',
	                category: 'Strategy',
	                suffix: 'STRATEGY',
	                deepLinkHref: 'ai-consulting.html',
	                deepLinkLabel: 'Strategy',
                image: _unsplashUrl('photo-1629946832022-c327f74956e0'),
                staticDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                slides: [
                    { title: 'LOREM', subtext: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', category: 'DISCOVERY' },
                    { title: 'IPSUM', subtext: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', category: 'ROADMAP' },
                    { title: 'DOLOR', subtext: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.', category: 'OUTCOMES' }
                ]
            },
		            {
		                id: '02',
		                name: 'Design',
		                headline: "'Sit amet consectetur.'",
		                posterNum: '+02',
		                category: 'Design',
		                suffix: 'DESIGN',
	                deepLinkHref: 'ai-development.html',
	                deepLinkLabel: 'Design',
	                image: _unsplashUrl('photo-1724525647065-f948fc102e68'),
	                staticDescription: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
	                slides: [
	                    { title: 'FORMA', subtext: 'Duis aute irure dolor in reprehenderit in voluptate velit.', category: 'SHAPE' },
                    { title: 'ORDO', subtext: 'Excepteur sint occaecat cupidatat non proident.', category: 'STRUCTURE' },
                    { title: 'LUX', subtext: 'Sunt in culpa qui officia deserunt mollit anim id est laborum.', category: 'FINISH' }
                ]
            },
	            {
	                id: '03',
	                name: 'Build',
	                headline: "'Exercitation ullamco.'",
	                posterNum: '+03',
	                category: 'Build',
	                suffix: 'BUILD',
	                deepLinkHref: 'ai-training.html',
	                deepLinkLabel: 'Build',
                image: _unsplashUrl('photo-1640906152676-dace6710d24b'),
                staticDescription: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                slides: [
                    { title: 'NEXUS', subtext: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', category: 'JOIN' },
                    { title: 'RATIO', subtext: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', category: 'SYSTEM' },
                    { title: 'VIA', subtext: 'Ut enim ad minim veniam, quis nostrud exercitation.', category: 'PATH' }
                ]
            },
	            {
	                id: '04',
	                name: 'Care',
	                headline: "'Cillum dolore esse.'",
	                posterNum: '+04',
	                category: 'Care',
	                suffix: 'CARE',
	                deepLinkHref: 'ai-governance.html',
	                deepLinkLabel: 'Care',
                image: _unsplashUrl('photo-1550745165-9bc0b252726f'),
                staticDescription: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                slides: [
                    { title: 'CURA', subtext: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', category: 'WATCH' },
                    { title: 'MENS', subtext: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', category: 'TUNE' },
                    { title: 'TUTUM', subtext: 'Ut enim ad minim veniam, quis nostrud exercitation.', category: 'GUARD' }
                ]
            }
        ];

        // Tree Data and Logic
        const technicalTreeData = {
            id: 'company',
            name: 'Company',
            children: [
                {
                    id: 'engineering',
                    name: 'App Development',
                    children: [
                        {
                            id: 'frontend',
                            name: 'Frontend',
                            children: [
                                { id: 'design-system', name: 'Design System', children: [{ id: 'components', name: 'Components' }, { id: 'tokens', name: 'Tokens' }, { id: 'guidelines', name: 'Guidelines' }] },
                                { id: 'web-platform', name: 'Web Platform' }
                            ]
                        },
                        { id: 'backend', name: 'Backend', children: [{ id: 'apis', name: 'APIs' }, { id: 'infrastructure', name: 'Infrastructure' }] },
                        { id: 'platform-team', name: 'Platform Team' }
                    ]
                },
                {
                    id: 'marketing',
                    name: 'Marketing',
                    children: [
                        { id: 'content', name: 'Content' },
                        { id: 'seo', name: 'SEO' }
                    ]
                },
                {
                    id: 'operations',
                    name: 'Operations',
                    children: [
                        { id: 'hr', name: 'Agreement' },
                        { 
                            id: 'finance', 
                            name: 'Earnings',
                            children: [
                                { id: 'discount-code', name: 'Discount Code' }
                            ]
                        }
                    ]
                }
            ]
        };

        let treeExpandedItems = { 'company': true };
        let treeSelectedItems = { 'company': true };

        const _icons = {
            'chevron-down': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',
            'chevron-right': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>',
            'folder': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>',
            'folder-open': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"></path></svg>',
            'file-text': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>',
        };

        function renderTreeItem(item, level = 0) {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = treeExpandedItems[item.id];
            const isSelected = treeSelectedItems[item.id];
            const indent = level * 16;

            const chevronIcon = hasChildren
                ? `<span class="tree-folder-icon">${isExpanded ? _icons['chevron-down'] : _icons['chevron-right']}</span>`
                : '<span class="w-3.5"></span>';
            const itemIcon = hasChildren
                ? (isExpanded ? _icons['folder-open'] : _icons['folder'])
                : _icons['file-text'];
            const itemIconClass = hasChildren ? 'text-neutral-500' : 'text-neutral-400';

            let html = `
                <div class="tree-item ${isSelected ? 'selected' : ''}" style="padding-left: ${indent + 8}px" onclick="toggleTreeItem('${item.id}', ${level === 1})">
                    ${chevronIcon}
                    <span class="w-3.5 h-3.5 ${itemIconClass}" style="display:inline-flex">${itemIcon}</span>
                    <span>${item.name}</span>
                </div>
            `;

            if (hasChildren) {
                html += `<div class="tree-children ${isExpanded ? 'expanded' : ''}">`;
                item.children.forEach(child => {
                    html += renderTreeItem(child, level + 1);
                });
                html += `</div>`;
            }

            return html;
        }

        function toggleTreeItem(id, isTopLevel) {
            // Trigger Easter Egg if discount code clicked
            if (id === 'discount-code') {
                triggerFallingMoney();
                return;
            }

            // Accordion behavior for top-level items
            if (isTopLevel && !treeExpandedItems[id]) {
                // Collapse all other top-level items
                technicalTreeData.children.forEach(child => {
                    if (child.id !== id) treeExpandedItems[child.id] = false;
                });
            }

            treeExpandedItems[id] = !treeExpandedItems[id];
            treeSelectedItems = { [id]: true };
            
            const root = document.getElementById('tree-root');
            root.innerHTML = renderTreeItem(technicalTreeData);
        }

let currentServiceIndex = 0;
let currentSlideIndex = 0;
let isInitialServicesLoad = true;
let _tabEntranceFallbackTimer = null;
let _tabEntranceCompleted = false;

        function cancelScrambleAnimation(element) {
            if (!element) return;
            if (element._scrambleInterval) {
                clearInterval(element._scrambleInterval);
                delete element._scrambleInterval;
            }
            if (element._scrambleRaf) {
                cancelAnimationFrame(element._scrambleRaf);
                element._scrambleRaf = null;
            }
        }

        function animateCharsText(element, targetText, options = {}) {
            if (!element) return;

            const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            if (element._scrambleInterval) {
                clearInterval(element._scrambleInterval);
                delete element._scrambleInterval;
            }

            const text = String(targetText ?? '');
            element.setAttribute('role', 'text');
            element.setAttribute('aria-label', text);

            const fragment = document.createDocumentFragment();
            const spans = [];

            const wrapWords = !!options.wrapWords;
            const containsNewlines = text.includes('\n');

            if (wrapWords && !containsNewlines) {
                const tokens = text.split(/(\s+)/);
                for (const token of tokens) {
                    if (!token) continue;
                    if (/^\s+$/.test(token)) {
                        fragment.appendChild(document.createTextNode(token));
                        continue;
                    }

                    const word = document.createElement('span');
                    word.setAttribute('aria-hidden', 'true');
                    word.style.display = 'inline-block';

                    for (const char of token) {
                        const span = document.createElement('span');
                        span.setAttribute('aria-hidden', 'true');
                        span.textContent = char;
                        span.style.display = 'inline-block';
                        word.appendChild(span);
                        spans.push(span);
                    }

                    fragment.appendChild(word);
                }
            } else {
                for (const char of text) {
                    if (char === '\n') {
                        fragment.appendChild(document.createElement('br'));
                        continue;
                    }
                    const span = document.createElement('span');
                    span.setAttribute('aria-hidden', 'true');
                    span.textContent = char === ' ' ? '\u00A0' : char;
                    span.style.display = 'inline-block';
                    fragment.appendChild(span);
                    spans.push(span);
                }
            }

            element.textContent = '';
            element.appendChild(fragment);

            if (prefersReducedMotion || typeof gsap === 'undefined') return;

            const duration = options.duration ?? 1.0;
            const y = options.y ?? 18;
            const ease = options.ease ?? 'power3.out';
            const len = Math.max(1, spans.length);
            const staggerEach = options.staggerEach ?? Math.min(0.06, Math.max(0.02, 2.4 / len));

            gsap.killTweensOf(spans);
            gsap.set(spans, { opacity: 0, y, filter: 'blur(6px)' });
            gsap.to(spans, {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration,
                stagger: { each: staggerEach },
                ease
            });
        }

        function scrambleText(element, targetText, durationOrOptions = 1.0) {
            const options = typeof durationOrOptions === 'number'
                ? { duration: durationOrOptions }
                : (durationOrOptions || {});
            const duration = options.duration ?? 1.0;
            const frameInterval = options.frameInterval ?? 30;
            const chars = options.chars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
            const originalText = element.getAttribute('data-original') || targetText;
            const originalChars = Array.from(originalText);
            const charsLength = chars.length;

            function buildScrambledText(revealedCount) {
                let output = '';
                for (let i = 0; i < originalChars.length; i += 1) {
                    const char = originalChars[i];
                    if (i < revealedCount || char === ' ') {
                        output += char;
                    } else {
                        output += chars[Math.floor(Math.random() * charsLength)];
                    }
                }
                return output;
            }

            // Cancel any in-progress scramble on this element
            cancelScrambleAnimation(element);

            // For service-headline: one read pass then one write pass to lock height
            if (element.id === 'service-headline') {
                const prevMinH = element.style.minHeight || '';
                const prevH = element.style.height || '';

                // --- Single read pass ---
                element.style.minHeight = '';
                element.style.height = 'auto';
                element.textContent = originalText;
                const measuredHeight = element.offsetHeight;
                const cs = window.getComputedStyle(element);
                let lineHeight = parseFloat(cs.lineHeight);
                if (!lineHeight || isNaN(lineHeight)) {
                    lineHeight = (parseFloat(cs.fontSize) || 24) * 1.2;
                }

                // --- Single write pass ---
                const isMobile = window.innerWidth < 768;
                const buffer = lineHeight * (isMobile ? 0.5 : 0.25);
                const lockedHeight = Math.ceil(measuredHeight + Math.max(buffer, 8));
                element.style.minHeight = lockedHeight + 'px';
                element.style.height = 'auto';
                element._savedMinH = prevMinH;
                element._savedH = prevH;

                // Initialize with scrambled text
                element.textContent = buildScrambledText(0);
            }

            // rAF-based animation loop (replaces setInterval)
            const step = originalChars.length / Math.max(duration * 60, 1); // ~60fps target
            let iteration = 0;
            let lastTime = 0;

            function tick(now) {
                // Throttle to ~30fps to match original visual timing
                if (now - lastTime < frameInterval) {
                    element._scrambleRaf = requestAnimationFrame(tick);
                    return;
                }
                lastTime = now;

                element.textContent = buildScrambledText(iteration);

                iteration += step;

                if (iteration >= originalChars.length) {
                    element.textContent = originalText;
                    element._scrambleRaf = null;
                    // Reset height lock after settling
                    if (element.id === 'service-headline') {
                        setTimeout(() => {
                            requestAnimationFrame(() => {
                                element.style.minHeight = element._savedMinH || '';
                                element.style.height = element._savedH || '';
                                delete element._savedMinH;
                                delete element._savedH;
                            });
                        }, 100);
                    }
                    return;
                }
                element._scrambleRaf = requestAnimationFrame(tick);
            }
            element._scrambleRaf = requestAnimationFrame(tick);
        }

        function triggerServiceCopyGlitch(tab, options = {}) {
            if (!tab) return;

            const prefersReducedMotion = window.matchMedia &&
                window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) return;

            const delay = Number(options.delay) || 0;

            if (tab._serviceCopyGlitchDelayTimer) {
                clearTimeout(tab._serviceCopyGlitchDelayTimer);
                tab._serviceCopyGlitchDelayTimer = null;
            }
            if (tab._serviceCopyGlitchTimer) clearTimeout(tab._serviceCopyGlitchTimer);

            const playGlitch = () => {
                tab.classList.remove('is-copy-glitching');
                void tab.offsetWidth;
                tab.classList.add('is-copy-glitching');

                // Explicitly restart the native CSS glitch. This makes click replay it
                // even when the pointer is still hovering and the same animation rule
                // was already active.
                tab.querySelectorAll('.service-buyer-question, .service-buyer-explanation').forEach((element) => {
                    element.getAnimations().forEach((animation) => {
                        if (animation.animationName !== 'service-copy-glitch') return;
                        animation.cancel();
                        animation.play();
                    });
                });

                tab._serviceCopyGlitchTimer = setTimeout(() => {
                    tab.classList.remove('is-copy-glitching');
                    tab._serviceCopyGlitchTimer = null;
                }, 560);
            };

            if (delay > 0) {
                tab._serviceCopyGlitchDelayTimer = setTimeout(() => {
                    tab._serviceCopyGlitchDelayTimer = null;
                    playGlitch();
                }, delay);
                return;
            }

            playGlitch();
        }

        function animateText(elementId, text, isHeadline = false) {
            const el = document.getElementById(elementId);
            if (!el) return;
            
            if (isHeadline && elementId === 'service-headline') {
                if (!el.classList.contains('melt-headline')) {
                    el.classList.add('melt-headline');
                }

                el.style.fontSize = '';
                
                const isMobile = window.innerWidth < 768;
                animateCharsText(el, text, { duration: 1.1, wrapWords: isMobile });
            } else if (isHeadline) {
                // Simple reveal for other headlines
                el.innerText = text;
                el.classList.remove('reveal-text');
                void el.offsetWidth; // trigger reflow
                el.classList.add('reveal-text');
            } else {
                // Keep slide titles simple but matching aesthetic
                el.innerHTML = `<span class="text-3xl md:text-4xl reveal-text">${text}</span>`;
            }
        }

			        let slideTransitionToken = 0;
			        function updateSlideContent(isServiceChange = false) {
			            const data = serviceData[currentServiceIndex];
			            const slide = data.slides[currentSlideIndex];
			            const servicesPageEl = document.getElementById('services-page');
			            const indicatorEl = document.getElementById('slide-indicator');
			            const carouselControlsEl = document.getElementById('service-carousel-controls');
			            const transitionToken = ++slideTransitionToken;
				            const isInitialRender = isInitialServicesLoad;
				            const fadeOutMs = isInitialRender ? 0 : 320; // matches Tailwind duration-300 with a small buffer
				            const fadeInMs = isInitialRender ? 0 : 300;
			            
			            if (indicatorEl) indicatorEl.innerText = `${currentSlideIndex + 1}/${data.slides.length}`;

		            if (carouselControlsEl) {
		                const buttons = carouselControlsEl.querySelectorAll('button');
		                buttons.forEach((button) => {
		                    button.disabled = true;
		                    button.setAttribute('aria-disabled', 'true');
		                });
		            }
		            
		            // Elements to fade
	            const titleEl = document.getElementById('service-poster-title');
	            const nodeViz = document.getElementById('service-node-visualization');
	            const starViz = document.getElementById('service-star-visualization');
            const intelligentViz = document.getElementById('service-intelligent-visualization');
            const strategicViz = document.getElementById('service-strategic-visualization');
            const pragmaticViz = document.getElementById('service-pragmatic-visualization');
            const adaptiveViz = document.getElementById('service-adaptive-visualization');
            const foundationalViz = document.getElementById('service-foundational-visualization');
            const appliedViz = document.getElementById('service-applied-visualization');
            const technicalViz = document.getElementById('service-technical-visualization');
            const compliantViz = document.getElementById('service-compliant-visualization');
            const protectedViz = document.getElementById('service-protected-visualization');
            const auditableViz = document.getElementById('service-auditable-visualization');
            const subtextContainer = document.getElementById('service-left-subtext-container');
            const subtextEl = document.getElementById('service-left-subtext');
            const categoryEl = document.getElementById('service-category');
            const mainTitleEl = document.getElementById('service-main-title');
            const detailsEl = document.getElementById('service-right-details');
            const centralContentEl = document.getElementById('service-card-central-content');
            
	            if (fadeOutMs) {
	                // Fade out
	                if (titleEl) titleEl.style.opacity = '0';
	                if (nodeViz) nodeViz.style.opacity = '0';
	                if (starViz) starViz.style.opacity = '0';
	                if (intelligentViz) intelligentViz.style.opacity = '0';
	                if (strategicViz) strategicViz.style.opacity = '0';
	                if (pragmaticViz) pragmaticViz.style.opacity = '0';
	                if (adaptiveViz) adaptiveViz.style.opacity = '0';
	                if (foundationalViz) foundationalViz.style.opacity = '0';
	                if (appliedViz) appliedViz.style.opacity = '0';
	                if (technicalViz) technicalViz.style.opacity = '0';
	                if (compliantViz) compliantViz.style.opacity = '0';
	                if (protectedViz) protectedViz.style.opacity = '0';
	                if (auditableViz) auditableViz.style.opacity = '0';
	                if (subtextContainer) subtextContainer.style.opacity = '0';
	            }

		            const applySlideUpdate = () => {
		                if (transitionToken !== slideTransitionToken) return;
		                
		                if (servicesPageEl) {
		                    servicesPageEl.dataset.activeService = data.name;
	                    servicesPageEl.dataset.activeSlide = slide.title;
	                }
	                
	                // Update title
	                animateText('service-poster-title', slide.title);
	                if (categoryEl) categoryEl.innerText = slide.category;
                
                // Show/hide node visualization for SECURE slide
                if (nodeViz) {
                    const nodeInner = nodeViz.querySelector('div');
                    if (slide.title === 'SECURE') {
                        nodeViz.classList.remove('hidden');
                        if (nodeInner) {
                            nodeInner.classList.remove('w-28', 'h-28');
                            nodeInner.classList.add('w-36', 'h-36');
                        }
                    } else {
                        nodeViz.classList.add('hidden');
                        if (nodeInner) {
                            nodeInner.classList.add('w-28', 'h-28');
                            nodeInner.classList.remove('w-36', 'h-36', 'w-44', 'h-44');
                        }
                    }
                }
                
                // Show/hide star visualization for BEAUTIFUL slide
                if (starViz) {
                    const starContainer = starViz.querySelector('.clipped-star-container');
                    if (slide.title === 'BEAUTIFUL' && data.name === 'Development') {
                        starViz.classList.remove('hidden');
                        if (starContainer) starContainer.classList.remove('expanded');
                    } else {
                        starViz.classList.add('hidden');
                        if (starContainer) starContainer.classList.remove('expanded');
                    }
                }

                // Show/hide node visualization for INTELLIGENT slide
                if (intelligentViz) {
                    if (slide.title === 'INTELLIGENT' && data.name === 'Development') {
                        intelligentViz.classList.remove('hidden');
                    } else {
                        intelligentViz.classList.add('hidden');
                    }
                }

                // Show/hide strategic graph for STRATEGIC slide (Consulting)
                if (strategicViz) {
                    if (slide.title === 'STRATEGIC' && data.name === 'Consulting') {
                        strategicViz.classList.remove('hidden');
                        const progressCircles = strategicViz.querySelectorAll('.progress-circle');
                        progressCircles.forEach((circle) => {
                            circle.style.animation = 'none';
                            circle.getBoundingClientRect();
                            circle.style.animation = '';
                        });
                    } else {
                        strategicViz.classList.add('hidden');
                    }
                }

                // Show/hide pragmatic timeline for PRAGMATIC slide (Consulting)
                if (pragmaticViz) {
                    if (slide.title === 'PRAGMATIC' && data.name === 'Consulting') {
                        pragmaticViz.classList.remove('hidden');
                        const timeline = pragmaticViz.querySelector('.pragmatic-timeline');
                        if (timeline) {
                            timeline.classList.remove('is-animating');
                            timeline.getBoundingClientRect();
                            timeline.classList.add('is-animating');
                        }
                    } else {
                        pragmaticViz.classList.add('hidden');
                    }
                }

                function showLottie(viz, key) {
                    viz.classList.remove('hidden');
                    const anim = _loadLottie(key);
                    if (anim) requestAnimationFrame(() => { anim.resize(); anim.goToAndPlay(0, true); });
                }

                // Show/hide adaptive Lottie for ADAPTIVE slide (Consulting)
                if (adaptiveViz) {
                    if (slide.title === 'ADAPTIVE' && data.name === 'Consulting') {
                        showLottie(adaptiveViz, 'ADAPTIVE');
                    } else {
                        adaptiveViz.classList.add('hidden');
                        const a = _getLottieAnim('ADAPTIVE'); if (a) a.stop();
                    }
                }

                // Show/hide foundational Lottie for FOUNDATIONAL slide (Training)
                if (foundationalViz) {
                    if (slide.title === 'MAP' && data.name === 'Strategy') {
                        showLottie(foundationalViz, 'FOUNDATIONAL');
                    } else {
                        foundationalViz.classList.add('hidden');
                        const a = _getLottieAnim('FOUNDATIONAL'); if (a) a.stop();
                    }
                }

                // Show/hide applied Lottie for APPLIED slide (Training)
                if (appliedViz) {
                    if (slide.title === 'SEQUENCE' && data.name === 'Strategy') {
                        showLottie(appliedViz, 'APPLIED');
                    } else {
                        appliedViz.classList.add('hidden');
                        const a = _getLottieAnim('APPLIED'); if (a) a.stop();
                    }
                }

                // Show/hide technical Tree for TECHNICAL slide (Training)
                if (technicalViz) {
                    if (slide.title === 'MEASURE' && data.name === 'Strategy') {
                        technicalViz.classList.remove('hidden');
                        treeExpandedItems = { 'company': true };
                        treeSelectedItems = { 'company': true };
                        const root = document.getElementById('tree-root');
                        if (root) {
                            root.innerHTML = renderTreeItem(technicalTreeData);
                        }
                    } else {
                        technicalViz.classList.add('hidden');
                    }
                }

                // Show/hide compliant Lottie for COMPLIANT slide (Governance)
                if (compliantViz) {
                    if (slide.title === 'COMPLIANT' && data.name === 'Governance') {
                        showLottie(compliantViz, 'COMPLIANT');
                    } else {
                        compliantViz.classList.add('hidden');
                        const a = _getLottieAnim('COMPLIANT'); if (a) a.stop();
                    }
                }

                // Show/hide protected Lottie for PROTECTED slide (Governance)
                if (protectedViz) {
                    if (slide.title === 'PROTECTED' && data.name === 'Governance') {
                        showLottie(protectedViz, 'PROTECTED');
                    } else {
                        protectedViz.classList.add('hidden');
                        const a = _getLottieAnim('PROTECTED'); if (a) a.stop();
                    }
                }

                // Show/hide auditable Lottie for AUDITABLE slide (Governance)
                if (auditableViz) {
                    if (slide.title === 'AUDITABLE' && data.name === 'Governance') {
                        showLottie(auditableViz, 'AUDITABLE');
                    } else {
                        auditableViz.classList.add('hidden');
                        const a = _getLottieAnim('AUDITABLE'); if (a) a.stop();
                    }
                }

                // Update subtext
                if (subtextContainer && subtextEl) {
                    subtextContainer.classList.remove('hidden', 'mb-8');
                    subtextEl.innerText = slide.subtext;

                    subtextContainer.classList.remove('mt-2', 'mt-4', 'mt-6', 'mt-7', 'mt-8');
                    subtextContainer.classList.add('mt-4');

                    subtextEl.classList.remove('translate-y-2', 'translate-y-4', 'translate-y-6', 'translate-y-8');
                    subtextEl.classList.remove('-top-6', '-top-10', 'top-0', '-top-2', 'top-[4.5rem]', 'top-2', 'top-8', 'top-20', 'top-10', 'top-12', 'top-14', 'top-18', 'top-24', 'top-[4.75rem]');
                    subtextEl.classList.add('top-0');


                    if (centralContentEl) centralContentEl.classList.remove('-translate-y-4');
                }
                
	                // Fade in
		                requestAnimationFrame(() => {
	                    if (transitionToken !== slideTransitionToken) return;
	                    if (titleEl) titleEl.style.opacity = '1';
	                    if (nodeViz && !nodeViz.classList.contains('hidden')) nodeViz.style.opacity = '1';
	                    if (starViz && !starViz.classList.contains('hidden')) starViz.style.opacity = '1';
	                    if (intelligentViz && !intelligentViz.classList.contains('hidden')) intelligentViz.style.opacity = '1';
	                    if (strategicViz && !strategicViz.classList.contains('hidden')) strategicViz.style.opacity = '1';
                    if (pragmaticViz && !pragmaticViz.classList.contains('hidden')) pragmaticViz.style.opacity = '1';
                    if (adaptiveViz && !adaptiveViz.classList.contains('hidden')) adaptiveViz.style.opacity = '1';
                    if (foundationalViz && !foundationalViz.classList.contains('hidden')) foundationalViz.style.opacity = '1';
                    if (appliedViz && !appliedViz.classList.contains('hidden')) appliedViz.style.opacity = '1';
                    if (technicalViz && !technicalViz.classList.contains('hidden')) technicalViz.style.opacity = '1';
	                    if (compliantViz && !compliantViz.classList.contains('hidden')) compliantViz.style.opacity = '1';
	                    if (protectedViz && !protectedViz.classList.contains('hidden')) protectedViz.style.opacity = '1';
	                    if (auditableViz && !auditableViz.classList.contains('hidden')) auditableViz.style.opacity = '1';
	                    if (subtextContainer) subtextContainer.style.opacity = '1';
	                    
		                    if (carouselControlsEl) {
		                        const buttons = carouselControlsEl.querySelectorAll('button');
		                        setTimeout(() => {
		                            if (transitionToken !== slideTransitionToken) return;
		                            buttons.forEach((button) => {
		                                button.disabled = false;
		                                button.removeAttribute('aria-disabled');
		                            });
		                        }, fadeInMs);
		                    }
		                });
		            };
		            
		            // Update content after fade out (avoid layout shifts mid-fade)
		            if (fadeOutMs) setTimeout(applySlideUpdate, fadeOutMs);
		            else applySlideUpdate();
	            
	            // Update Right Side (Static - doesn't change with carousel)
	            const rightContent = document.getElementById('service-right-content');
	            
	            if (isServiceChange && rightContent && !isInitialRender) {
	                if (window.gsap) {
	                    gsap.to(rightContent, {
	                        opacity: 0,
	                        x: 20,
                        duration: 0.18,
                        ease: "power2.out",
                        onComplete: () => {
	                            if (mainTitleEl) mainTitleEl.innerHTML = data.suffix;
	                            if (detailsEl) {
	                                const deepLinkHtml = (data.deepLinkHref)
	                                  ? `
	                                        <div class="mt-8">
	                                            <a href="${data.deepLinkHref}" class="inline-flex items-center justify-center gap-2 rounded-full bg-sepia text-paper px-6 py-3 text-sm font-semibold tracking-[0.08em] shadow-lg hover:bg-ink transition-colors">
	                                                Watch Video <span aria-hidden="true">→</span>
	                                            </a>
	                                        </div>
	                                    `
	                                  : '';
	                                detailsEl.innerHTML = `
	                                    <div>
	                                        <p class="text-[10px] font-bold text-neutral-500 uppercase mb-2 tracking-wide">Services Offered</p>
	                                        <p class="text-ink text-lg leading-relaxed font-open-sans">${data.staticDescription}</p>
	                                        ${deepLinkHtml}
	                                    </div>
	                                `;
	                            }
                            gsap.fromTo(rightContent, 
                                { opacity: 0, x: -20 },
                                { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", delay: 0.1 }
                            );
                        }
                    });
                } else {
                    // Fallback if GSAP not loaded yet
	                    if (mainTitleEl) mainTitleEl.innerHTML = data.suffix;
	                    if (detailsEl) {
	                        const deepLinkHtml = (data.deepLinkHref)
	                          ? `
	                                <div class="mt-8">
	                                    <a href="${data.deepLinkHref}" class="inline-flex items-center justify-center gap-2 rounded-full bg-sepia text-paper px-6 py-3 text-sm font-semibold tracking-[0.08em] shadow-lg hover:bg-ink transition-colors">
	                                        Watch Video <span aria-hidden="true">→</span>
	                                    </a>
	                                </div>
	                            `
	                          : '';
	                        detailsEl.innerHTML = `
	                            <div>
	                                <p class="text-[10px] font-bold text-neutral-500 uppercase mb-2 tracking-wide">Services Offered</p>
	                                <p class="text-ink text-lg leading-relaxed font-open-sans">${data.staticDescription}</p>
	                                ${deepLinkHtml}
	                            </div>
	                        `;
	                    }
	                }
	            } else {
	                if (mainTitleEl) mainTitleEl.innerHTML = data.suffix;
	                if (detailsEl) {
	                    const deepLinkHtml = (data.deepLinkHref)
	                      ? `
	                            <div class="mt-8">
	                                <a href="${data.deepLinkHref}" class="inline-flex items-center justify-center gap-2 rounded-full bg-sepia text-paper px-6 py-3 text-sm font-semibold tracking-[0.08em] shadow-lg hover:bg-ink transition-colors">
	                                    Watch Video <span aria-hidden="true">→</span>
	                                </a>
	                            </div>
	                        `
	                      : '';
	                    detailsEl.innerHTML = `
	                        <div>
	                            <p class="text-[10px] font-bold text-neutral-500 uppercase mb-2 tracking-wide">Services Offered</p>
	                            <p class="text-ink text-lg leading-relaxed font-open-sans">${data.staticDescription}</p>
	                            ${deepLinkHtml}
	                        </div>
		                    `;
		                }
		            }
		            
		            if (isInitialRender) isInitialServicesLoad = false;
		        }

        function updateService(index, options = {}) {
            currentServiceIndex = index;
            currentSlideIndex = 0; // Reset slide index when changing service
            const data = serviceData[index];
            const bg = document.getElementById('service-bg');
            const headline = document.getElementById('service-headline');

            // Swap background without flashing blank while the next image downloads.
            if (bg && data?.image) {
                const currentUrl = bg.dataset.image
                  || (bg.style.backgroundImage.match(/url\\(['"]?(.*?)['"]?\\)/) || [])[1]
                  || '';

                if (currentUrl !== data.image) {
                    const img = new Image();
                    img.decoding = 'async';
                    img.onload = () => {
                        bg.classList.add('opacity-0');
                        bg.classList.remove('opacity-70');
                        setTimeout(() => {
                            bg.style.backgroundImage = `url('${data.image}')`;
                            bg.dataset.image = data.image;
                            requestAnimationFrame(() => {
                                bg.classList.remove('opacity-0');
                                bg.classList.add('opacity-70');
                            });
                        }, 80);
                    };
                    img.onerror = () => {
                        bg.style.backgroundImage = `url('${data.image}')`;
                        bg.dataset.image = data.image;
                        bg.classList.add('opacity-70');
                        bg.classList.remove('opacity-0');
                    };
                    img.src = data.image;
                }
            }

            // Animate headline change with character-by-character animation
            animateText('service-headline', data.headline, true);
            
            // Update archival number and protocol label
            const archivalNum = document.getElementById('service-archival-num');
            if (archivalNum) {
                archivalNum.innerText = `// ${(index + 1).toString().padStart(2, '0')}`;
            }
            
            const protocolLabel = document.getElementById('service-protocol-label');
            if (protocolLabel) {
                protocolLabel.innerText = 'Services';
            }

            document.getElementById('service-poster-num').innerText = data.posterNum;
            
            updateSlideContent(true);
            
            const tabs = document.querySelectorAll('.service-tab');
            tabs.forEach((tab, i) => {
                const isActive = i === index;
                const label = tab.querySelector('.tab-label');
                const num = tab.querySelector('.tab-num');
                tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
                tab.setAttribute('aria-expanded', isActive ? 'true' : 'false');
                tab.setAttribute('tabindex', isActive ? '0' : '-1');
                if (isActive) {
                    tab.classList.add('active');
                    if (label) {
                        // Ensure the active tab label stays visually "selected" even after scramble animation
                        label.classList.add('text-ink', 'font-bold');
                        label.classList.remove('text-neutral-400', 'font-normal', 'font-medium', 'font-semibold');
                        if (!_isInitialEntrance) scrambleText(label, label.innerText, 0.55);
                    }
                    if (!_isInitialEntrance) {
                        // On mobile, wait for the accordion reveal so the glitch does
                        // not run invisibly while the copy is still height: 0 / opacity: 0.
                        triggerServiceCopyGlitch(tab, {
                            delay: window.innerWidth < 768 ? 180 : 60
                        });
                    }
                    if (num) {
                        num.classList.add('text-neutral-500');
                        num.classList.remove('text-neutral-300', 'text-neutral-400');
                    }
                } else {
                    if (tab._serviceCopyGlitchDelayTimer) {
                        clearTimeout(tab._serviceCopyGlitchDelayTimer);
                        tab._serviceCopyGlitchDelayTimer = null;
                    }
                    if (tab._serviceCopyGlitchTimer) {
                        clearTimeout(tab._serviceCopyGlitchTimer);
                        tab._serviceCopyGlitchTimer = null;
                    }
                    tab.classList.remove('is-copy-glitching');
                    tab.classList.remove('active');
                    if (label) {
                        label.classList.add('text-neutral-400');
                        label.classList.remove('text-ink', 'font-bold');
                        // keep hover utility (group-hover:text-ink) working; default to normal weight
                        if (!label.classList.contains('font-normal')) label.classList.add('font-normal');
                    }
                    if (num) {
                        num.classList.add('text-neutral-300');
                        num.classList.remove('text-neutral-400', 'text-neutral-500');
                    }
                }
            });

            const detailPanel = document.getElementById('service-detail-panel');
            if (detailPanel) detailPanel.setAttribute('aria-labelledby', `service-tab-${index}`);

            if (options.syncUrl !== false && window.history?.replaceState) {
                const url = new URL(window.location.href);
                url.searchParams.set('service', data.name.toLowerCase());
                history.replaceState({ service: data.name.toLowerCase() }, '', `${url.pathname}${url.search}${url.hash}`);
            }

            // Sync background height after content updates
            setTimeout(syncServicesBackgroundHeight, 300);
        }

        function nextSlide() {
            const data = serviceData[currentServiceIndex];
            currentSlideIndex = (currentSlideIndex + 1) % data.slides.length;
            updateSlideContent();
        }

        function prevSlide() {
            const data = serviceData[currentServiceIndex];
            currentSlideIndex = (currentSlideIndex - 1 + data.slides.length) % data.slides.length;
            updateSlideContent();
        }

        function toggleStarExpansion(element) {
            element.classList.toggle('expanded');
        }

        const serviceTabs = Array.from(document.querySelectorAll('.service-tab-item'));
        serviceTabs.forEach((tab, tabIndex) => {
            const label = tab.querySelector('.tab-label');

            if (label) {
                tab.addEventListener('mouseenter', () => {
                    // Only scramble if it's not the active tab (since active already scrambles on click)
                    if (!tab.classList.contains('active')) {
                        scrambleText(label, label.innerText, 0.55);
                    }
                    triggerServiceCopyGlitch(tab);
                });
            }

            tab.addEventListener('keydown', (event) => {
                const lastIndex = serviceTabs.length - 1;
                let nextIndex = null;

                if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = tabIndex === lastIndex ? 0 : tabIndex + 1;
                if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = tabIndex === 0 ? lastIndex : tabIndex - 1;
                if (event.key === 'Home') nextIndex = 0;
                if (event.key === 'End') nextIndex = lastIndex;
                if (nextIndex === null) return;

                event.preventDefault();
                serviceTabs[nextIndex].focus();
                updateService(nextIndex);
            });
        });

        // Deferred to DOMContentLoaded — see bottom of file

        const ZI_NO_CLIP = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
        const ZI_BOTTOM_RIGHT_CLIP = 'polygon(0 0, 100% 0, 0 0, 0 100%)';
        const ZI_TOP_RIGHT_CLIP = 'polygon(0 0, 0 100%, 100% 100%, 0 100%)';
        const ZI_BOTTOM_LEFT_CLIP = 'polygon(100% 100%, 100% 0, 100% 100%, 0 100%)';
        const ZI_TOP_LEFT_CLIP = 'polygon(0 0, 100% 0, 100% 100%, 100% 0)';

        const ZI_ENTRANCE_KEYFRAMES = {
            left: [ZI_BOTTOM_RIGHT_CLIP, ZI_NO_CLIP],
            bottom: [ZI_BOTTOM_RIGHT_CLIP, ZI_NO_CLIP],
            top: [ZI_BOTTOM_RIGHT_CLIP, ZI_NO_CLIP],
            right: [ZI_TOP_LEFT_CLIP, ZI_NO_CLIP],
        };

        const ZI_EXIT_KEYFRAMES = {
            left: [ZI_NO_CLIP, ZI_TOP_RIGHT_CLIP],
            bottom: [ZI_NO_CLIP, ZI_TOP_RIGHT_CLIP],
            top: [ZI_NO_CLIP, ZI_TOP_RIGHT_CLIP],
            right: [ZI_NO_CLIP, ZI_BOTTOM_LEFT_CLIP],
        };
        const ZI_ENTER_OPTIONS = {
            duration: 460,
            easing: 'cubic-bezier(0.22,1,0.36,1)',
            fill: 'forwards',
        };
        const ZI_EXIT_OPTIONS = {
            duration: 320,
            easing: 'cubic-bezier(0.55,0,0.45,1)',
            fill: 'forwards',
        };

        function getIntegrationsNearestSide(card, event) {
            const box = card.getBoundingClientRect();
            const clientX = typeof event?.clientX === 'number' ? event.clientX : (box.left + box.right) / 2;
            const clientY = typeof event?.clientY === 'number' ? event.clientY : (box.top + box.bottom) / 2;

            return [
                { side: 'left', proximity: Math.abs(box.left - clientX) },
                { side: 'right', proximity: Math.abs(box.right - clientX) },
                { side: 'top', proximity: Math.abs(box.top - clientY) },
                { side: 'bottom', proximity: Math.abs(box.bottom - clientY) },
            ].sort((a, b) => a.proximity - b.proximity)[0].side;
        }

        function initIntegrationsShowcase() {
            const cards = Array.from(document.querySelectorAll('[data-zi-card]'));
            if (!cards.length) return;

            const prefersReducedMotion = window.matchMedia &&
                window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const touchMode = window.matchMedia &&
                window.matchMedia('(hover: none), (pointer: coarse)').matches;
            const supportsClipPath = window.CSS &&
                typeof window.CSS.supports === 'function' &&
                (window.CSS.supports('clip-path', ZI_NO_CLIP) ||
                 window.CSS.supports('-webkit-clip-path', ZI_NO_CLIP));

            let activeTouchCard = null;

            function updateExpandedState(card, isExpanded) {
                card.classList.toggle('is-expanded', isExpanded);
                card.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
            }

            function setOverlayClip(overlay, clipPath) {
                overlay.style.clipPath = clipPath;
                overlay.style.webkitClipPath = clipPath;
            }

            function setOverlayState(overlay, { opacity, clipPath }) {
                if (typeof opacity !== 'undefined') {
                    overlay.style.opacity = opacity;
                }
                if (clipPath) {
                    setOverlayClip(overlay, clipPath);
                }
            }

            function stopOverlayAnimations(overlay) {
                overlay.getAnimations().forEach((animation) => animation.cancel());
            }

            function animateOverlay(overlay, keyframes, options) {
                stopOverlayAnimations(overlay);
                return overlay.animate(
                    keyframes.map((clipPath) => ({
                        clipPath,
                        webkitClipPath: clipPath,
                    })),
                    options
                );
            }

            function revealCard(card, side) {
                const overlay = card.querySelector('.zi-card__overlay');
                if (!overlay) return;

                card.classList.add('is-revealed');

                if (prefersReducedMotion || !supportsClipPath) {
                    setOverlayState(overlay, { opacity: '1', clipPath: ZI_NO_CLIP });
                    return;
                }

                const keyframes = ZI_ENTRANCE_KEYFRAMES[side] || ZI_ENTRANCE_KEYFRAMES.left;
                setOverlayState(overlay, { opacity: '1', clipPath: keyframes[0] });

                const animation = animateOverlay(overlay, keyframes, ZI_ENTER_OPTIONS);
                animation.onfinish = () => {
                    setOverlayState(overlay, { opacity: '1', clipPath: ZI_NO_CLIP });
                };
            }

            function hideCard(card, side) {
                const overlay = card.querySelector('.zi-card__overlay');
                if (!overlay || card.classList.contains('is-expanded')) return;

                card.classList.remove('is-revealed');

                if (prefersReducedMotion || !supportsClipPath) {
                    setOverlayState(overlay, { opacity: '0', clipPath: ZI_BOTTOM_RIGHT_CLIP });
                    return;
                }

                const keyframes = ZI_EXIT_KEYFRAMES[side] || ZI_EXIT_KEYFRAMES.right;
                setOverlayState(overlay, { opacity: '1', clipPath: keyframes[0] });

                const animation = animateOverlay(overlay, keyframes, ZI_EXIT_OPTIONS);
                animation.onfinish = () => {
                    if (!card.classList.contains('is-revealed') && !card.classList.contains('is-expanded')) {
                        setOverlayState(overlay, { opacity: '0', clipPath: keyframes[1] });
                    }
                };
            }

            function collapseTouchCards(exceptCard = null) {
                cards.forEach((card) => {
                    if (card === exceptCard) return;
                    updateExpandedState(card, false);
                    card.classList.remove('is-revealed');
                    const overlay = card.querySelector('.zi-card__overlay');
                    if (overlay) {
                        stopOverlayAnimations(overlay);
                        setOverlayState(overlay, { opacity: '0', clipPath: ZI_BOTTOM_RIGHT_CLIP });
                    }
                });

                activeTouchCard = exceptCard || null;
            }

            cards.forEach((card) => {
                const overlay = card.querySelector('.zi-card__overlay');
                if (overlay) {
                    setOverlayState(overlay, { opacity: '0', clipPath: ZI_BOTTOM_RIGHT_CLIP });
                }

                if (!touchMode) {
                    card.addEventListener('mouseenter', (event) => {
                        revealCard(card, getIntegrationsNearestSide(card, event));
                    });

                    card.addEventListener('mouseleave', (event) => {
                        if (document.activeElement === card) return;
                        hideCard(card, getIntegrationsNearestSide(card, event));
                    });
                }

                card.addEventListener('focus', () => {
                    revealCard(card, 'left');
                });

                card.addEventListener('blur', () => {
                    if (!card.classList.contains('is-expanded')) {
                        hideCard(card, 'right');
                    }
                });

                card.addEventListener('click', (event) => {
                    if (!touchMode) return;

                    event.preventDefault();
                    const nextExpanded = !card.classList.contains('is-expanded');
                    collapseTouchCards(nextExpanded ? card : null);
                    updateExpandedState(card, nextExpanded);

                    if (nextExpanded) {
                        card.classList.add('is-revealed');
                        if (overlay) {
                            stopOverlayAnimations(overlay);
                            setOverlayState(overlay, { opacity: '1', clipPath: ZI_NO_CLIP });
                        }
                        activeTouchCard = card;
                    } else if (overlay) {
                        setOverlayState(overlay, { opacity: '0', clipPath: ZI_BOTTOM_RIGHT_CLIP });
                    }
                });
            });

            if (touchMode) {
                document.addEventListener('click', (event) => {
                    if (event.target.closest('[data-zi-card]')) return;
                    collapseTouchCards();
                });

                document.addEventListener('keydown', (event) => {
                    if (event.key !== 'Escape' || !activeTouchCard) return;
                    collapseTouchCards();
                });
            }
        }

        // Sync services background height — coalesced via rAF scheduler
        let _bgSyncPending = false;
        let _bgSyncLastHeight = 0;
        function scheduleBgSync() {
            if (_bgSyncPending) return;
            _bgSyncPending = true;
            requestAnimationFrame(() => {
                _bgSyncPending = false;
                const servicesPage = document.getElementById('services-page');
                const contentWrapper = document.getElementById('services-content-wrapper');
                const bgContainer = document.getElementById('services-bg-container');
                if (servicesPage && contentWrapper && bgContainer && servicesPage.style.display !== 'none') {
                    const h = Math.max(servicesPage.clientHeight, contentWrapper.offsetHeight);
                    if (h !== _bgSyncLastHeight) {
                        _bgSyncLastHeight = h;
                        bgContainer.style.height = h + 'px';
                    }
                }
            });
        }
        // Keep the old name as an alias so existing callers still work
        const syncServicesBackgroundHeight = scheduleBgSync;

        // Resize observer uses the coalesced scheduler
        const contentWrapperEl = document.getElementById('services-content-wrapper');
        if (contentWrapperEl && window.ResizeObserver) {
            const resizeObserver = new ResizeObserver(scheduleBgSync);
            resizeObserver.observe(contentWrapperEl);
        }

        // Pause decorative spin animations when off-screen to reduce GPU work
        if (window.IntersectionObserver) {
            const spinObserver = new IntersectionObserver((entries) => {
                entries.forEach((e) => {
                    e.target.style.animationPlayState = e.isIntersecting ? 'running' : 'paused';
                });
            }, { threshold: 0 });
            document.querySelectorAll('.animate-spin-slow').forEach((el) => spinObserver.observe(el));
        }

        function resolveInitialServiceIndex() {
            const serviceParam = (new URLSearchParams(window.location.search).get('service') || '').toLowerCase();
            const serviceIndexByParam = { training: 0, development: 1, consulting: 2, governance: 3 };
            return Number.isFinite(serviceIndexByParam[serviceParam])
              ? serviceIndexByParam[serviceParam]
              : 0;
        }

        function hydrateInitialServiceState(index) {
            updateService(index, { syncUrl: false });
            scheduleBgSync();
        }

        function initServicesScrollReveals() {
            const revealTargets = Array.from(document.querySelectorAll('[data-services-reveal]'));
            if (!revealTargets.length) {
                return;
            }

            const prefersReducedMotion = window.matchMedia &&
                window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const supportsIO = 'IntersectionObserver' in window;
            const groupSteps = {
                steps: 0.12,
                integrations: 0.08
            };
            const groupCounts = new Map();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;

            revealTargets.forEach((element) => {
                const variant = (element.dataset.servicesReveal || 'rise').trim();
                const extraClass = (element.dataset.servicesRevealExtra || '').trim();
                const group = (element.dataset.servicesRevealGroup || '').trim();
                const hasExplicitDelay = element.dataset.servicesRevealDelay !== undefined;
                let delay = hasExplicitDelay ? Number.parseFloat(element.dataset.servicesRevealDelay) : 0;

                if (!Number.isFinite(delay)) {
                    delay = 0;
                }

                if (!hasExplicitDelay && group) {
                    const index = groupCounts.get(group) || 0;
                    const step = groupSteps[group] || 0.1;
                    delay = index * step;
                    groupCounts.set(group, index + 1);
                }

                element.classList.add('services-scroll-reveal', `services-scroll-reveal--${variant}`);
                if (extraClass) {
                    element.classList.add(extraClass);
                }
                element.style.transitionDelay = delay > 0 ? `${delay}s` : '';
            });

            if (prefersReducedMotion || !supportsIO) {
                revealTargets.forEach((element) => element.classList.add('animate'));
                return;
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                });
            }, {
                threshold: 0.16,
                rootMargin: '0px 0px -12% 0px'
            });

            revealTargets.forEach((element) => {
                const rect = element.getBoundingClientRect();
                const initiallyVisible = rect.bottom > viewportHeight * 0.08 &&
                    rect.top < viewportHeight * 0.88;

                if (initiallyVisible) {
                    element.classList.add('animate');
                    return;
                }

                observer.observe(element);
            });
        }

        // --- Tab entrance animation ---
        function finalizeTabEntrance(options = {}) {
            const force = options.force === true;
            if (_tabEntranceCompleted && !force) return;

            _tabEntranceCompleted = true;
            _isInitialEntrance = false;

            if (_tabEntranceFallbackTimer) {
                clearTimeout(_tabEntranceFallbackTimer);
                _tabEntranceFallbackTimer = null;
            }

            var grid = document.getElementById('tabs-grid');
            var tabs = document.querySelectorAll('.service-tab-item');
            var visualPane = document.querySelector('.service-visual-pane');
            var posterCard = document.querySelector('.service-poster-card');
            var rightContent = document.getElementById('service-right-content');
            var animated = [grid, visualPane, posterCard, rightContent].filter(Boolean);

            if (grid) {
                grid.classList.remove('tabs-entrance-hidden');
            }

            tabs.forEach(function(tab) {
                tab.classList.remove('tabs-entrance-hidden');
                tab.style.opacity = '';
                tab.style.transform = '';
                tab.style.transformOrigin = '';
                var label = tab.querySelector('.tab-label');
                cancelScrambleAnimation(label);
                if (label && label.dataset.original) {
                    label.textContent = label.dataset.original;
                }
            });

            animated.forEach(function(el) {
                el.style.opacity = '';
                el.style.transform = '';
            });

            if (window.gsap) {
                if (options.kill !== false) {
                    gsap.killTweensOf(animated);
                    gsap.killTweensOf(tabs);
                }
                if (grid) gsap.set(grid, { clearProps: 'all' });
                gsap.set(tabs, { clearProps: 'scale,transformOrigin,opacity,transform' });
                if (visualPane) gsap.set(visualPane, { clearProps: 'all' });
                if (posterCard) gsap.set(posterCard, { clearProps: 'all' });
                if (rightContent) gsap.set(rightContent, { clearProps: 'all' });
            }
        }

        function initTabEntrance() {
            var grid = document.getElementById('tabs-grid');
            var tabs = document.querySelectorAll('.service-tab-item');
            var visualPane = document.querySelector('.service-visual-pane');
            var posterCard = document.querySelector('.service-poster-card');
            var rightContent = document.getElementById('service-right-content');

            _tabEntranceCompleted = false;

            if (!grid || !tabs.length) {
                finalizeTabEntrance();
                return;
            }

            var prefersReducedMotion = window.matchMedia &&
                window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            if (prefersReducedMotion || typeof gsap === 'undefined') {
                finalizeTabEntrance();
                return;
            }

            // --- Setup ---
            gsap.set(grid, { opacity: 0 });
            gsap.set(tabs, {
                opacity: 0,
                y: 14,
                scale: 0.88,
                transformOrigin: 'center center',
                force3D: true
            });
            if (visualPane) gsap.set(visualPane, { opacity: 0, y: 30 });
            if (posterCard) gsap.set(posterCard, { opacity: 0, scale: 0.92, y: 20 });
            if (rightContent) gsap.set(rightContent, { opacity: 0, x: 30 });
            grid.classList.remove('tabs-entrance-hidden');

            var tl = gsap.timeline({
                onComplete: function() {
                    finalizeTabEntrance({ kill: false });
                }
            });

            // Phase 1: Container fades in
            tl.to(grid, { opacity: 1, duration: 0.6, ease: 'power2.out' }, 0);

            if (visualPane) {
                tl.to(visualPane, { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }, 0.2);
            }
            if (posterCard) {
                tl.to(posterCard, { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power2.out' }, 0.5);
            }
            if (rightContent) {
                tl.to(rightContent, { opacity: 1, x: 0, duration: 1.2, ease: 'power2.out' }, 0.7);
            }

            // Phase 2: Tabs fade in from depth — scale up from 0.88 to 1
            tabs.forEach(function(tab, i) {
                tl.to(tab, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.62,
                    ease: 'power2.out',
                    onStart: function() {
                        var label = tab.querySelector('.tab-label');
                        if (label) {
                            scrambleText(label, label.getAttribute('data-original') || label.textContent, {
                                duration: 0.46,
                                frameInterval: 42,
                                chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
                            });
                        }
                    }
                }, 0.86 + (i * 0.14));
            });

            _tabEntranceFallbackTimer = window.setTimeout(() => {
                finalizeTabEntrance();
            }, Math.ceil((tl.duration() + 0.45) * 1000));
        }

        let _servicesBootstrapped = false;

        function syncServicesActivationClass() {
            const root = document.documentElement;
            if (!root) return;
            if (document.visibilityState === 'hidden') {
                root.classList.add('services-awaiting-activation');
                return;
            }
            root.classList.remove('services-awaiting-activation');
        }

        function bootstrapServicesPage() {
            if (_servicesBootstrapped) return;
            if (document.visibilityState === 'hidden') return;

            syncServicesActivationClass();
            _servicesBootstrapped = true;

            // 1. Run entrance animation first (sets _isInitialEntrance flag)
            _isInitialEntrance = true;
            initTabEntrance();
            initIntegrationsShowcase();
            initServicesScrollReveals();

            // 2. Then init services (updateService will skip its own scramble during entrance)
            hydrateInitialServiceState(resolveInitialServiceIndex());
        }

        function queueServicesBootstrap() {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', bootstrapServicesPage, { once: true });
                return;
            }
            bootstrapServicesPage();
        }

        queueServicesBootstrap();

        document.addEventListener('visibilitychange', () => {
            syncServicesActivationClass();
            if (document.visibilityState === 'visible') {
                bootstrapServicesPage();
            }
        });

        document.addEventListener('prerenderingchange', () => {
            syncServicesActivationClass();
            bootstrapServicesPage();
        });

        window.addEventListener('pageshow', (event) => {
            if (!event.persisted) return;
            window.setTimeout(() => finalizeTabEntrance({ force: true }), 80);
        });
