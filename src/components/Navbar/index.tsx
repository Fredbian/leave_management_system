import { useState } from 'react';
import {
  Box,
  Typography,
  useTheme,
  InputBase,
  IconButton,
} from '@mui/material';
'@mui/material';
import FlexBetween from '../UI/FlexBetween';
import PixIcon from '@mui/icons-material/Pix';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
  const { palette } = useTheme();


  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      {/* LEFT - Logo */}
      <FlexBetween gap="0.75rem">
        <PixIcon sx={{ fontSize: '28px' }} />
        <Typography variant="h4" fontSize={'16px'}>
          Leave Management
        </Typography>
      </FlexBetween>
      {/* RIGHT - search bar */}
      <Box display="flex" bgcolor={palette.grey[100]} borderRadius={'3px'}>
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box> 
    </FlexBetween>
  );
};

export default Navbar;
