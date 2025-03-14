import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Radio,
} from '@mui/material';

const SimpleTableWithSelected = ({ 
  title, 
  columns, 
  tableData, 
  onRowSelect, 
  selectedRowTypePolicy, 
  setSelectedRowTypePolicy 
}) => {
  const handleRowClick = (row) => {
    setSelectedRowTypePolicy(row);
    if (onRowSelect) {
      onRowSelect(row);
    }
  };

  return (
    <Grid item xs={12}>
      <Card>
        {title && (
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              {title}
            </Typography>
          </CardContent>
        )}
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead sx={{ backgroundColor: '#213555' }}>
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col.field} sx={{ color: '#fff' }}>
                    <strong>{col.headerName}</strong>
                  </TableCell>
                ))}
                <TableCell padding="radio" />
              </TableRow>
            </TableHead>
            <TableBody>
  {tableData.map((row, index) => (
    <TableRow
      key={index}
      onClick={() => handleRowClick(row)}
      sx={{
        cursor: 'pointer',
        backgroundColor: selectedRowTypePolicy?.id === row.id ? '#e0e0e0' : 'inherit',
      }}
    >
      {columns.map((col) => (
        <TableCell key={col.field}>{row[col.field]}</TableCell>
      ))}
      <TableCell padding="radio">
        <Radio
          checked={selectedRowTypePolicy?.id === row.id}
          onChange={() => handleRowClick(row)}
          color="primary"
          inputProps={{ 'aria-label': `Seleccionar ${row[columns[0].field]}` }}
        />
      </TableCell>
    </TableRow>
  ))}
</TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Grid>
  );
};

SimpleTableWithSelected.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
    })
  ).isRequired,
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRowSelect: PropTypes.func,
  selectedRowTypePolicy: PropTypes.object,
  setSelectedRowTypePolicy: PropTypes.func.isRequired,
};

export default SimpleTableWithSelected;