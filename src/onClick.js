import { ATTR } from "./constants"

function onClick(ev) {
	let newActive = this.activePage
	const targetNode = ev.target

	const isPlaystop = targetNode.closest(`[${ATTR}-playstop]`)
	const isPrev = targetNode.closest(`[${ATTR}-prev]`)
	const isNext = targetNode.closest(`[${ATTR}-next]`)
	const isPaging = targetNode.closest(`[${ATTR}-paging]`)

	if (isPlaystop) {
		this.toggleAutoplay()
		return
	} else if (isPrev) {
		newActive--
	} else if (isNext) {
		newActive++
	} else if (isPaging && isPaging.querySelector("button")) {
		const targetBtn = targetNode.closest(`[${ATTR}-paging] li`)
		newActive = this.nodes.pages.indexOf(targetBtn)
	} else {
		return
	}

	// stop autoplay
	this.stop()

	this.changeActive(newActive)
}

export default onClick
