import { Container, TableRow, Select, FormControl, InputLabel, TableContainer, Table, TableHead, TableBody, TableCell, Paper, MenuItem } from "@mui/material";
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
              <TableHead>
              <TableRow>
                <TableCell id="artist_text">Artist: </TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
              <TableRow>
                <TableCell id="title_text">Title: </TableCell>
              </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Container>

        


      </Container>

      
      
  
    );
  }