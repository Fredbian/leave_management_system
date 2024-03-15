import { useState } from 'react';
import {
  useTheme,
  Button,
  Container,
  Dialog,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LeaveRequestForm from '@/components/LeaveRequestForm';
import { SelectChangeEvent } from '@mui/material/Select';


const Dashboard = () => {
  const { palette } = useTheme();
  const [open, setOpen] = useState(false);

  const [newRequest, setNewRequest] = useState({
    startDate: new Date(),
    endDate: new Date(),
    leaveType: '',
    reason: '',
    assignedTo: '',
  });

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewRequest({ ...newRequest, [name]: value });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => { 
    setNewRequest({ ...newRequest, leaveType: event.target.value });
  };

  const handleCreateRequest = () => {
    // TODO: add logic to create request
    console.log('New Leave Request:', newRequest);
    handleClose();
  };

  return (
    <Container>
      <Button
        startIcon={<AddIcon />}
        sx={{
          fontWeight: '900',
          bgcolor: `${palette.grey[100]}`,
          height: '37px',
        }}
        onClick={handleOpen}
      >
        Add Request
      </Button>
      <Dialog open={open}>
        <LeaveRequestForm
          request={newRequest}
          setRequest={setNewRequest}
          onChange={handleInputChange}
          onSelectChange={handleSelectChange}
          onCreate={handleCreateRequest}
          onCancel={handleClose}
        />
      </Dialog>
    </Container>
  );
};

export default Dashboard;
