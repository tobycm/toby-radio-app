import { Container, TableRow } from "@mui/material";
import { Select } from '@mui/material';
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { TableContainer } from "@mui/material";
import { Table } from "@mui/material";
import { TableCell } from "@mui/material";
import { Paper } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import ReactAudioPlayer from 'react-audio-player';

async function fetchMetadata(name) {
  const response = await fetch("https://radio.tobycm.ga/api/" + name);
  const json = await response.json();
  return json;
}

async function loadRadio(choice) {
  console.log(choice);
  await metadataLoop(choice.target.value);
  
}

async function metadataLoop(name) {

  const metadata = await fetchMetadata(name);
  console.log(metadata);
  const artist_text = document.querySelector('#artist_text');
  const title_text = document.querySelector('#title_text');
  artist_text.replaceChildren("Artist: " + metadata.artist);
  title_text.replaceChildren("Song: " + metadata.song);

  const audio_player = document.querySelector('#audio_player');
  audio_player.src = "https://radio.tobycm.ga/" + name;

}

export default function App() {
    return (
      <Container>
        <link rel="stylesheet" href="css/style.css"/>

        <FormControl fullWidth>
          <InputLabel id="radio-select-name">Station</InputLabel>
            <Select
              labelId="radio-select-name"
              value=""
              label="Station"
              onChange={loadRadio}
            >
              <MenuItem value={"edm"}>EDM</MenuItem>
              <MenuItem value={"lofi"}>Lofi</MenuItem>
              <MenuItem value={"moody"}>Moody</MenuItem>
            </Select>
        </FormControl>
        <Container>
          <ReactAudioPlayer
            src = ""
            controls
            id = "audio_player"
          />

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableRow>
                <TableCell id="artist_text">Artist: </TableCell>
              </TableRow>
              <TableRow>
                <TableCell id="title_text">Title: </TableCell>
              </TableRow>
            </Table>
          </TableContainer>
        </Container>

        


      </Container>

      
      
  
    );
  }