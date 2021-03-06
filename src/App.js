import { Container, TableRow, Select, FormControl, InputLabel, TableContainer, Table, TableHead, TableBody, TableCell, Paper, MenuItem } from "@mui/material";
import ReactAudioPlayer from 'react-audio-player';

var timer = undefined;
var next_update = 0;

async function fetchMetadata(name) {
  const secondsSinceEpoch = Math.round(Date.now() / 1000);
  if (secondsSinceEpoch < next_update) {
    return "skip";
  }
  const response = await fetch("https://radio.tobycm.ga/api/" + name);
  const json = await response.json();
  return json;
}

async function loadRadio(choice) {

  if (timer !== undefined) {
    clearInterval(timer);
  }

  next_update = 0;

  timer = setInterval(async () => {
    await metadataLoop(choice.target.value);
  }, 1000);
  
  const audio_player = document.querySelector('#audio_player');
  audio_player.src = "https://radio.tobycm.ga/" + choice.target.value;
  audio_player.play();

}

async function metadataLoop(name) {

  const metadata = await fetchMetadata(name);
  if (metadata === "skip") {
    return;
  }
  const artist_text = document.querySelector('#artist_text');
  const title_text = document.querySelector('#title_text');
  artist_text.replaceChildren("Artist: " + metadata.artist);
  title_text.replaceChildren("Title: " + metadata.song);
  next_update = metadata.next_update;
  console.log(metadata.duration);

}

export default function App() {
    return (
      <Container>
        <link rel="stylesheet" href="css/style.css"/>
        <div className="radio_station" id="left_page">
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
        <ReactAudioPlayer
          src = ""
          controls
          id = "audio_player"
        />
        </div>

        <TableContainer component={Paper} className="radio_station" id="song_info_table">
          <Table sx={{ minWidth: 250 }} aria-label="simple table">
            <TableHead>
            <TableRow>
              <TableCell id="title_text">Title: </TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            <TableRow>
              <TableCell id="artist_text">Artist: </TableCell>
            </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        


      </Container>

      
      
  
    );
  }