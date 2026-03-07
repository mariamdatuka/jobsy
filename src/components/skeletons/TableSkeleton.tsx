import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Skeleton,
} from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "@src/pages/Dashboard/components/tableView/TableView";

const TABLE_ROWS_SKELETON = 10;

const Header = [
  "Company Name",
  "Position",
  "Country",
  "Status",
  "Type",
  "Applied Date",
  "Actions",
];

const TableViewSkeleton = () => {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table sx={{ minWidth: 700 }} stickyHeader>
          <TableHead>
            <TableRow>
              {Header.map((_, key) => (
                <StyledTableCell key={key}>
                  <Skeleton variant="text" width="60%" />
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {Array.from({ length: TABLE_ROWS_SKELETON }).map((_, rowIndex) => (
              <StyledTableRow key={rowIndex}>
                <StyledTableCell>
                  <Skeleton variant="text" width="80%" />
                </StyledTableCell>

                <StyledTableCell>
                  <Skeleton variant="text" width="70%" />
                </StyledTableCell>

                <StyledTableCell>
                  <Skeleton
                    variant="rectangular"
                    width={70}
                    height={24}
                    sx={{ borderRadius: 2 }}
                  />
                </StyledTableCell>

                <StyledTableCell>
                  <Skeleton
                    variant="rectangular"
                    width={80}
                    height={24}
                    sx={{ borderRadius: 2 }}
                  />
                </StyledTableCell>

                <StyledTableCell>
                  <Skeleton variant="text" width="60%" />
                </StyledTableCell>

                <StyledTableCell>
                  <Skeleton variant="text" width="70%" />
                </StyledTableCell>

                <StyledTableCell align="center">
                  <Skeleton variant="circular" width={32} height={32} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={0}
        rowsPerPage={10}
        page={0}
        rowsPerPageOptions={[10, 25, 100]}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </Paper>
  );
};

export default TableViewSkeleton;
