const i = "data-pm-carousel",
	L = `${i}-paging`,
	S = `${i}-wrapper`,
	b = `${i}-overflow`,
	E = `${i}-item`,
	u = `${i}-prev`,
	f = `${i}-next`,
	g = `${i}-playstop`,
	w = "transform .5s ease-in-out",
	a = "is-active"
function T() {
	const t = {}
	let e = !1,
		s = 0
	const h = arguments.length
	Object.prototype.toString.call(arguments[0]) === "[object Boolean]" &&
		((e = arguments[0]), s++)
	const n = function (o) {
		for (const r in o)
			Object.prototype.hasOwnProperty.call(o, r) &&
				(e && Object.prototype.toString.call(o[r]) === "[object Object]"
					? (t[r] = T(!0, t[r], o[r]))
					: (t[r] = o[r]))
	}
	for (; s < h; s++) {
		const o = arguments[s]
		n(o)
	}
	return t
}
function M(t) {
	try {
		return JSON.parse(t)
	} catch {
		return {}
	}
}
const _ = {
	playstop: function () {
		!this.nodes.playstop || (this.nodes.playstop.hidden = !this.config.autoplay)
	},
	wrappers: function () {
		const t = this.config.noStartSpace ? 0 : this.config.spaceAround
		;(this.nodes.overflow.style.transform = `translateX(${
			this.activePage * -100 + t
		}%)`),
			this.config.noStartSpace
				? (this.nodes.overflow.style.paddingRight =
						this.config.spaceAround + "%")
				: ((this.nodes.overflow.style.paddingRight = t + "%"),
				  (this.nodes.overflow.style.paddingLeft = t + "%")),
			(this.nodes.overflow.style.transition = w),
			(this.nodes.overflow.style.display = "flex"),
			(this.nodes.wrapper.style.overflow = "hidden"),
			this.el.classList.add(a)
	},
	slides: function () {
		const t = []
		for (
			this.nodes.items.forEach((e, s) => {
				e.setAttribute("tabindex", "-1"),
					e.setAttribute(i + "-item", s),
					(e.style.flex = `1 0 ${100 / this.config.group}%`),
					(e.style.overflow = "hidden")
			});
			this.nodes.items.length > 0;

		)
			t.push(this.nodes.items.splice(0, this.config.group))
		;(this.nodes.items = t), (this.pagesLength = this.nodes.items.length)
	},
	paging: function () {
		if (!this.nodes.paging) return
		let t, e
		const s = document.createDocumentFragment()
		;(this.nodes.paging.innerHTML = ""),
			(this.nodes.pages = []),
			this.nodes.items.forEach((h, n) => {
				;(e = this.stringTpls.pagingBtn),
					(t = document.createElement("div")),
					(t.innerHTML = e.replace("{nbr}", ++n)),
					this.nodes.pages.push(t.firstElementChild),
					s.appendChild(t.firstElementChild)
			}),
			this.nodes.paging.append(s),
			(this.nodes.paging.hidden = !1)
	},
}
function $(t = []) {
	t.forEach((e) => _[e].call(this))
}
function X(t) {
	let e = this.activePage
	const s = t.target,
		h = s.closest(`[${i}-playstop]`),
		n = s.closest(`[${i}-prev]`),
		o = s.closest(`[${i}-next]`),
		r = s.closest(`[${i}-paging]`)
	if (h) {
		this.toggleAutoplay()
		return
	} else if (n) e--
	else if (o) e++
	else if (r && r.querySelector("button")) {
		const x = s.closest(`[${i}-paging] li`)
		e = this.nodes.pages.indexOf(x)
	} else return
	this.stop(), this.changeActive(e)
}
function q(t) {
	let e = !1
	switch (t.key) {
		case "ArrowUp":
		case "ArrowLeft":
			;(e = !0), this.changeActive(this.activePage - 1)
			break
		case "ArrowDown":
		case "ArrowRight":
			;(e = !0), this.changeActive(this.activePage + 1)
			break
		case "Home":
			;(e = !0), this.changeActive(0)
			break
		case "End":
			;(e = !0), this.changeActive(this.pagesLength - 1)
			break
	}
	e && t.preventDefault()
}
let l, c, p
function C(t) {
	l && window.cancelAnimationFrame(l),
		(l = window.requestAnimationFrame(() => {
			this.stop(),
				(this.nodes.overflow.style.transition = "none"),
				(this._metricsstartX = Math.round(t.touches[0].pageX)),
				(this._slideWidth = this.nodes.wrapper.offsetWidth)
		}))
}
function R(t) {
	c && window.cancelAnimationFrame(c),
		(c = window.requestAnimationFrame(() => {
			;(this._metricsmoveX = Math.round(t.touches[0].pageX)),
				(this._moveX = this._metricsstartX - this._metricsmoveX),
				(this.nodes.overflow.style.transform = `translateX(${
					-this._distance - this._moveX
				}px)`)
		}))
}
function W() {
	p && window.cancelAnimationFrame(p),
		(p = window.requestAnimationFrame(() => {
			let t = this.activePage
			if (
				((this.nodes.overflow.style.transition = w),
				this._moveX > this._slideWidth / 3)
			)
				t++
			else if (this._moveX < -this._slideWidth / 3) t--
			else {
				this.nodes.overflow.style.transform = `translateX(${-this._distance}px)`
				return
			}
			this.changeActive(t, !0)
		}))
}
function v() {
	;(this.nodes = {
		...this.nodes,
		wrapper: this.el.querySelector(`[${S}]`),
		overflow: this.el.querySelector(`[${b}]`),
		items: [].slice.call(this.el.querySelectorAll(`[${E}]`)),
	}),
		(this.activePage = 0),
		(this._interval = null),
		(this.autoplayStatus = "stop"),
		(this._slideWidth = 0),
		(this._metricsstartX = 0),
		(this._metricsmoveX = 0),
		(this._moveX = 0),
		$.call(this, ["slides", "wrappers", "playstop", "paging"]),
		(this.onClick = X.bind(this)),
		(this.onTouchStart = C.bind(this)),
		(this.onTouchMove = R.bind(this)),
		(this.onTouchEnd = W.bind(this)),
		(this.onKeydown = q.bind(this)),
		(this.onMouseEnter = this.pause.bind(this)),
		(this.onMouseLeave = this.play.bind(this)),
		this.el.addEventListener("click", this.onClick),
		this.el.addEventListener("keydown", this.onKeydown),
		this.nodes.wrapper.addEventListener("touchstart", this.onTouchStart),
		this.nodes.wrapper.addEventListener("touchmove", this.onTouchMove),
		this.nodes.wrapper.addEventListener("touchend", this.onTouchEnd),
		this.config.autoplay > 1 && this.nodes.playstop
			? ((this.config.loop = !0),
			  (this.autoplayStatus = "play"),
			  this.play(),
			  this.el.addEventListener("mouseenter", this.onMouseEnter),
			  this.el.addEventListener("mouseleave", this.onMouseLeave))
			: this.changeActive(this.activePage)
}
function k() {
	;(this._slideWidth = this.visibleSlides[0].offsetWidth * this.config.group),
		(this._distance = this.activePage * this._slideWidth),
		this.activePage === this.pagesLength - 1 &&
			((this._distance = this.nodes.overflow.scrollWidth - this._slideWidth),
			this.config.spaceAround &&
				(this._distance -= parseInt(
					window
						.getComputedStyle(this.nodes.overflow)
						.getPropertyValue("padding-right"),
					10
				))),
		(this.nodes.overflow.style.transform = `translateX(${-this._distance}px`)
}
function O() {
	if (!this.nodes.prev) return
	const t = this.stringTpls.prev
	;(this.nodes.prev.innerHTML = t.replace(
		"{text}",
		this.activePage === 0 ? this.texts.prevFirst : this.texts.prev
	)),
		this.config.loop
			? (this.nodes.prev.hidden = !1)
			: (this.nodes.prev.hidden = this.activePage === 0)
}
function P() {
	if (!this.nodes.next) return
	const t = this.stringTpls.next
	;(this.nodes.next.innerHTML = t.replace(
		"{text}",
		this.activePage === this.pagesLength - 1
			? this.texts.nextLast
			: this.texts.next
	)),
		this.config.loop
			? (this.nodes.next.hidden = !1)
			: (this.nodes.next.hidden = this.activePage === this.pagesLength - 1)
}
function F() {
	;(this.visibleSlides = []),
		this.nodes.paging &&
			this.nodes.pages.forEach((t, e) => {
				let s = t
				const h = t.querySelector("button")
				h && (s = h),
					e === this.activePage
						? (s.setAttribute("aria-current", "true"), t.classList.add(a))
						: (s.removeAttribute("aria-current"), t.classList.remove(a))
			}),
		this.nodes.items.forEach((t, e) => {
			t.forEach((s, h) => {
				e === this.activePage
					? (h === 0 &&
							this.autoplayStatus !== "play" &&
							s.focus({ preventScroll: !0 }),
					  s.setAttribute("aria-hidden", "false"),
					  this.visibleSlides.push(s))
					: s.setAttribute("aria-hidden", "true")
			})
		}),
		k.call(this),
		O.call(this),
		P.call(this)
}
function A() {
	const t = this.settings.responsive
		.slice()
		.reverse()
		.find((e) => window.matchMedia(`(min-width: ${e.minWidth})`).matches)
	return t ? { ...this.settings.default, ...t } : this.settings.default
}
let m,
	d = !1
