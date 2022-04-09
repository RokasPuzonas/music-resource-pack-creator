import { selectDiscs, useAppDispatch, useAppSelector } from "../store"
import { setAudioUrl } from "../store/discs"
import { useState } from "react"
import Modal from "./Modal"
import "./UploadAudioModal.css"

interface UploadAudioModalProps {
	discId: number
	show: boolean
	onClose: { (): void }
}

function UploadAudioModal({ discId, show, onClose }: UploadAudioModalProps) {
	const discs = useAppSelector(selectDiscs)
	const disc = discs.discs[discId]

	const [url, setUrl] = useState("");
	const [updateDescription, setUpdateDescription] = useState(true);

	const dispatch = useAppDispatch()
	async function onModalClose() {
		onClose()
		dispatch(setAudioUrl({
			id: discId,
			audioUrl: url
		}))
	}

	return <Modal show={show} onClose={onModalClose}>
		<label>Youtube URL:</label>
		<input
			onChange={(e) => setUrl(e.target.value)}
			type="text"
			value={url}
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
