import { selectDiscs, useAppDispatch, useAppSelector } from "../store"
import { setDescription, setYoutubeUrl } from "../store/discs"
import { useState } from "react"
import Modal from "./Modal"
import "./UploadAudioModal.css"
import { getTitle } from "../api"

interface UploadAudioModalProps {
	discId: number
	show: boolean
	onClose: { (): void }
}

function UploadAudioModal({ discId, show, onClose }: UploadAudioModalProps) {
	const discs = useAppSelector(selectDiscs)
	const disc = discs.discs[discId]

	const [updateDescription, setUpdateDescription] = useState(true);

	const dispatch = useAppDispatch()
	async function setInputYoutubeUrl(e: React.ChangeEvent<HTMLInputElement>) {
		const url = e.target.value
		if (!url || url.length == 0) {
			dispatch(setYoutubeUrl({ id: discId, youtubeUrl: undefined }))
		} else {
			dispatch(setYoutubeUrl({ id: discId, youtubeUrl: url }))
		}
	}

	async function onModalClose() {
		onClose()
		if (updateDescription && disc.youtubeUrl) {
			const title = await getTitle(disc.youtubeUrl)
			if (title) {
				dispatch(setDescription({ id: discId, description: title }))
			} else {
				dispatch(setDescription({ id: discId, description: "ERROR! Video not found" }))
			}
		}
	}

	return <Modal show={show} onClose={onModalClose}>
		<label>Youtube URL:</label>
		<input
			onChange={setInputYoutubeUrl}
			type="text"
			value={disc.youtubeUrl || ""}
		/>
		<div className="checkbox-group">
			<label>Update disc description:</label>
			<input
				onChange={(e) => setUpdateDescription(e.target.checked)}
				type="checkbox"
				checked={updateDescription}
			/>
		</div>
	</Modal>
}

export default UploadAudioModal
