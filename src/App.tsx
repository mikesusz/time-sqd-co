import React, { useState } from 'react';
import TimeDisplay from './components/TimeDisplay';

const App: React.FC = () => {
	// default to Jan 1, 2000
	const [targetDate, setTargetDate] = useState<Date>(new Date(2000, 0, 1));

	return (
		<main>
			<TimeDisplay
				currentDate={new Date()}
				pastDate={targetDate}
				onPastDateChange={setTargetDate}
			/>
		</main>
	);
};

export default App;
