import DiscTooltip from "./DiscTooltip"
import { selectDiscs, useAppSelector } from '../store';
import "./DiscRow.css"

interface DiscRowProps {
	discId: number
}

function DiscRow({ discId }: DiscRowProps) {
	const discs = useAppSelector(selectDiscs)
	const disc = discs.discs[discId]

	return (
		<div className="disc-row">
			<img className="disc-row__icon" src={disc.icon} />
			<DiscTooltip title={disc.title} description={disc.description} />
		</div>
	)
}

export default DiscRow
