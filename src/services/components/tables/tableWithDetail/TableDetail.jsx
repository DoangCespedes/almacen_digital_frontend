'use client';
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

const TableDetail = ({ title, tableData }) => {
  const [selectedRow, setSelectedRow] = useState(null);


  const handleRowClick = (row) => {
    setSelectedRow(selectedRow?.Numero_de_poliza === row.Numero_de_poliza ? null : row);
  };

  return (
    <Card sx={{ maxWidth: 900, margin: '20px auto', padding: 2 }}>
      <Typography variant="h5" component="div" gutterBottom>
        {title}
      </Typography>
      <CardContent>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>No Póliza</TableCell>
                <TableCell>Titular</TableCell>
                <TableCell>Vigencia</TableCell>
                <TableCell>Situación</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.length > 0 ? (
                tableData.map((row, index) => (
                  <React.Fragment key={index}>
                    <TableRow onClick={() => handleRowClick(row)}>
                      <TableCell>{row.Numero_de_poliza}</TableCell>
                      <TableCell>{row.Titular}</TableCell>
                      <TableCell>{row.Vigencia}</TableCell>
                      <TableCell>{row.Estado}</TableCell>
                    </TableRow>

                    {selectedRow?.Numero_de_poliza === row.Numero_de_poliza && row.Beneficiarios && (
                      <TableRow>
                        <TableCell colSpan={4}>
                          <strong>Beneficiarios:</strong>
                          <ul>
                            {row.Beneficiarios.map((beneficiario, i) => (
                              <li key={i}>{beneficiario}</li>
                            ))}
                          </ul>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                    No hay datos disponibles
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};


TableDetail.propTypes = {
  title: PropTypes.string.isRequired,
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      Numero_de_poliza: PropTypes.string.isRequired,
      Titular: PropTypes.string.isRequired,
      Vigencia: PropTypes.string.isRequired,
      Estado: PropTypes.string.isRequired,
      Beneficiarios: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};

export default TableDetail;
