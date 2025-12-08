import React, { useEffect, useRef, useState } from 'react';

const defaultCurrentDate = new Date();
const defaultPastDate = new Date('2000-01-01');

interface TimeDisplayProps {
	currentDate?: Date | null;
	pastDate?: Date | null;
	onPastDateChange?: (date: Date) => void;
}

const formatTime = (date: Date) =>
	date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

const formatIso = (d: Date) =>
	`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(
		2,
		'0'
	)}`;

const TimeDisplay: React.FC<TimeDisplayProps> = ({
	currentDate = defaultCurrentDate,
	pastDate = defaultPastDate,
	onPastDateChange,
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

	const isEditingRef = useRef(false);
	const [editValue, setEditValue] = useState(() => formatIso(pastDate));

	useEffect(() => {
		if (!isEditingRef.current) {
			setEditValue(formatIso(pastDate));
		}
	}, [pastDate]);

	const commitIfValid = (input: HTMLInputElement) => {
		const dateFromControl = input.valueAsDate;
		if (dateFromControl) {
			// use UTC getters to avoid timezone shifts (valueAsDate is at 00:00 UTC)
			const normalized = new Date(
				dateFromControl.getUTCFullYear(),
				dateFromControl.getUTCMonth(),
				dateFromControl.getUTCDate()
			);
			onPastDateChange?.(normalized);
			return true;
		}

		const raw = input.value;
		const parts = raw.split('-').map(Number);
		if (parts.length >= 3 && parts.every((n) => !isNaN(n))) {
			const [y, m, d] = parts;
			onPastDateChange?.(new Date(y, m - 1, d));
			return true;
		}

		return false;
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target;
		setEditValue(input.value);

		// commit immediately only when browser reports a full valid date
		const dateFromControl = input.valueAsDate;
		if (dateFromControl) {
			const normalized = new Date(
				dateFromControl.getUTCFullYear(),
				dateFromControl.getUTCMonth(),
				dateFromControl.getUTCDate()
			);
			onPastDateChange?.(normalized);
		}
	};

	const handleFocus = () => {
		isEditingRef.current = true;
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		isEditingRef.current = false;
		const input = e.target;
		const committed = commitIfValid(input);
		if (!committed) {
			setEditValue(formatIso(pastDate));
		}
	};

	const timeDifference = Math.abs(currentDate.getTime() - pastDate.getTime());
	const pastTime = new Date(pastDate.getTime() - timeDifference);

	// compute integer days and double it
	const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
	const doubleDays = days * 2;

	return (
		<div className="outputs">
			<div className="centered">
				equal days before:
				<br />
				<div className="formattedDate">{formatTime(pastTime)}</div>
			</div>

			<div className="layout">
				<div className="display arrows">
					<div>&larr;</div>
					<div>{days} days</div>
					<div>&rarr;</div>
				</div>
			</div>

			<div className="centered input">
				<label htmlFor="date-picker">Enter a date:</label>
				<input
					ref={inputRef}
					id="date-picker"
					type="date"
					value={editValue}
					onChange={handleInputChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>
			</div>

			<div className="layout">
				<div className="display arrows">
					<div>&larr;</div>
					<div>{days} days</div>
					<div>&rarr;</div>
				</div>
			</div>

			<div className="centered">
				today:
				<br />
				<div className="formattedDate">{formatTime(currentDate)}</div>
			</div>
		</div>
	);
};

export default TimeDisplay;
