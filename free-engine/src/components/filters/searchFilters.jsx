import * as React from 'react';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';

import "./searchFilters.css"

export default function SearchFilters({ selectedPlatforms, setSelectedPlatforms }) {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [priceOrder, setPriceOrder] = useState('');
  
  const handlePriceChange = (event) => {
    setPriceOrder(event.target.value)
  };

  const handlePlatformSelect = (platform) => {
    setSelectedPlatforms(platform)
  }

  // function displayFilters() {
  //   var element = document.getElementById("filters")
    
  //   if (element.classList.contains("hiddenContainer")) {
  //     element.classList.remove("hiddenContainer")
  //     element.style.visibility = "hidden"
  //     element.style.width = "20%"
  //   } else {
  //     element.classList.add("hiddenContainer")
  //     element.style.width = "100%"
  //     element.style.visibility = "visible"
  //   }
  // }

  return (
    <>
      <Typography 
        variant= "body" 
        marginLeft={"2vh"} 
        sx= {{ color: "white"}}
      >
        Filtres:
      </Typography>
      <Container
        sx={{ 
          minWidth: "80px",
          maxWith: "200px",
          height: "80px",
          display: "flex", 
          alignItems: "center",
          ml: -3.5,
          justifyContent: "flex-start", 
          flexDirection: "row"
        }}
      >
        <Box>
          {/* <Button variant="contained" 
            endIcon={<SendIcon />}
            sx={{ 
              Width: "auto", 
              minWidth: "120px",
              height: "40px", 
              backgroundColor: "rgba(73,115,255,1)",
              borderRadius: "5px",
              zIndex: 1
            }}
            onClick={() => {displayFilters()}}
          >
            Filtres
          </Button> */}
        </Box>
        <Container id="filters"
          sx={{ 
            // Width: "0px",
            display: "flex", 
            alignItems: "center",
            justifyContent: "flex-start",
            // transition: "all 0.3s ease",
            // visibility: "hidden"
          }}
        >
          <Stack sx={{ width: "30%", maxWidth: "250px" }}>
            <Box
              sx={{
                width: "100%",
                backgroundColor: "whitesmoke",
                borderRadius: "5px",
              }}
            >
              <Autocomplete
                multiple
                limitTags={1}
                id="checkboxes-tags-demo"
                size="small"
                options={cities}
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ }}
                      checked={selected}
                    />
                    {option.title}
                  </li>
                )}
                style={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    label="Trier par villes" 
                    placeholder="Choisir dans la liste" 
                    sx={{ borderRadius: "5px", backgroundColor: "white"}}
                  />
                )}
              />
            </Box>
          </Stack>
          <Stack sx={{ width: "30%", maxWidth: "250px" }}>
            <Box
              sx={{
                width: "100%",
                backgroundColor: "whitesmoke",
                borderRadius: "5px",
                m: 2
              }}
            >
              <Autocomplete
                limitTags={1}
                multiple
                id="checkboxes-tags-demo"
                size="small"
                options={MarketplaceFilters}
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                onChange={(event, value) => handlePlatformSelect(value.map(e => e.title))}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 0 }}
                      checked={selected}
                    />
                    {option.title}
                  </li>
                )}
                style={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    label="Afficher uniquement: " 
                    placeholder="Choisir les plateformes" 
                    sx={{ borderRadius: "5px", backgroundColor: "white"}}
                  />
                )}
              />
            </Box>
          </Stack>
          <Stack sx={{ width: "30%", maxWidth: "250px" }}>
            <Box
              sx={{
                width: "100%",
                backgroundColor: "whitesmoke",
                borderRadius: "5px",
                m: 4
              }}
            >
              <FormControl sx={{ minWidth: "100%" }} size= "small">
                <InputLabel id="demo-select-small">Trier par prix</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={priceOrder}
                  label="priceOrder"
                  onSelect={handlePriceChange}
                >
                  <MenuItem value="">
                    <em>Aucun</em>
                  </MenuItem>
                  <MenuItem value={"croissant"}>Prix croissants</MenuItem>
                  <MenuItem value={"décroissant"}>Prix décroissants</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>
          <Box>
            <Button variant="contained" 
              endIcon={<SendIcon />}
              sx={{
                ml: 6, 
                Width: "auto", 
                minWidth: "120px",
                height: "40px", 
                backgroundColor: "rgba(73,115,255,1)",
                borderRadius: "5px",
                zIndex: 1
              }}
              onClick={() => {}}
            >
              Filtrer
            </Button>
          </Box>
        </Container>
      </Container>
    </>
  );
}
const cities = [
  { title: 'Bordeaux'},
  { title: 'Lille'},
  { title: 'Lyon'},
  { title: 'Marseille'},
  { title: 'Montpellier'},
  { title: 'Nantes'},
  { title: 'Nice'},
  { title: 'Paris'},
  { title: 'Strasbourg'},
  { title: 'Toulouse'}
];

const MarketplaceFilters = [
  {title: "Malt.fr"},
  {title: "Freelance.com"},
  {title: "Fiverr.com"},
  {title: "Comeup.com"}
];