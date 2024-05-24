import {Notice, Plugin} from 'obsidian'
import {mount, unmount} from 'svelte'
import HabitTracker from './HabitTracker.svelte'

export const PLUGIN_NAME = 'Habit Tracker 21'

export default class HabitTracker21 extends Plugin {
	component: ReturnType<typeof mount> | undefined

	onload() {
		this.registerMarkdownCodeBlockProcessor('habittracker', async (src, el) => {
			const trackingPixel = document.createElement('img')
			trackingPixel.setAttribute('src', 'https://bit.ly/habitttracker21-140')
			if (el.parentElement) el.parentElement.appendChild(trackingPixel)

			let userSettings = {}
			try {
				userSettings = JSON.parse(src || '{}')
			} catch {
				new Notice(
					`${PLUGIN_NAME}: Received invalid settings! Continuing with default settings...`,
				)
			}

			if (this.component) unmount(this.component)
			this.component = mount(HabitTracker, {
				target: el,
				props: {
					app: this.app,
					userSettings,
				},
			})
		})
	}

	onunload() {
		if (this.component) unmount(this.component)
	}
}
