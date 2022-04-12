import { selectDiscs, useAppSelector } from '../store';
import DiscRow from './DiscRow';

interface ResourcePackCustomizerProps {
	description: string
	setDescription: { (description: string): void }
}

function ResourcePackCustomizer({ description, setDescription }: ResourcePackCustomizerProps) {
	const discs = useAppSelector(selectDiscs)

	return <div>
		<label>Resource pack description:</label>
		<input
			onChange={(e) => setDescription(e.target.value)}
			type="text"
			value={description}
		/>
		{ discs.discs.map((disc, idx) => { return <DiscRow key={idx} discId={idx} /> }) }
	</div>
}

export default ResourcePackCustomizer