function H() {
	d ||
		((d = !0),
		(m = setTimeout(() => {
			;(this.config = A.call(this)),
				this.config.disable ? this.disable() : this.reinit(),
				(d = !1),
				clearTimeout(m)
		}, 250)))
}
const I = {
	default: {
		loop: !0,
		group: 1,
		spaceAround: 0,
		noStartSpace: !1,
		autoplay: 0,
	},
}
class N {
	constructor(e, s) {
		this.el = e
		const h = M(this.el.getAttribute(i))
		if (
			((this.settings = T(!0, I, s, h)),
			(this.config = this.settings.default),
			this.settings.responsive &&
				(this.settings.responsive.sort(
					(n, o) => parseInt(n.minWidth, 10) - parseInt(o.minWidth, 10)
				),
				(this.config = A.call(this)),
				this.settings.responsive.forEach((n) => {
					window
						.matchMedia(`(min-width: ${n.minWidth})`)
						.addEventListener("change", H.bind(this))
				})),
			(this.nodes = {
				paging: this.el.querySelector(`[${L}]`),
				prev: this.el.querySelector(`[${u}]`),
				next: this.el.querySelector(`[${f}]`),
				playstop: this.el.querySelector(`[${g}]`),
			}),
			(this.stringTpls = {}),
			this.nodes.paging &&
				(this.stringTpls.pagingBtn = this.nodes.paging.innerHTML),
			(this.texts = {}),
			this.nodes.playstop)
		) {
			this.stringTpls.playstop = this.nodes.playstop.innerHTML
			const n = this.nodes.playstop.getAttribute(g).split("|")
			this.texts = {
				...this.texts,
				play: n[0],
				stop: n[1],
			}
		}
		if (this.nodes.prev && this.nodes.next) {
			;(this.stringTpls.prev = this.nodes.prev.innerHTML),
				(this.stringTpls.next = this.nodes.next.innerHTML)
			const n = this.nodes.prev.getAttribute(u).split("|"),
				o = this.nodes.next.getAttribute(f).split("|")
			this.texts = {
				...this.texts,
				prev: n[0],
				prevFirst: n[1],
				next: o[0],
				nextLast: o[1],
			}
		}
		this.config.disable || v.call(this)
	}
	play() {
		if (!this.nodes.playstop || this.autoplayStatus === "stop") return
		this.pause(),
			(this.autoplayStatus = "play"),
			this.nodes.playstop.classList.add("is-playing")
		const e = this.stringTpls.playstop
		this.nodes.playstop.innerHTML = e.replace("{text}", this.texts.play)
		let s = this.activePage
		this._interval = window.setInterval(() => {
			s++, s > this.pagesLength - 1 && (s = 0), this.changeActive(s)
		}, this.config.autoplay)
	}
	pause() {
		window.clearInterval(this._interval)
	}
	stop() {
		if (!this.nodes.playstop) return
		;(this.autoplayStatus = "stop"),
			this.nodes.playstop.classList.remove("is-playing")
		const e = this.stringTpls.playstop
		;(this.nodes.playstop.innerHTML = e.replace("{text}", this.texts.stop)),
			window.clearInterval(this._interval)
	}
	toggleAutoplay() {
		!this.nodes.playstop ||
			(this.autoplayStatus === "play"
				? this.stop()
				: this.autoplayStatus === "stop" &&
				  ((this.autoplayStatus = "play"), this.play()))
	}
	changeActive(e, s) {
		;(this.activePage = e),
			this.activePage < 0 &&
				(this.activePage = this.config.loop && !s ? this.pagesLength - 1 : 0),
			this.activePage > this.pagesLength - 1 &&
				(this.activePage = this.config.loop && !s ? 0 : this.pagesLength - 1),
			F.call(this)
	}
	reinit() {
		v.call(this)
	}
	disable() {
		this.stop(),
			this.nodes.wrapper.removeEventListener("touchstart", this.onTouchStart),
			this.nodes.wrapper.removeEventListener("touchmove", this.onTouchMove),
			this.nodes.wrapper.removeEventListener("touchend", this.onTouchEnd),
			this.el.removeEventListener("click", this.onClick),
			this.el.removeEventListener("keydown", this.onKeydown),
			this.el.removeEventListener("mouseenter", this.onMouseEnter),
			this.el.removeEventListener("mouseleave", this.onMouseLeave),
			(this.nodes.paging.hidden = !0),
			(this.nodes.prev.hidden = !0),
			(this.nodes.next.hidden = !0),
			(this.nodes.playstop.hidden = !0),
			this.nodes.overflow.removeAttribute("style"),
			this.nodes.wrapper.removeAttribute("style"),
			this.nodes.items.forEach((e) => {
				e.forEach((s) => {
					s.removeAttribute("tabindex"),
						s.removeAttribute("aria-hidden"),
						s.removeAttribute("style")
				})
			}),
			this.el.classList.remove(a)
	}
}
const y = (t, e) => {
		!t.pmCarousel && t.hasAttribute(i) && (t.pmCarousel = new N(t, e))
	},
	B = function (t = {}, e) {
		e !== null &&
			((e = e || document.querySelectorAll(`[${i}]`)),
			e.length ? e.forEach((s) => y(s, t)) : y(e, t))
	}
window.pmCarousel = B
export { B as default }
