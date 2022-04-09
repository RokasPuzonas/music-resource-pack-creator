import DiscTooltip from "./DiscTooltip"
import { selectDiscs, useAppDispatch, useAppSelector } from "../store"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"
import ReactTooltip from "react-tooltip"
import EditNameModal from "./EditNameModal"
import { setDescription, setTitle } from "../store/discs"
import { useState } from "react"

import "./DiscRow.css"

interface DiscRowProps {
	discId: number
}

function DiscRow({ discId }: DiscRowProps) {
	const discs = useAppSelector(selectDiscs)
	const disc = discs.discs[discId]

	const [showEditName, setShowEditName] = useState(false);

	const dispatch = useAppDispatch()
	function onReset() {
		dispatch(setTitle({ id: discId, title: "" }))
		dispatch(setDescription({ id: discId, description: "" }))
	}

	return (
		<div className="disc-row">
			<button data-tip="Reset" onClick={onReset}>
				<FontAwesomeIcon icon={solid("arrow-rotate-right")} />
			</button>
			<button data-tip="Edit name" onClick={() => setShowEditName(true)}>
				<FontAwesomeIcon icon={solid("pen")} />
			</button>
			<button data-tip="Upload new audio">
				<FontAwesomeIcon icon={solid("file-audio")} />
			</button>
			<div className="disc-preview">
				<img className="disc-row__icon" src={disc.icon} />
				<DiscTooltip
					title={disc.title || disc.defaultTitle}
					description={disc.description || disc.defaultDescription}
				/>
			</div>
			<ReactTooltip />
			<EditNameModal
				show={showEditName}
				onClose={() => setShowEditName(false)}
				discId={discId}
			/>
		</div>
	)
}

export default DiscRow
