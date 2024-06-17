import { Tldraw, track, useEditor } from 'tldraw'
import 'tldraw/tldraw.css'
import { useYjsStore } from './useYjsStore'

const HOST_URL =
	import.meta.env.MODE === 'development'
		? 'ws://localhost:1235'
		: 'ws://148.135.43.239:1235'

export default function YjsExample() {
	const store = useYjsStore({
		roomId: 'example11',
		hostUrl: HOST_URL,
	})

	return (
		<div className="tldraw__editor">
			<Tldraw
				autoFocus
				store={store}
				components={{
					SharePanel: NameEditor,
				}}
			/>
		</div>
	)
}

const NameEditor = track(() => {
	const editor = useEditor()

	const { color, name } = editor.user.getUserPreferences()

	return (
		<div style={{ pointerEvents: 'all', display: 'flex' }}>
			<input
				type="color"
				value={color}
				onChange={(e) => {
					editor.user.updateUserPreferences({
						color: e.currentTarget.value,
					})
				}}
			/>
			<input
				value={name}
				onChange={(e) => {
					editor.user.updateUserPreferences({
						name: e.currentTarget.value,
					})
				}}
			/>
		</div>
	)
})
