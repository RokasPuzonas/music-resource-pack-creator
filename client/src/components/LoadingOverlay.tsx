import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import "./LoadingOverlay.css"

interface LoadingOverlayProps {
	show: boolean
}

function LoadingOverlay({ show }: LoadingOverlayProps) {
	if (!show) return null

	return <div className="loading-overlay">
		<FontAwesomeIcon className="spinner" icon={solid("spinner")} />
	</div>
}

export default LoadingOverlay
