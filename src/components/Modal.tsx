import { useEffect } from "react"
import "./Modal.css"

interface ModalProps {
	show: boolean
	onClose: { (): void }
	children: React.ReactNode
}

function Modal({ show, onClose, children }: ModalProps) {

	function onKeyUp(e: KeyboardEvent) {
		if (show && e.key == "Escape") {
			onClose()
		}
	}

	useEffect(() => {
		document.addEventListener("keyup", onKeyUp)
		return () =>  document.removeEventListener("keyup", onKeyUp)
	})

	if (!show) return null

	return (
		<>
			<div
				className="modal__overlay"
				onClick={onClose}
			/>
			<div className="modal">
				<div className="modal__body">
					{children}
				</div>
				<button className="modal__close-btn" onClick={onClose}>Close</button>
			</div>
		</>
	)
}

export default Modal
