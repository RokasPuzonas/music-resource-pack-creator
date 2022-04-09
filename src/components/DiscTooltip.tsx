import './DiscTooltip.css';

interface DiscTooltip {
	title: string
	description: string
}

function DiscTooltip({ title, description }: DiscTooltip) {
	return (
		<div className="disc-tooltip">
			<span className="disc-tooltip__title">
				{ title }
			</span>
			<span className="disc-tooltip__description">
				{ description }
			</span>
		</div>
	)
}

export default DiscTooltip
