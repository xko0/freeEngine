import * as React from 'react';
import { useState } from 'react';
import { observer } from "mobx-react-lite"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Container from '@mui/material/Container';
import "./searchbar.css"
import { useFreelancesStore } from '../../context/FreelancesContext';

export const SearchBar = observer (() => {
  const freelancesStore = useFreelancesStore()
  const [specialty, setSpecialty] = useState("")
  const [location, setLocation] = useState("")

  function getFreelances(specialty) {
    let encodedSpecialty = encodeURI(specialty)
    freelancesStore.getFreelances(encodedSpecialty)
    // freelancesStore.getFreelanceCom(encodedSpecialty)
    //freelancesStore.getFiverrFreelances(encodedSpecialty)
  }

  return (
    <>
      <Container sx={{ minWidth: "200px", marginTop: "2vh", display: "flex", alignItems: "center", flexDirection: "column"}}>
        <Box
          sx={{
            width: "60%",
            backgroundColor: "whitesmoke",
            borderRadius: "5px"
          }}
        >
          <TextField 
            fullWidth label="Recherchez un freelance par spécialité" 
            id="fullWidth"
            value={specialty}
            onChange={(e) => {setSpecialty(e.target.value)}}
          />
        </Box>
        <Stack direction="row" spacing={2} sx={{ width: "60%", marginTop: "2vh"}}>
        <TextField 
            sx={{
              width: "60%",
              backgroundColor: "whitesmoke",
              borderRadius: "5px"
            }}
            label="Ville (defaut: toute la France)"
            id="free-solo-demo"
            value={location}
            onChange={(e) => {setLocation(e.target.value)}}
          />
          {/* <Autocomplete
            id="free-solo-demo"
            freeSolo
            sx={{ width: "70%",
              backgroundColor: "whitesmoke",
              borderRadius: "5px"
            }}
            options={villesDeFrance.map((option) => option.title)}
            renderInput={(params) => <TextField 
              {...params} 
              label="Ville (recherche en France si laissé vide)" 
              value={location}
              onChange={(e) => {setLocation(e.target.value)}}
            />}>
          </Autocomplete> */}
          <Button variant="contained" 
            endIcon={<SendIcon />}
            sx={{ 
              Width: "auto", 
              minWidth: "120px", 
              backgroundColor: "rgba(73,115,255,1)"
            }}
            onClick={() => {getFreelances(specialty, location)}}
          >
            Chercher
          </Button>
        </Stack>
      </Container>
    </>
  );
});

// const villesDeFrance = [
//   { title: 'Paris', pays: "france" },
//   { title: 'Marseille', pays: "france" },
//   { title: 'Lyon', pays: "france" },
//   { title: 'Toulouse', pays: "france" },
//   { title: 'Nice', pays: "france" },
//   { title: 'Nantes', pays: "france" },
//   { title: 'Montpellier', pays: "france" },
//   { title: 'Strasbourg', pays: "france" },
//   { title: 'Bordeaux', pays: "france" },
//   { title: 'Lille', pays: "france" }
// ];