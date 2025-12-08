export function calculateTimeDifference(startDate: Date, endDate: Date): string {
    const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);

    return `${differenceInDays} days, ${differenceInHours % 24} hours, ${differenceInMinutes % 60} minutes, ${differenceInSeconds % 60} seconds`;
}

export function getPastDate(date: Date, days: number): Date {
    const pastDate = new Date(date);
    pastDate.setDate(pastDate.getDate() - days);
    return pastDate;
}