import React from 'react';
import { TextField, Button } from '@mui/material';
import { format, addDays, isWeekend } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers';

interface DatePickerProps {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({ label, value, onChange }) => {
  const today = new Date();

  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} />}
      minDate={today}
      maxDate={addDays(today, 365)}
      disablePast
      renderDay={(date) => {
        const isDisabled = isWeekend(date) || date < today;
        return (
          <Button
            color={date.getMonth() !== value.getMonth() ? 'inherit' : isDisabled ? 'inherit' : 'primary'}
            disabled={isDisabled}
            style={{ minWidth: 36 }}
            onClick={() => onChange(date)}
          >
            {date.getDate()}
          </Button>
        );
      }}
    />
  );
};

export default CustomDatePicker; 