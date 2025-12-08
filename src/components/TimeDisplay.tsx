import React from 'react';

const defaultCurrentDate = new Date();
const defaultPastDate = new Date('2000-01-01');

interface TimeDisplayProps {
	currentDate?: Date | null;
	pastDate?: Date | null;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({
	currentDate = defaultCurrentDate,
	pastDate = defaultPastDate,
}) => {
	if (!currentDate || !pastDate) {
		console.warn('TimeDisplay: currentDate or pastDate is undefined', { currentDate, pastDate });
		return (
			<div>
				<h2>Time Difference</h2>
				<p>Missing date(s) — ensure both currentDate and pastDate props are provided.</p>
			</div>
		);
	}

	const timeDifference = Math.abs(currentDate.getTime() - pastDate.getTime());
	const pastTime = new Date(pastDate.getTime() - timeDifference);

	// changed: output date as "Month Day, Year" (e.g. "January 1, 2000")
	const formatTime = (date: Date) =>
		date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });

	// compute integer days and double it
	const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
	const doubleDays = days * 2;

	return (
		<div className="outputs">
			<div className="visual">
				<div>{formatTime(pastTime)}</div>

				<div>{formatTime(pastDate)}</div>

				<div>{formatTime(currentDate)}</div>
			</div>

			<div className="diff">
				<div className="layout">
					<div className="display">{doubleDays} days</div>
				</div>
				<div className="layout">
					<div className="display">{days} days</div>
				</div>
			</div>

			<div className="stats">{/* future expansion */}</div>
		</div>
	);
};

export default TimeDisplay;
