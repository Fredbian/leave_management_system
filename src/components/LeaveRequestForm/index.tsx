import React, { useState } from 'react';
import {
  DialogContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { isWeekend, format } from 'date-fns';
import { SelectChangeEvent } from '@mui/material/Select';
import { Dispatch, SetStateAction } from 'react';

interface LeaveRequestFormProps {
  request: {
    startDate: Date | null;
    endDate: Date | null;
    leaveType: string;
    reason: string;
    assignedTo: string;
    leaveDays: number | null;
  };
  setRequest: Dispatch<
    SetStateAction<{
      startDate: Date | null;
      endDate: Date | null;
      leaveType: string;
      reason: string;
      assignedTo: string;
      leaveDays: number | null; 
    }>
  >;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSelectChange: (event: SelectChangeEvent<string>) => void;
  onCreate: () => void;
  onCancel: () => void;
}

const userList = [
  'User 1',
  'User 2',
  'User 3',
  'User 4',
  'User 5',
  'User 6',
  'User 7',
  'User 8',
  'User 9',
  'User 10',
];

const LeaveRequestForm: React.FC<LeaveRequestFormProps> = ({
  request,
  onChange,
  onSelectChange,
  onCreate,
  onCancel,
  setRequest,
}) => {

  const today = new Date();

  const calculateLeaveDays = (startDate: Date, endDate: Date) => {
    let days = 0;
    const currentDate = new Date(startDate);

    // console.log(currentDate);

    if (startDate > endDate) {
      return days;
    }

    currentDate.setDate(currentDate.getDate() + 1);

    while (currentDate <= endDate) {
      if (!isWeekend(currentDate)) {
        days++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // console.log(days);
    return days;
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;

    if (name === 'startDate' || name === 'endDate' || name === 'leaveType') {
      const dateValue = value ? new Date(value) : null; // Check if value is valid before creating Date object
      // console.log(dateValue);

      onChange(event as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
      if (name === 'startDate' || name === 'endDate') {
        const startDate = name === 'startDate' ? dateValue : request.startDate;
        const endDate = name === 'endDate' ? dateValue : request.endDate;

        if (!startDate || !endDate || startDate > endDate) { // Check if startDate or endDate is invalid
          setRequest(prevState => ({
            ...prevState,
            leaveDays: 0, 
            [name]: dateValue,
          }));
        } else {
          const days = calculateLeaveDays(startDate, endDate);
          console.log(days);
          
          setRequest(prevState => ({
            ...prevState,
            leaveDays: days, 
            [name]: dateValue,
          }));
        }
      }

      if (name === 'leaveType') {
        setRequest(prevState => ({
          ...prevState,
          leaveType: value,
        }));
      }
    } else {
      onChange(event as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
    }
  };

  const handleCreate = () => {
    onCreate();

    setRequest({
      startDate: null,
      endDate: null,
      leaveType: '',
      reason: '',
      assignedTo: '',
      leaveDays: 0
    });

  };

  return (
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        label="Start Date"
        type="date"
        fullWidth
        InputLabelProps={{ shrink: true }}
        name="startDate"
        value={request.startDate ? format(request.startDate, 'yyyy-MM-dd') : ''}
        onChange={handleInputChange}
      />
      <TextField
        margin="dense"
        label="End Date"
        type="date"
        fullWidth
        InputLabelProps={{ shrink: true }}
        name="endDate"
        value={request.endDate ? format(request.endDate, 'yyyy-MM-dd') : ''}
        onChange={handleInputChange}
      />

      <FormControl fullWidth margin="dense">
        <InputLabel>Leave Type</InputLabel>
        <Select
          value={request.leaveType}
          onChange={onSelectChange}
          name="leaveType"
        >
          <MenuItem value="Personal">Personal</MenuItem>
          <MenuItem value="Sick">Sick</MenuItem>
          <MenuItem value="Vacation">Vacation</MenuItem>
          <MenuItem value="Bereavement">Bereavement</MenuItem>
        </Select>
      </FormControl>
      <TextField
        margin="dense"
        label="Reason"
        type="text"
        fullWidth
        multiline
        rows={4}
        name="reason"
        value={request.reason}
        onChange={handleInputChange}
        inputProps={{ maxLength: 50 }}
      />
      <Box display="flex" justifyContent="flex-end">
        <Typography
          variant="caption"
          color={request.reason.length > 50 ? 'error' : 'inherit'}
        >
          {`${request.reason.length}/50`}
        </Typography>
      </Box>
      <FormControl fullWidth margin="dense">
        <InputLabel>Assign To</InputLabel>
        <Select
          value={request.assignedTo}
          onChange={handleInputChange}
          name="assignedTo"
        >
          {userList.map((user, index) => (
            <MenuItem key={index} value={user}>
              {user}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <p>Leave Days: {request.leaveDays}</p>
      <Button onClick={handleCreate}>Create</Button>
      <Button onClick={onCancel}>Cancel</Button>
    </DialogContent>
  );
};

export default LeaveRequestForm;
