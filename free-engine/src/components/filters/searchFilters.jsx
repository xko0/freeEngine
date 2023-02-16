import * as React from 'react';
import { useState, useEffect } from 'react';
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
import { useFreelancesStore } from '../../context/FreelancesContext';
import { observer } from 'mobx-react';
import "./searchFilters.css"

export const SearchFilters = observer(({ selectedPlatforms, setSelectedPlatforms, selectedCities, setSelectedCities }) => {
  const freelancesStore = useFreelancesStore();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [priceOrder, setPriceOrder] = useState('');


  const handlePriceChange = (event) => {
    setPriceOrder(event.target.value)
    if (event.target.value == "croissant") {
      freelancesStore.getCroissantPrices()
    } else if (event.target.value == "décroissant") {
      freelancesStore.getDescendingPrices()
    }
  };

  const handlePriceRangeChange = (type) => {
    const minTextField = document.getElementById(`${type}MinTextField`);
    const maxTextField = document.getElementById(`${type}MaxTextField`);
  
    const min = parseInt(minTextField.value);
    const max = parseInt(maxTextField.value);
  
    let newMinValue = minValue;
    let newMaxValue = maxValue;
  
    if (isNaN(min) && isNaN(max)) {
      newMinValue = 0
      newMaxValue = type === 'hour' ? 500 : 5000;
    }
  
    if (!isNaN(min)) {
      newMinValue = min;
    }
  
    if (!isNaN(max)) {
      newMaxValue = max;
    }
  
    setMinValue(newMinValue);
    setMaxValue(newMaxValue);
  
    if (type === 'hour') {
      freelancesStore.getHourPricesRange(newMinValue, newMaxValue);
    } else if (type === 'day') {
      freelancesStore.getDayPricesRanges(newMinValue, newMaxValue);
    }
  
    minTextField.value = "";
    maxTextField.value = "";
  };

  const handlePlatformSelect = (platform) => {
    setSelectedPlatforms(platform)
  }

  const handleCitySelect = (city) => {
    setSelectedCities(city)
  };

  useEffect(() => {
    setSelectedPlatforms(selectedPlatforms)
    setSelectedCities(selectedCities)
  }, [selectedPlatforms, selectedCities])

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
        <Container id="filters"
          sx={{ 
            display: "flex", 
            alignItems: "center",
            justifyContent: "flex-start",
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
                onChange={(event, value) => handleCitySelect(value.map(e => e.title))}
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
                    label="Trier par villes (Malt et freelance.com)" 
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
                onChange={(value) => handlePlatformSelect(value.map(e => e.title))}
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
                  onChange={handlePriceChange}
                >
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
                fontFamily: "monospace",
                fontWeight: 600,
                zIndex: 1
              }}
              onClick={() => {}}
            >
              Filtrer
            </Button>
          </Box>
        </Container>
      </Container>
      <Container sx={{display: "flex"}}>
        <Typography id="price-range" variant= "body1" sx={{mr: "20%"}}>Prix à la journée</Typography>
        <Typography id="price-range" variant= "body1" sx={{ml: "20%"}}>Prix à l'heure</Typography>
      </Container>
      <Box sx={{ ml: "2%", mb: "2vh"}}>
        <TextField
          label="Minimum"
          id="dayMinTextField"
          defaultValue=""
          size="small"
          variant="standard"
          sx={{width: "10%", mr: "1%", mb: "2vh"}}
        />
        <TextField
          label="Maximum"
          id="dayMaxTextField"
          defaultValue=""
          size="small"
          variant="standard"
          sx={{width: "10%", ml: "1%", mb: "2vh"}}
        />
        <Button 
          className="btn btn-one-filters" 
          onClick={() => handlePriceRangeChange("day")} 
          sx={{ 
            width: "110px",
            height: "20px",
            color: "black", 
            fontFamily: 'monospace',
            fontWeight: 600,
            mb: "2vh"
          }}
        >
          - Trier -
        </Button>
        <TextField
          label="Minimum"
          id="hourMinTextField"
          defaultValue=""
          size="small"
          variant="standard"
          sx={{width: "10%", mr: "1%", mb: "2vh", ml: "18%"}}
        />
        <TextField
          label="Maximum"
          id="hourMaxTextField"
          defaultValue=""
          size="small"
          variant="standard"
          sx={{width: "10%", ml: "1%", mb: "2vh"}}
        />
        <Button 
          className="btn btn-one-filters"
          onClick={() => handlePriceRangeChange("hour")} 
          sx={{ 
            width: "110px",
            height: "20px",
            color: "black", 
            fontFamily: 'monospace',
            fontWeight: 600,
            mb: "2vh"
          }}
        >
          - Trier -
        </Button>
      </Box>
    </>
  );
});

const cities = [
  { title: 'Annecy'},
  { title: 'Bordeaux'},
  { title: 'Grenoble'},
  { title: 'Lille'},
  { title: 'Lyon'},
  { title: 'Marseille'},
  { title: 'Montpellier'},
  { title: 'Nantes'},
  { title: 'Nice'},
  { title: 'Paris'},
  { title: 'Strasbourg'},
  { title: 'Rennes'},
  { title: 'Toulouse'},
  { title: 'Tours'}
];

const MarketplaceFilters = [
  {title: "Malt.fr"},
  {title: "Freelance.com"},
  {title: "Upwork.com"},
  // {title: "Fiverr.com"},
  // {title: "Comeup.com"}
];