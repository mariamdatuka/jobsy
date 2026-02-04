import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditActions from "../kanbanView/EditActions";
import StatusColor, { type Status } from "@src/components/general/StatusColor";
import { CountryTag } from "../kanbanView/JobCard";
import { useJobsViewData } from "@src/hooks/useJobsDataView";
import { useState } from "react";
import { TablePagination } from "@mui/material";

const Header = [
  "Company Name",
  "Position",
  "Country",
  "Status",
  "Type",
  "Applied Date",
  "Actions",
];

const CustomizedTables = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { tasksData } = useJobsViewData();

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table
          sx={{ minWidth: 700 }}
          aria-label="customized table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              {Header.map((item, key) => (
                <StyledTableCell key={key}>{item}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tasksData
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="left">
                    {row.company_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.position}</StyledTableCell>
                  <StyledTableCell align="left">
                    <CountryTag sx={{ width: "70px", borderRadius: "10px" }}>
                      {row.country ? row.country : "-"}
                    </CountryTag>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <StatusColor
                      status={row.status.toLocaleLowerCase() as Status}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.vacancy_type}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.date_applied}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {" "}
                    <EditActions task={row} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tasksData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CustomizedTables;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f1f7fa",
    color: theme.palette.info.main,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  // "&:nth-of-type(odd)": {
  //   backgroundColor: theme.palette.action.hover,
  // },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
