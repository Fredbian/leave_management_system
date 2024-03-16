import { useEffect, useState } from 'react';
import { useTheme, Button, Container, Dialog, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LeaveRequestForm from '@/components/LeaveRequestForm';
import { SelectChangeEvent } from '@mui/material/Select';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LeaveRequest } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


const Dashboard = () => {
  const { palette } = useTheme();
  const [open, setOpen] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

  // --- TEST ---
  useEffect(() => {
    console.log(leaveRequests);
  }, [leaveRequests]);
  // ----------

  const [newRequest, setNewRequest] = useState({
    id: '',
    startDate: null as Date | null,
    endDate: null as Date | null,
    leaveType: '',
    reason: '',
    assignedTo: '',
    leaveDays: 0,
  });

// Define columns for the Data Grid
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'assignedTo',
    headerName: 'Assigned To',
    width: 130,
    editable: true,
  },
  { field: 'leaveDays', headerName: 'Leave Days', width: 130 },
  { field: 'leaveType', headerName: 'Leave Type', width: 110 },
  { field: 'startDate', headerName: 'Start Date', width: 160 },
  { field: 'endDate', headerName: 'End Date', width: 160 },
  { field: 'reason', headerName: 'Reason', width: 200 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 120,
    renderCell: (params) => (
      <>
        <IconButton
          onClick={() => handleEdit(params.row)}
          aria-label="edit"
          sx={{ bgcolor: 'gray', mr: '10px' }}
        >
          <EditIcon sx={{ color: `white` }} />
        </IconButton>
        <IconButton
          onClick={() => handleDelete(params.row.id)}
          aria-label="delete"
          sx={{ bgcolor: 'gray' }}
        >
          <DeleteIcon sx={{ color: `white` }} />
        </IconButton>
      </>
    ),
  },
];


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
    // console.log('New Leave Request:', newRequest);

    const id = uuidv4();

    setLeaveRequests([...leaveRequests, { ...requestData, id }]);
    handleClose();
  };

  const handleEdit = (row: LeaveRequest) => {
    // Handle edit action here
    console.log('Edit Row:', row);
  };

  const handleDelete = (rowId: string) => {
    console.log('Delete Row:', rowId);
    // Handle delete action here
    const updatedRequests = leaveRequests.filter((request) => request.id !== rowId);
    setLeaveRequests(updatedRequests);
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

      <div style={{ height: 700, width: '100%', marginTop: 20 }}>
        <DataGrid
          rows={leaveRequests}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          sx={{ color: `${palette.grey[100]}` }}
        />
      </div>
    </Container>
  );
};

export default Dashboard;
