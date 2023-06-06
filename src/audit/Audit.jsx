import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '_store';



// export { Audit };

// function Audit() {
//     const users = useSelector(x => x.users.list);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(userActions.getAll());
//     }, []);

//     return (
//         <div>
//             <h1>Auditor Page</h1>
//             <table className="table table-striped">
//                 <thead>
//                     <tr>
//                         <th style={{ width: '30%' }}>First Name</th>
//                         <th style={{ width: '30%' }}>Last Name</th>
//                         <th style={{ width: '30%' }}>Username</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users?.value?.map(user =>
//                         <tr key={user.id}>
//                             <td>{user.firstName}</td>
//                             <td>{user.lastName}</td>
//                             <td>{user.username}</td>
//                         </tr>
//                     )}
//                     {users?.loading &&
//                         <tr>
//                             <td colSpan="4" className="text-center">
//                                 <span className="spinner-border spinner-border-lg align-center"></span>
//                             </td>
//                         </tr>
//                     }
//                 </tbody>
//             </table>
//         </div>
//     );
// }

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
    { id: 'firstName', label: 'firstName', minWidth: 170 },
    { id: 'lastName', label: 'lastName', minWidth: 100 },

    {
        id: 'username',
        label: 'username',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },

];

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
];

export { Audit };

function Audit() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const users = useSelector(x => x.users.list);
    const [userData, setUserData] = React.useState("");


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
        setUserData(users?.value)

    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const searchData = (e) => {
        let search = e.target.value
        if (search) {

            let fitlerData = users?.value.filter((row) => row.firstName.toLowerCase().includes(search.toLowerCase()) || row.lastName.toLowerCase().includes(search.toLowerCase()) || row.username.includes(search.toLowerCase()))

            setUserData(fitlerData)

        }
        else {
            setUserData(users?.value)
        }


    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>

                <input type='search' onChange={(e) => searchData(e)} placeholder='search here ...' />
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userData && userData.length !== 0 && userData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}