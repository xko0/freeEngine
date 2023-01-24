import * as React from 'react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function SearchFilters() {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <Stack spacing={2} sx={{ width: 500 }}>
      <Autocomplete
        multiple
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
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </li>
        )}
        style={{ width: "50%" }}
        renderInput={(params) => (
          <TextField 
            {...params} 
            label="Trier par villes" 
            placeholder="Choisir dans la liste" 
            sx={{ borderRadius: "8px", backgroundColor: "white"}}
          />
        )}
      />
    </Stack>
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
  { title: 'Toulouse'},
];