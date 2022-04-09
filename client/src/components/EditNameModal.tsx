import { selectDiscs, useAppDispatch, useAppSelector } from "../store"
import { setDescription, setTitle } from "../store/discs"

import Modal from "./Modal"

interface EditNameModalProps {
	discId: number
	show: boolean
	onClose: { (): void }
}


function EditNameModal({ discId, show, onClose }: EditNameModalProps) {
	const discs = useAppSelector(selectDiscs)
	const disc = discs.discs[discId]

	const dispatch = useAppDispatch()
	function setInputTitle(e: React.ChangeEvent<HTMLInputElement>) {
		dispatch(setTitle({
			id: discId,
			title: e.target.value
		}))
	}

	function setInputDescription(e: React.ChangeEvent<HTMLInputElement>) {
		dispatch(setDescription({
			id: discId,
			description: e.target.value
		}))
	}

	return <Modal show={show} onClose={onClose}>
		<label>Title:</label>
		<input onChange={setInputTitle} type="text" value={disc.title} />
		<label>Description:</label>
		<input onChange={setInputDescription} type="text" value={disc.description}/>
	</Modal>
}

export default EditNameModal
