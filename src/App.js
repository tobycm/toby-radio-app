import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

var test = 30;

function fetchmetadata() {
    fetch('/api/metadata')
        .then(res => console.log(res))
        .catch(err => console.log(err));
}

export default function App() {
    return (
      <Container maxwidth="false">
        <link rel="stylesheet" href="css/style.css"/>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                News
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </Box>
  
        <br />

        <Button variant="contained" color="primary">
          Hello World
        </Button>

        <br />

        <Select
            value = {test}
            label = "Select"
            onChange = {fetchmetadata}
        >
            <MenuItem value = {30}>30</MenuItem>
            <MenuItem value = {40}>40</MenuItem>
            <MenuItem value = {50}>50</MenuItem>
            <MenuItem value = {60}>60</MenuItem>
        </Select>
      </Container>
      
  
    );
  }