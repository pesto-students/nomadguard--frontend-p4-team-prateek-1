import { useState, useEffect, useRef } from 'react';

import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import CircularProgress from '@mui/material/CircularProgress';
// @mui
import {
  Card,
  Box,
  Table,
  Stack,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../components/label';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// user service
import { userService } from '../_services/user.service';
import InsuranceDetails from './InsuranceDetails';



// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'citizenship', label: 'Citizenship', alignRight: false },
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
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.email.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function InsuranceList() {

  const [userList, setUserList] = useState([{}]);
  const [insuranceList, setInsuranceList] = useState([]);

  const childCompRef = useRef()

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getData = async () => {
    const response = await userService.getInsuranceList();
    console.log(response)
    setInsuranceList(response.data)
    // setUserList is an async operation, so it can take time to update USERLIST, thats why response
    // setIsLoading(false);
  };


  useEffect(() => {

    getData();
    // a cleanup fn which runs before every side effect fn & component is removed;
    // but does not run the first time
    return () => { };
  }, []); // empty array will only run when the component runs. (no extra dependency)


  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  // const oneInsurance = (insuranceId) => {
  //   console.log(insuranceId)
  // }

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

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - insuranceList.length) : 0;

  const filteredInsurance = applySortFilter(insuranceList, getComparator(order, orderBy), filterName);


  const isNotFound = !insuranceList.length && !!filterName;

  // update status in the list
  const changeInsuranceStatus = (id) => {
    insuranceList.map(each => {
      if (each._id == id) {
        each.approvedStatus = true
      }
    })
    getData()
  }

  return (
    <>
      <Helmet>
        <title> NomadGuard </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Insurance List
          </Typography>
          {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button> */}
        </Stack>
        
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>


            {!insuranceList.length ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
              </Box>
            ) : (
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
                    const { _id, firstName, lastName, email, createdBy, citizenship, hasEndDate, startDate, endDate, coverage, coverageDays, beneficiary, countries, approvedStatus } = row;
                    const selectedUser = selected.indexOf(_id) !== -1;

                    return (
                      <TableRow onClick={() => { childCompRef.current.openModal(row) }} hover key={_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell align="left">{createdBy.firstName} {createdBy.lastName}</TableCell>
                        <TableCell align="left">{createdBy.email}</TableCell>
                        <TableCell align="left">{createdBy.citizenship}</TableCell>
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
                        {/* <TableCell align="left">{endDate.split('T')[0]}</TableCell> */}
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
            )}



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


      </Container>
      <InsuranceDetails updateInsurance={(id) => { changeInsuranceStatus(id) }} ref={childCompRef} />

    </>
  );
}
