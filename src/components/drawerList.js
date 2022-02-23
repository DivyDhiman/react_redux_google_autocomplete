import React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import Constant from "../utils/constant";
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';

export default function DrawerList(props) {

  const handleClick = (value) => {
    props.toggleDrawer(value)
  };

  return (
    <Box
      ml={2}
      role="presentation"
    >
      <List>
         <Grid container spacing={2}  mb={1} mt={1}>
         <Grid item xs={2}>
          <CloseIcon 
           onClick={() => {
            handleClick(false)
          }}/>
          </Grid>
          <Grid item xs={8} mb={2} >
          <Typography variant="h5" component="h5" align="center">
            Searched History
          </Typography>
        </Grid>
        </Grid>
        <Divider />
        {props.list.length > 0 ?
          props.list.map((text, index) => (
            <ListItem button key={index}>
              <ListItemIcon>
                <HistoryToggleOffIcon />
              </ListItemIcon>
              <ListItemText primary={text.address} />
            </ListItem>
          ))
          :
          <Typography variant="subtitle1" component="h5" align="center" mb={1} mt={1}>
            {Constant.noDataAvailable}
          </Typography>
        }
      </List>
    </Box>
  )
}