import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
    Avatar,
    Box,
    Grid,
    IconButton,
    Paper,
    Typography,
} from "@mui/material";

import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Chip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/slices/products/productThunks";

export const ProductsPage = () => {
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

    const getButtonsActions = () => {
        return (
            <>
                <IconButton color="info" title="Editar">
                    <DriveFileRenameOutlineIcon
                        fontSize="medium"
                        color="info"
                    />
                </IconButton>

                <IconButton color="warning" title="Deshabilitar Usuario">
                    <DeleteOutlineIcon fontSize="medium" color="danger" />
                </IconButton>
            </>
        );
    };

    const columns = [
        {
            flex: 0.1,
            field: "id",
            headerName: "ID",
            minWidth: 50,
        },

        {
            flex: 0.15,
            field: "image",
            headerName: "Imagen",
            minWidth: 100,
            renderCell: ({ row }) => {
                return (
                    <Avatar
                        alt="Remy Sharp"
                        src={row.images[0]}
                        sx={{ width: 40, height: 40 }}
                    />
                );
            },
        },

        {
            flex: 0.25,
            field: "title",
            headerName: "Producto",
            minWidth: 150,
        },
        {
            flex: 0.5,
            field: "description",
            headerName: "Detalle",
            minWidth: 150,
        },
        {
            flex: 0.25,
            field: "category",
            headerName: "Categoria",
            minWidth: 150,
        },
        {
            flex: 0.1,
            field: "price",
            headerName: "Precio",
            minWidth: 120,
            renderCell: ({ row }) => {
                return <Typography>{row.price}</Typography>;
            },
        },
        {
            flex: 0.15,
            field: "stock",
            headerName: "Stock",
            minWidth: 150,
            renderCell: ({ row }) => {
                return (
                    <Box>
                        <Chip
                            label={`stock: 10`}
                            color="default"
                            size="small"
                            sx={{ width: 80, justifyContent: "flex-start" }}
                        />
                    </Box>
                );
            },
        },

        {
            flex: 0,
            field: "acciones",
            headerName: "Acciones",
            minWidth: 150,
            renderCell: ({ row }) => {
                return <Box>{getButtonsActions()}</Box>;
            },
        },
    ];

    return (
        <Grid container spacing={3}>
            <Grid
                item
                xs={12}
                sx={{
                    marginLeft: 3,
                }}
            >
                <Typography variant="h5" fontFamily={"fantasy"}>
                    Lista de Productos
                </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
                <Paper>
                    <div style={{ width: "100%", height: 650 }}>
                        <DataGrid
                            loading={false}
                            // autoHeight
                            // checkboxSelection
                            rows={products}
                            columns={columns}
                            paginationMode="client"
                            pageSize={pageSize}
                            page={page}
                            // pageSizeOptions={[10, 25, 50]}
                            sx={{
                                boxShadow: 1,
                                border: 1,
                                borderColor: "#ccc",
                                "& .MuiDataGrid-columnHeaders": {
                                    borderRadius: 0,
                                    backgroundColor: "rgba(0,141,255,0.2)",
                                },
                            }}
                            onPageSizeChange={(newPageSize) =>
                                setPageSize(newPageSize)
                            }
                            onPageChange={(newPage) => setPage(newPage)}
                            // localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                        />
                    </div>
                </Paper>
            </Grid>
        </Grid>
    );
};
