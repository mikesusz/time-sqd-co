import React, { useEffect, useRef, useState } from 'react';

interface DatePickerProps {
	targetDate: Date;
	onDateChange: (date: Date) => void;
}

const formatIso = (d: Date) =>
	`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(
		2,
		'0'
	)}`;

const DatePicker: React.FC<DatePickerProps> = ({ targetDate, onDateChange }) => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const isEditingRef = useRef(false);

	const [editValue, setEditValue] = useState(() => formatIso(targetDate));

	useEffect(() => {
		// sync from targetDate only when the user is not actively editing
		if (!isEditingRef.current) {
			setEditValue(formatIso(targetDate));
		}
	}, [targetDate]);

	const commitIfValid = (input: HTMLInputElement) => {
		const dateFromControl = input.valueAsDate;
		if (dateFromControl) {
			// normalize using UTC getters to avoid timezone shifts
			const normalized = new Date(
				dateFromControl.getUTCFullYear(),
				dateFromControl.getUTCMonth(),
				dateFromControl.getUTCDate()
			);
			onDateChange(normalized);
			return true;
		}

		// fallback: if user pasted a full yyyy-mm-dd string
		const raw = input.value;
		const parts = raw.split('-').map(Number);
		if (parts.length >= 3 && parts.every((n) => !isNaN(n))) {
			const [y, m, d] = parts;
			onDateChange(new Date(y, m - 1, d));
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
			// normalize and commit
			const normalized = new Date(
				dateFromControl.getUTCFullYear(),
				dateFromControl.getUTCMonth(),
				dateFromControl.getUTCDate()
			);
			onDateChange(normalized);
		}
	};

	const handleFocus = () => {
		isEditingRef.current = true;
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		isEditingRef.current = false;
		const input = e.target;
		const committed = commitIfValid(input);
		// if not committed, revert to the formatted targetDate value
		if (!committed) {
			setEditValue(formatIso(targetDate));
		}
	};

	const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const year = Number(e.target.value);
		onDateChange(new Date(year, targetDate.getMonth(), targetDate.getDate()));
	};

	const currentYear = new Date().getFullYear();

	return (
		<div className="inputs">
			<div>
				<label htmlFor="date-picker">Select a date:</label>
			</div>
			<div>
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

			<div>
				<input
					id="year-range"
					type="range"
					title="year"
					min={1900}
					max={currentYear}
					value={targetDate.getFullYear()}
					onChange={handleYearChange}
				/>
			</div>
		</div>
	);
};

export default DatePicker;
