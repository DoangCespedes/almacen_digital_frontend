import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TablePagination from '@mui/material/TablePagination';

const ReusableTable = ({ title, columns, tableData, onRowSelect }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null); 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Puedes cambiar a 10 si prefieres.

  const handleRowClick = (row) => {
    setSelectedRow(row);
    if (onRowSelect) {
      onRowSelect(row);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Regresar a la primera página al cambiar el número de filas por página.
  };

  const paginatedData = tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Grid item xs={12} md={12} marginTop={3}>
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
            <TableHead>
              <TableRow sx={{backgroundColor:'#213555'}}>
                {columns.map((col) => (
                  <TableCell key={col.field} sx={{color:'#fff'}}>
                    <strong>{col.headerName}</strong>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleRowClick(row)}
                  onMouseEnter={() => setHoveredRow(row)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor:
                      row === selectedRow
                        ? '#e0e0e0ee'
                        : row === hoveredRow
                        ? '#f5f5f5'
                        : 'inherit',
                  }}
                >
                  {columns.map((col) => (
                    <TableCell key={col.field}>
                      {col.renderCell ? col.renderCell({ value: row[col.field], row }) : row[col.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Grid>
  );
};

ReusableTable.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
    })
  ).isRequired,
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRowSelect: PropTypes.func,
};

export default ReusableTable;