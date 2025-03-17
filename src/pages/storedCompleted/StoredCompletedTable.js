import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Box, Typography} from "@mui/material";
import {useCollection} from "../../hooks/useCollection";
import format from 'date-fns/format'

const StoredCompletedTable = () => {
    const {documents, error} = useCollection('projects','completed','==', true,'completedDate','desc')


const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'category',
    headerName: 'Category',
    width: 150,
    editable: true,
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 150,
    editable: true,
  },
  {
    field: 'grade',
    headerName: 'Grade',
    type: 'number',
    valueFormatter: (params) => {
        if (params.value == null)
            return '';
        const valueFormatted = Number(params.value).toLocaleString()
        return`${valueFormatted}%`
    },
    width: 110,
    editable: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'details',
    headerName: 'Details',
    width: 350,
    editable: true,
  },
  {
    field: 'completedDate',
    headerName: 'Completed Date',
    type: 'date',
    valueFormatter: (params) => {
        if (params.value == null)
            return '';
        const valueFormatted = (params.value.toDate())
        return format(valueFormatted, 'yyyy/MM/dd')
    },
    width: 150,
    editable: true,

  },
  {
    field: 'comments',
    headerName: 'Comments',
    width: 350,
    editable: true,
  },
    ]

 return (
              <Box
            sx={{
                height:650,
                width:'100%'
            }}
        >
            <Typography
                variant='h3'
                component='h3'
                sx={{textAlign:'center', mt:3, mb:3}}
            >
                Completed Assignments
            </Typography>
            {documents &&
            <DataGrid
                columns={columns}
                rows={documents}
                getRowId={row=>row.id}
                pageSize={10}
                rowsPerPageOptions={[4]}
                checkboxSelection
                disableSelectionOnClick
            />
            }
        </Box>

  );
}

export default StoredCompletedTable;