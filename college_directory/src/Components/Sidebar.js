import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';

const Sidebar = ({ list, setActiveComponent }) => {
  return (
    <Box width="250px" bgcolor="#f0f0f0" padding={2}>
      <List>
        {list.map((item) => (
          <ListItem button key={item} onClick={() => setActiveComponent(item)}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
