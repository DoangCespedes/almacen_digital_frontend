import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";

export const InboxTable = ({ items, selectedStatus, selectedService }) => {
  // Detecta si es móvil
  const isMobile = window.innerWidth <= 768;

  // Filtrado de elementos según los filtros recibidos
  const filteredItems = items.filter((item) => {
    const matchesStatus =
      !selectedStatus || item.status.value === selectedStatus;
    const matchesService =
      !selectedService || item.service === selectedService;
    return matchesStatus && matchesService;
  });

  console.log(selectedStatus ,  'Aqui de verdad fue' )

  return (
    <TableContainer component={Paper} sx={{ mt: 4, boxShadow: 3 }}>
      {!isMobile ? (
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>Nro de Orden</TableCell>
              <TableCell>Tipo de Servicio</TableCell>
              <TableCell>Proveedor</TableCell>
              <TableCell>Poliza</TableCell>
              <TableCell>CI del Asegurado</TableCell>
              <TableCell>Nom. Asegurado</TableCell>
              <TableCell>Estatus</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((item, index) => (
              <TableRow key={index} hover>
                <TableCell>{item.orderNumber}</TableCell>
                <TableCell>{item.service}</TableCell>
                <TableCell>{item.provider}</TableCell>
                <TableCell>{item.policy}</TableCell>
                <TableCell>{item.ci}</TableCell>
                <TableCell>{item.insuredName}</TableCell>
                <TableCell>
                  <Chip
                    label={item.status.label}
                    sx={{
                      backgroundColor: item.status.color,
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  />
                </TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell align="center">
                  <IconButton size="small" title="Editar">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" title="Historial">
                    <HistoryIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Box>
          {filteredItems.map((item, index) => (
            <Paper key={index} sx={{ mb: 2, p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Nro de Orden: {item.orderNumber}
              </Typography>
              <Typography variant="body2">
                Tipo de Servicio: {item.service}
              </Typography>
              <Typography variant="body2">
                Proveedor: {item.provider}
              </Typography>
              <Typography variant="body2">Poliza: {item.policy}</Typography>
              <Typography variant="body2">
                CI del Asegurado: {item.ci}
              </Typography>
              <Typography variant="body2">
                Nom. Asegurado: {item.insuredName}
              </Typography>
              <Typography variant="body2">
                Estatus:{" "}
                <Chip
                  label={item.status.label}
                  sx={{
                    backgroundColor: item.status.color,
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                  size="small"
                />
              </Typography>
              <Typography variant="body2">Fecha: {item.date}</Typography>
              <Box mt={1}>
                <IconButton size="small" title="Editar">
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" title="Historial">
                  <HistoryIcon fontSize="small" />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </TableContainer>
  );
};
