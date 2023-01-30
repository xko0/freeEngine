import * as React from 'react';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import { useFreelancesStore } from '../../context/FreelancesContext';

export default function SideMenu({ selectedPlatforms, setSelectedPlatforms, selectedCities, setSelectedCities }) {
  const [priceOrder, setPriceOrder] = useState('');
  const freelancesStore = useFreelancesStore();

  const handlePlatformSelect = (platform) => {
    if (platform.checked) {
       setSelectedPlatforms([...selectedPlatforms, platform.parentElement.title])
    } else {
       setSelectedPlatforms(selectedPlatforms.filter(p=>p !== platform.parentElement.title))
    }
  };

  const handlePriceChange = (event) => {
    setPriceOrder(event.target.value)
    if (event.target.value == "croissant") {
      freelancesStore.getCroissantPrices()
    } else if (event.target.value == "décroissant") {
      freelancesStore.getDescendingPrices()
    }
  };

  const handleCitySelect = (city) => {
    if (city.checked) {
      setSelectedCities([...selectedCities, city.parentElement.title])
    } else {
      setSelectedCities(selectedCities.filter(p=>p !== city.parentElement.title))
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <FormControl sx={{ mb: 2 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Afficher plateforme</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox onChange={(e) => handlePlatformSelect(e.target)} title="Malt.fr" />
              }
              label="Malt.fr"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={(e) => handlePlatformSelect(e.target)} title="Freelance.com" />
              }
              label="Freelance.com"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={(e) => handlePlatformSelect(e.target)} title="Fiverr.com" />
              }
              label="Fiverr.com"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={(e) => handlePlatformSelect(e.target)} title="Comeup.com" />
              }
              label="Comeup.com"
            />
          </FormGroup>
        </FormControl>
      </Box>
      <FormControl sx={{ mb: 2 }}>
        <FormLabel id="demo-controlled-radio-buttons-group">Ordre de prix</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={priceOrder}
          onChange={handlePriceChange}
        >
          <FormControlLabel value="croissant" control={<Radio />} label="croissant" />
          <FormControlLabel value="décroissant" control={<Radio />} label="décroissant" />
        </RadioGroup>
      </FormControl>
      <Box sx={{ display: 'flex' }}>
        <FormControl sx={{ mb: 2 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Afficher par ville</FormLabel>
          <FormGroup>
          <FormControlLabel
              control={
                <Checkbox onChange={(e) => handleCitySelect(e.target)} title="Annecy" />
              }
              label="Annecy"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={(e) => handleCitySelect(e.target)} title="Bordeaux" />
              }
              label="Bordeaux"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={(e) => handleCitySelect(e.target)} title="Grenoble" />
              }
              label="Grenoble"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={(e) => handleCitySelect(e.target)} title="Lille" />
              }
              label="Lille"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={(e) => handleCitySelect(e.target)} title="Lyon" />
              }
              label="Lyon"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={(e) => handleCitySelect(e.target)} title="Marseille" />
              }
              label="Marseille"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={(e) => handleCitySelect(e.target)} title="Montpellier" />
              }
              label="Montpellier"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={(e) => handleCitySelect(e.target)} title="Nantes" />
              }
              label="Nantes"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={(e) => handleCitySelect(e.target)} title="Nice" />
              }
              label="Nice"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={(e) => handleCitySelect(e.target)} title="Paris" />
              }
              label="Paris"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={(e) => handleCitySelect(e.target)} title="Rennes" />
              }
              label="Rennes"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={(e) => handleCitySelect(e.target)} title="Strasbourg" />
              }
              label="Strasbourg"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={(e) => handleCitySelect(e.target)} title="Toulouse" />
              }
              label="Toulouse"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={(e) => handleCitySelect(e.target)} title="Tours" />
              }
              label="Tours"
            />
          </FormGroup>
        </FormControl>
      </Box>      
    </>
  );
}
