import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export default function SelectedSliceTime() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (event, index) => {
    console.log(event)
    setSelectedIndex(index);
  };
  return (
    <Box sx={{ width: '50%',height:'40px', maxWidth: 100, bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}>
        <ListItemText primary="all" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}>
          <ListItemText primary="last week" />
        </ListItemButton>     
       <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}>
          <ListItemText primary="last month" />
        </ListItemButton>
      </List>
      <Divider />
    </Box>
  );
}
