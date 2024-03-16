import { useEffect, useState } from 'react';
import { useTheme, Button, Container, Dialog } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LeaveRequestForm from '@/components/LeaveRequestForm';
import { SelectChangeEvent } from '@mui/material/Select';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LeaveRequest } from '@/types';

const Dashboard = () => {
  const { palette } = useTheme();
  const [open, setOpen] = useState(false);

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

  // TEST
  useEffect(() => {
    console.log(leaveRequests);
  }, [leaveRequests])

  const [newRequest, setNewRequest] = useState({
    startDate: null as Date | null,
    endDate: null as Date | null,
    leaveType: '',
    reason: '',
    assignedTo: '',
    leaveDays: 0,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewRequest({ ...newRequest, [name]: value });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setNewRequest({ ...newRequest, leaveType: event.target.value });
  };

  const handleCreateRequest = (requestData: LeaveRequest) => {
    // TODO: add logic to create request
    console.log('New Leave Request:', newRequest);

    setLeaveRequests([...leaveRequests, requestData]);
    handleClose();

  };

  return (
    <Container>
      <ToastContainer />
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
          existingRequests={leaveRequests}
        />
      </Dialog>
    </Container>
  );
};

export default Dashboard;
