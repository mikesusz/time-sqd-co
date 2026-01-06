import React from 'react';

interface ExampleDate {
	label: string;
	date: string;
	description: string;
}

const exampleDates: ExampleDate[] = [
	{
		label: 'Y2K',
		date: '2000-01-01',
		description: 'January 1, 2000',
	},
	{
		label: "Nirvana's Nevermind Released",
		date: '1991-09-24',
		description: 'September 24, 1991',
	},
	{
		label: 'Fall of the Berlin Wall',
		date: '1989-11-09',
		description: 'November 9, 1989',
	},
	{
		label: 'Moon Landing',
		date: '1969-07-20',
		description: 'July 20, 1969',
	},
	{
		label: 'Elvis on Ed Sullivan',
		date: '1956-09-09',
		description: 'September 9, 1956',
	},
	{
		label: 'World War II Ended',
		date: '1945-09-02',
		description: 'September 2, 1945',
	},
	{
		label: 'Signing of the Treaty of Versailles (end of World War I)',
		date: '1919-06-28',
		description: 'June 28, 1919',
	},
	{
		label: 'American Civil War Ended',
		date: '1865-04-09',
		description: 'April 9, 1865',
	},
	{
		label: 'Adoption of the U.S. Declaration of Independence',
		date: '1776-07-04',
		description: 'July 4, 1776',
	},
];

const Instructions: React.FC = () => {
	const handleExampleClick = (e: React.MouseEvent<HTMLAnchorElement>, date: string) => {
		e.preventDefault();
		const url = new URL(window.location.href);
		url.searchParams.set('date', date);
		window.history.pushState({}, '', url.toString());
		// Trigger a popstate event to notify the app of the URL change
		window.dispatchEvent(new PopStateEvent('popstate'));
		// Force a page reload to update the state
		window.location.href = url.toString();
	};

	return (
		<div className="instructions">
			<h2>How it works</h2>
			<p>
				Enter a date to see how many days have passed between that date and today. The calculator
				also shows an equal number of days <em>before</em> your chosen date.
			</p>

			<h3>Try these examples:</h3>
			<ul className="examples">
				{exampleDates.map((example) => (
					<li key={example.date}>
						<a href={`?date=${example.date}`} onClick={(e) => handleExampleClick(e, example.date)}>
							{example.label}
						</a>
						<span className="example-description"> ({example.description})</span>
					</li>
				))}
			</ul>

			<p className="tip">
				<strong>Tip:</strong> Enter your birthday, anniversary, or any memorable date. You can share
				the URL to show others your calculation!
			</p>
		</div>
	);
};

export default Instructions;
