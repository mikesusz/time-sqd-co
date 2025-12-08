import { useState, useEffect } from 'react';

const useTimeRange = (targetDate: Date | string | number | null | undefined) => {
	const [timeDifference, setTimeDifference] = useState<string>('');
	const [pastTime, setPastTime] = useState<string>('');

	useEffect(() => {
		if (targetDate == null) {
			console.warn('useTimeRange: targetDate is null or undefined', { targetDate });
			setTimeDifference('');
			setPastTime('');
			return;
		}

		const target = targetDate instanceof Date ? targetDate : new Date(targetDate);
		if (isNaN(target.getTime())) {
			console.warn('useTimeRange: invalid targetDate', { targetDate });
			setTimeDifference('');
			setPastTime('');
			return;
		}

		const calculateTimeDifference = () => {
			const now = new Date();
			const diffInMilliseconds = now.getTime() - target.getTime();
			const absMs = Math.abs(diffInMilliseconds);

			const diffInSeconds = Math.floor(absMs / 1000);
			const diffInMinutes = Math.floor(diffInSeconds / 60);
			const diffInHours = Math.floor(diffInMinutes / 60);
			const diffInDays = Math.floor(diffInHours / 24);

			setTimeDifference(
				`${diffInDays} days, ${diffInHours % 24} hours, ${diffInMinutes % 60} minutes ago`
			);

			const pastDate = new Date(target.getTime() - diffInMilliseconds);
			const pastDiffInSeconds = Math.floor(Math.abs(diffInMilliseconds) / 1000);
			const pastDiffInMinutes = Math.floor(pastDiffInSeconds / 60);
			const pastDiffInHours = Math.floor(pastDiffInMinutes / 60);
			const pastDiffInDays = Math.floor(pastDiffInHours / 24);

			setPastTime(
				`${pastDiffInDays} days, ${pastDiffInHours % 24} hours, ${
					pastDiffInMinutes % 60
				} minutes before the target date`
			);
		};

		calculateTimeDifference();
		const interval = setInterval(calculateTimeDifference, 1000);

		return () => clearInterval(interval);
	}, [targetDate]);

	return { timeDifference, pastTime };
};

export default useTimeRange;
