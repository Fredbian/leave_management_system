import { useEffect, useState } from 'react';
import { useTheme, Button, Container, Dialog } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import LeaveRequestForm from '@/components/LeaveRequestForm';
import { SelectChangeEvent } from '@mui/material/Select';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LeaveRequest } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';



const Dashboard = () => {
  const { palette } = useTheme();
  const [open, setOpen] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const searchInput = useSelector((state: RootState) => state.search.search )

  // Filter leaveRequests based on search input
  const filteredRequests = leaveRequests.filter(request =>
    Object.values(request).some(value =>
      typeof value === 'string' && value.toLowerCase().includes(searchInput.toLowerCase())
    )
  );

  // Determine which data to display based on search input
  const dataToDisplay = searchInput ? filteredRequests : leaveRequests;

  // --- TEST ---
  console.log(searchInput);
  
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
      type: 'singleSelect',
      valueOptions: [
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
      ],
      editable: true,
    },
    {
      field: 'leaveDays',
      headerName: 'Leave Days',
      width: 130,
      type: 'number',
      editable: true,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'leaveType',
      headerName: 'Leave Type',
      width: 110,
      type: 'singleSelect',
      editable:true,
      valueOptions: ['Personal', 'Sick', 'Vacation', 'Bereavement'],
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      width: 160,
      type: 'date',
      editable: true,
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      width: 160,
      type: 'date',
      editable: true,
    },
    { field: 'reason', headerName: 'Reason', width: 200, editable: true },   
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
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

  // ----- DATA GRID ROW EDIT ---------
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    // Handle delete action here
    const updatedRequests = leaveRequests.filter(
      (request) => request.id !== id
    );
    setLeaveRequests(updatedRequests);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = leaveRequests.find((request) => request.id === id);
    if (editedRow!.isNew) {
      setLeaveRequests(leaveRequests.filter((request) => request.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow as LeaveRequest, isNew: false };
    setLeaveRequests(leaveRequests.map((request) => (request.id === newRow.id ? updatedRow : request)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  // -------------

  return (
    <Container>
      <ToastContainer />
      <Button
        startIcon={<AddIcon />}
        sx={{
          fontWeight: '900',
          bgcolor: `${palette.grey[200]}`,
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

      <div style={{ height: 550, width: '100%', marginTop: 20 }}>
        <DataGrid
          rows={dataToDisplay}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          sx={{ fontWeight: '500', boxShadow:2, border: 2, borderColor: 'black' }}
        />
      </div>
    </Container>
  );
};

export default Dashboard;
