import React from 'react';

interface SliderProps {
    dateValue: number;
    onDateChange: (newDate: number) => void;
}

const Slider: React.FC<SliderProps> = ({ dateValue, onDateChange }) => {
    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = Number(event.target.value);
        onDateChange(newDate);
    };

    return (
        <div>
            <input
                type="range"
                min={0}
                max={new Date().getTime()}
                value={dateValue}
                onChange={handleSliderChange}
            />
        </div>
    );
};

export default Slider;