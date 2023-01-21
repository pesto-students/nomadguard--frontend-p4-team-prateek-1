import { useState, useEffect } from 'react';
// service
import { userService } from 'src/_services/user.service';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';

// @mui
import {
  Card,
  Table,
  Grid,
  Box,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';

// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'startDate', label: 'Start Date', alignRight: false },
  { id: 'endDate', label: 'End Date', alignRight: false },
  { id: 'coverage', label: 'Coverage', alignRight: false },
  { id: 'beneficiary', label: 'Beneficiary', alignRight: false },
  { id: 'countries', label: 'Countries', alignRight: false },
  { id: 'status', label: 'Approved', alignRight: false },
  { id: '' },
];



// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  // const stabilizedThis = array.map((el, index) => [el, index]);
  // stabilizedThis.sort((a, b) => {
  //   const order = comparator(a[0], b[0]);
  //   if (order !== 0) return order;
  //   return a[1] - b[1];
  // });
  // if (query) {
  //   return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  // }
  // return stabilizedThis.map((el) => el[0]);
}

const MyDetails = () => {
  const [insuranceList, setInsuranceList] = useState([])
  const [userList, setUserList] = useState([]);


  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);


  const getInsurance = async () => {
    const response = await userService.getMyInsurance()
    console.log(response)
    setInsuranceList(response.data)
  }
  useEffect(() => {
    getInsurance()
    return () => { };
  }, []);


  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = insuranceList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };



  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - insuranceList.length) : 0;

  const filteredUsers = applySortFilter(insuranceList, getComparator(order, orderBy), filterName);


  const isNotFound = !insuranceList.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Insurance List </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography color='white' variant="h4" sx={{ mb: 2 }}>
          Purchased Insurance
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Card>

              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={insuranceList.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {insuranceList.map((row) => {
                        console.log(row)
                        const { _id, startDate, endDate, coverage, hasEndDate, coverageDays, beneficiary, countries, approvedStatus } = row;
                        const selectedUser = selected.indexOf(_id) !== -1;

                        return (
                          <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                            {/* <TableCell padding="checkbox">
                              <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, _id)} />
                            </TableCell> */}
                            <TableCell align="left">{startDate.split('T')[0]}</TableCell>
                            {hasEndDate &&
                              <>
                                <TableCell align="left">{endDate.split('T')[0]}</TableCell>
                                <TableCell align="left">$ {coverage} / {coverageDays} Days</TableCell>

                              </>
                            }
                            {!hasEndDate &&
                              <>
                                <TableCell align="left"> -</TableCell>
                                <TableCell align="left">$ 42 / 4 Weeks</TableCell>
                              </>
                            }
                            <TableCell align="left">{beneficiary}</TableCell>
                            <TableCell align="left">{countries}</TableCell>
                            <TableCell align="left">
                              <Label color={(approvedStatus === false && 'error') || 'success'}>{(approvedStatus === false && 'PENDING' || 'APPROVED')}</Label>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>

                    {isNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <Paper
                              sx={{
                                textAlign: 'center',
                              }}
                            >
                              <Typography variant="h6" paragraph>
                                Not found
                              </Typography>

                              <Typography variant="body2">
                                No results found for &nbsp;
                                <strong>&quot;{filterName}&quot;</strong>.
                                <br /> Try checking for typos or using complete words.
                              </Typography>
                            </Paper>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={insuranceList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Box
              component="img"
              src="/assets/images/ng7.png"
              sx={{ height: 440, width: 500, mx: 'auto', my: { xs: 5, sm: 2 } }}
            />
          </Grid>
        </Grid>


      </Container>


    </>
  );

}

export default MyDetails;