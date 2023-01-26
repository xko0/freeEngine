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
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';


export default function SideMenu({ selectedPlatforms, setSelectedPlatforms }) {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [priceOrder, setPriceOrder] = useState('croissant');

  const handlePriceChange = (event) => {
    setPriceOrder(event.target.value)
  };

  const handlePlatformSelect = (platform) => {
    if(platform.checked)
       setSelectedPlatforms([...selectedPlatforms, platform.parentElement.title])
    else{
       setSelectedPlatforms(selectedPlatforms.filter(p=>p !== platform.parentElement.title))
    }
  }

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
      <FormControl>
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
    </>
  );
}
