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
    startDate: Date;
    endDate: Date;
    leaveType: string;
    reason: string;
    assignedTo: string;
  };
  setRequest: Dispatch<SetStateAction<{
    startDate: Date;
    endDate: Date;
    leaveType: string;
    reason: string;
    assignedTo: string;
  }>>;
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
}) => {
  const [leaveDays, setLeaveDays] = useState<number | null>(null);
  const today = new Date();

  const calculateLeaveDays = (startDate: Date, endDate: Date) => {
    let days = 0;
    let currentDate = new Date(startDate);

    if (startDate > endDate) {
      return days;
    }

    currentDate.setDate(currentDate.getDate() + 1);

    while (currentDate < endDate) {
      if (!isWeekend(currentDate)) {
        days++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;
  };

  // const handleInputChange = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  // ) => {
  //   const { name, value } = event.target;
  //   onChange(event);
  //   if (name === 'startDate' || name === 'endDate' || name === 'assignedTo') {
  //     const startDate = new Date(request.startDate);
  //     const endDate = new Date(request.endDate);
  //     const days = calculateLeaveDays(startDate, endDate);
  //     setLeaveDays(days);
  //   }
  // };
 
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;
  
    if (name === 'startDate' || name === 'endDate' || name === 'leaveType') {
      // 处理日期字段的格式化和更新
      const dateValue = new Date(value);
      onChange(event);
      if (name === 'startDate' || name === 'endDate') {
        const startDate = name === 'startDate' ? dateValue : request.startDate;
        const endDate = name === 'endDate' ? dateValue : request.endDate;
        const days = calculateLeaveDays(startDate, endDate);
        setLeaveDays(days);
      }
  
      // 处理 leaveType 字段的更新
      if (name === 'leaveType') {
        setRequest(prevState => ({
          ...prevState,
          leaveType: value,
        }));
      }
    } else {
      onChange(event);
    }
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
        value={format(request.startDate, 'yyyy-MM-dd')}
        onChange={handleInputChange}
        inputProps={{
          min: format(today, 'yyyy-MM-dd'),
        }}
      />
      <TextField
        margin="dense"
        label="End Date"
        type="date"
        fullWidth
        InputLabelProps={{ shrink: true }}
        name="endDate"
        value={format(request.endDate, 'yyyy-MM-dd')}
        onChange={handleInputChange}
        inputProps={{
          min: format(new Date(), 'yyyy-MM-dd'),
        }}
      />
     
      <FormControl fullWidth margin="dense">
        <InputLabel>Leave Type</InputLabel>
        <Select value={request.leaveType} onChange={onSelectChange} name="leaveType">
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
        <Typography variant="caption" color={request.reason.length > 50 ? 'error' : 'inherit'}>
          {`${request.reason.length}/50`}
        </Typography>
      </Box>
      <FormControl fullWidth margin="dense">
        <InputLabel>Assign To</InputLabel>
        <Select value={request.assignedTo} onChange={handleInputChange} name="assignedTo">
          {userList.map((user, index) => (
            <MenuItem key={index} value={user}>
              {user}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <p>Leave Days: {leaveDays}</p>
      <Button onClick={onCreate}>Create</Button>
      <Button onClick={onCancel}>Cancel</Button>
    </DialogContent>
  );
};

export default LeaveRequestForm;