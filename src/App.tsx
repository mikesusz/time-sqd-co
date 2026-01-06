import React, { useState } from 'react';
import TimeDisplay from './components/TimeDisplay';
import Instructions from './components/Instructions';

const getDateFromURL = (): Date | null => {
	const params = new URLSearchParams(window.location.search);
	const dateParam = params.get('date');

	if (dateParam) {
		// Parse YYYY-MM-DD as local date to avoid timezone shifts
		const parts = dateParam.split('-').map(Number);
		if (parts.length === 3 && parts.every((n) => !isNaN(n))) {
			const [year, month, day] = parts;
			const localDate = new Date(year, month - 1, day);
			// Check if date is valid
			if (!isNaN(localDate.getTime())) {
				return localDate;
			}
		}
	}

	return null;
};

const updateURL = (date: Date) => {
	const params = new URLSearchParams(window.location.search);
	const dateStr = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
	params.set('date', dateStr);

	const newURL = `${window.location.pathname}?${params.toString()}`;
	window.history.replaceState({}, '', newURL);
};

const App: React.FC = () => {
	// Try to get date from URL, otherwise default to Jan 1, 2000
	const [targetDate, setTargetDate] = useState<Date>(() => {
		return getDateFromURL() || new Date(2000, 0, 1);
	});

	const handleDateChange = (newDate: Date) => {
		setTargetDate(newDate);
		updateURL(newDate);
	};

	return (
		<main>
			<TimeDisplay
				currentDate={new Date()}
				pastDate={targetDate}
				onPastDateChange={handleDateChange}
			/>
			<Instructions />
		</main>
	);
};

export default App;
