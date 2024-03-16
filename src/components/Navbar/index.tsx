// import { useState } from 'react';
import {
  Box,
  Typography,
  useTheme,
  InputBase,
  IconButton,
} from '@mui/material';
('@mui/material');
import FlexBetween from '../UI/FlexBetween';
import PixIcon from '@mui/icons-material/Pix';
import SearchIcon from '@mui/icons-material/Search';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setSearch } from '../../store/slice';

const Navbar = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const searchInput = useSelector((state: RootState) => state.search.search);

  console.log(searchInput);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(event.target.value));
  };

  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem">
      {/* LEFT - Logo */}
      <FlexBetween gap="0.75rem">
        <PixIcon sx={{ fontSize: '28px' }} />
        <Typography variant="h4" fontSize={'20px'} color={'black'} fontWeight={800}>
          Leave Management
        </Typography>
      </FlexBetween>
      {/* RIGHT - search bar */}
      <Box display="flex" bgcolor={palette.grey[200]} borderRadius={'3px'}>
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search"
          onChange={handleInputChange}
          value={searchInput}
        />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
    </FlexBetween>
  );
};

export default Navbar;
