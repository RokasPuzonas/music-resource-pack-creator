import React from 'react';
import './App.css';
import DiscRow from './components/DiscRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { selectDiscs, useAppSelector } from './store';

function App() {
	const discs = useAppSelector(selectDiscs)

  return (
    <div className="app">
      <header>
				<button>
					<FontAwesomeIcon className="margin-right-1" icon={solid("gears")} />
					Generate resource pack
				</button>
      </header>
			<main>
				{ discs.discs.map((disc, idx) => { return <DiscRow key={idx} discId={idx} /> }) }
			</main>
			<footer>
				Made By Rokas Puzonas
			</footer>
    </div>
  );
}

export default App;
