import React from 'react';
import { MenuItem, Select } from '@mui/material';

const SelectCustomer = ({ options = [], onChange, placeholder = "", label, padding}) => {
  return (
    <Select
      defaultValue=""
      onChange={onChange}
      displayEmpty
      disablePortal
      label={label}
      MenuProps={{
        disableScrollLock: true, 
      }}
      sx={{
        // mt: 2,
        width: '100%',
        backgroundColor: '#f9f9f9',
        borderRadius: 1,
        '& .MuiSelect-select': {
        padding: {padding},
          fontSize: '14px',
        },
      }}
    >
      <MenuItem value="" disabled>
        {placeholder}
      </MenuItem>
      {options.map((option, index) => (
        <MenuItem key={index} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectCustomer;
