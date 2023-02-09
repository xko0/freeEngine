import * as React from 'react';
import { useState, useEffect } from 'react';
import { observer } from "mobx-react-lite"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Container from '@mui/material/Container';
import { useFreelancesStore } from '../../context/FreelancesContext';
import { useLawyersStore } from '../../context/LawyersContext';
import "./searchbar.css"

export const SearchBar = observer (() => {
  const freelancesStore = useFreelancesStore();
  const laywersStore = useLawyersStore();
  const [specialty, setSpecialty] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [marketplaces, setMarketplaces] = useState(["Choisir catégorie"]);

  function getFreelances(specialty, city, platforms) {
    const freelancesPlatforms = {
      "Malt.fr": freelancesStore.getFreelances,
      "Freelance.com": freelancesStore.getFreelanceCom,
      "Fiverr.com": freelancesStore.getFiverrFreelances,
      "Comeup.com": freelancesStore.getFreelancesComeup,
      "Meetlaw.fr": laywersStore.getMeetlaw,
    };
  
    let encodedSpecialty = encodeURI(specialty);
    let encodedCity = encodeURI(city)
    let requestedPlatforms = platforms.length === 0 ? Object.keys(freelancesPlatforms) : platforms;
    
    requestedPlatforms.forEach(platform => {
      if (freelancesPlatforms[platform]) {
        freelancesPlatforms[platform](encodedSpecialty, encodedCity);
      }
    });
  }

  const handlePlatformChange = (event) => {
    const {
      target: { value },
    } = event;
    setPlatforms(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const marketplacesByCategory = {
    "Avocats": lawyersMarket,
    "Comptables": accountantMarket,
    "Entreprises de l'hôtellerie": hotelCompanies,
    "Fournisseurs logistique industriels": industrialSuppliersMarket,
    "Freelances IT": freelancesMarket,
    "Services numeriques": numericServicesMarket,
    "Services secteur ferroviaire": railwaySectorMarket,
    "Dépanneurs, bricoleurs et travaux": workersMarket
  }
  
  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setMarketplaces(marketplacesByCategory[value] || []);
    setCategory(typeof value === 'string' ? value.split(',') : value)
  };

  useEffect(() => {
    let element = document.getElementById("cities-field")
    if (marketplaces == lawyersMarket) {
      element.classList.remove("hide")
    } else {
      element.classList.add("hide")
    }
  }, [marketplaces])

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <>
      <Container 
        sx={{ minWidth: "200px", 
          marginTop: "2%", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          flexDirection: "row"
        }}
      >
        <Box 
          sx={{ m: 2, width: "40%"}}
        >
          <div>
            <FormControl sx={{ width: "100%"}}>
              <InputLabel id="demo-multiple-name-label">Catégorie de recherche...</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                value={category}
                onChange={handleCategoryChange}
                input={<OutlinedInput label="Platformes" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
                sx={{ borderRadius: "5px", backgroundColor: "white"}}
              >
                {marketplaceCategories.map((marketplaceCategory) => (
                  <MenuItem
                    key={marketplaceCategory}
                    value={marketplaceCategory}
                  >
                    <Checkbox checked={category.indexOf(marketplaceCategory) > -1} />
                    <ListItemText primary={marketplaceCategory} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Box>
        <Box
          sx={{
            width: "40%",
            backgroundColor: "whitesmoke",
            borderRadius: "5px",
            m: 2
          }}
        >
          <TextField 
            fullWidth label="Recherchez par spécialité..." 
            id="fullWidth"
            value={specialty}
            onChange={(e) => {setSpecialty(e.target.value)}}
          />
        </Box>
        <Box 
          sx={{ m: 2, width: "30%"}}
        >
          <div>
            <FormControl sx={{ width: "100%"}}>
              <InputLabel id="demo-multiple-name-label">Plateformes... (défaut: toutes)</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={platforms}
                onChange={handlePlatformChange}
                input={<OutlinedInput label="Platformes" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
                sx={{ borderRadius: "5px", backgroundColor: "white"}}
              >
                {marketplaces.map((marketplace) => (
                  <MenuItem
                    key={marketplace}
                    value={marketplace}
                  >
                    <Checkbox checked={platforms.indexOf(marketplace) > -1} />
                    <ListItemText primary={marketplace} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Box>
        <Box id='cities-field'
          sx={{
            width: "30%",
            backgroundColor: "whitesmoke",
            borderRadius: "5px",
            m: 2
          }}
        >
          <TextField 
            fullWidth label="ville..." 
            id="fullWidth"
            value={city}
            required
            onChange={(e) => {setCity(e.target.value)}}
          />
        </Box>
        <Box sx={{m: 2}}>
          <Button variant="contained" 
            endIcon={<SendIcon />}
            sx={{ 
              Width: "auto", 
              minWidth: "120px",
              height: "40px", 
              backgroundColor: "rgba(73,115,255,1)",
              borderRadius: "5px"
            }}
            onClick={() => {getFreelances(specialty, city, platforms)}}
          >
            Chercher
          </Button>
        </Box>
      </Container>
    </>
  );
});

const marketplaceCategories = [
  "Avocats",
  "Comptables",
  "Entreprises de l'hôtellerie",
  "Fournisseurs logistique industriels",
  "Freelances IT",
  "Services numeriques",
  "Services secteur ferroviaire",
  "Dépanneurs, bricoleurs et travaux"
]

const lawyersMarket = [
  "Meetlaw.fr",
  "Justifit.fr"
]

const accountantMarket = [
  "Leboncomptable.com",
  "Bbigger.fr"
]

const industrialSuppliersMarket = [
  "Usinenouvelle.com",
  "Directindustry.fr"
]

const hotelCompanies = [
  "Foodhoteltech.com"
]

const workersMarket = [
  "Izi-by-edf.fr",
  "Yoojo.fr",
  "Jemepropose.com",
  "Aladom.fr"
]

const numericServicesMarket = [
  "Ccistore.fr"
]

const railwaySectorMarket = [
  "Station-one.com"
]

const freelancesMarket = [
  'Malt.fr',
  'Freelance.com',
  'Fiverr.com',
  'Comeup.com'
]
