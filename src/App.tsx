import React, { useState, useMemo } from 'react';
import DatePicker from './components/DatePicker';
import TimeDisplay from './components/TimeDisplay';

const App: React.FC = () => {
	// default to Jan 1, 2000
	const [targetDate, setTargetDate] = useState<Date>(new Date(2000, 0, 1));

	// compute pastTime (same logic used in TimeDisplay) and derive its year for the range min
	const pastTimeYear = useMemo(() => {
		const now = new Date();
		const diff = Math.abs(now.getTime() - targetDate.getTime());
		const pastTime = new Date(targetDate.getTime() - diff);
		return pastTime.getFullYear();
	}, [targetDate]);

	return (
		<main>
			<DatePicker targetDate={targetDate} onDateChange={setTargetDate} minYear={pastTimeYear} />

			<TimeDisplay currentDate={new Date()} pastDate={targetDate} />
		</main>
	);
};

export default App;
