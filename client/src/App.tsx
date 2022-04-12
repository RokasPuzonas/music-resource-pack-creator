import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { selectDiscs, useAppSelector } from "./store"
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import ResourcePackCustomizer from './components/ResourcePackCustomizer';
import { CreatePackPayload, createPack, Disc } from './api';
import LoadingOverlay from './components/LoadingOverlay';

// TODO: Add error popups when something goes wrong

function App() {
	const [description, setDescription] = useState("")

	let [showLoading, setShowLoading] = useState(false);

	const store = useAppSelector(selectDiscs)
	async function onClick() {
		const discs: Record<string, Disc> = {}
		for (var disc of store.discs) {
			if (disc.title || disc.description || disc.youtubeUrl) {
				const payloadDisc: Disc = {}
				if (disc.title) {
					payloadDisc.title = disc.title
				}
				if (disc.description) {
					payloadDisc.description = disc.description
				}
				if (disc.youtubeUrl) {
					payloadDisc.youtubeUrl = disc.youtubeUrl
				}
				discs[disc.resourceName] = payloadDisc
			}
		}

		const info: CreatePackPayload = { discs }
		if (description.length > 0) {
			info.description = description
		}

		setShowLoading(true)
		try {
			const blob = await createPack(info)
			if (blob) {
				downloadBlob(blob, "music-pack.zip")
			}
		} catch (e) {
			console.log(e)
		}
		setShowLoading(false)
	}

	function downloadBlob(blob: Blob, filename: string) {
		const url = window.URL.createObjectURL(new Blob([blob]))
		const link = document.createElement("a")
		link.href = url
		link.setAttribute("download", filename)
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

  return (
    <div className="app">
      <header>
				<button onClick={onClick}>
					<FontAwesomeIcon className="margin-right-1" icon={solid("gears")} />
					Generate resource pack
				</button>
      </header>
			<main>
				<hr />
				<ResourcePackCustomizer
					description={description}
					setDescription={setDescription}
				/>
			</main>
			<footer>
				Made By Rokas Puzonas
			</footer>
			<LoadingOverlay show={showLoading} />
    </div>
  );
}

export default App;
