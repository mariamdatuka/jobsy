import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useJobActionsStore } from "@src/store/useJobActionsStore";
import { useTasks } from "@src/hooks/useTasks";
import { useEffect } from "react";
import { useUserStore } from "@src/store/userStore";
import EditActions from "../kanbanView/EditActions";
import StatusColor, { type Status } from "@src/components/general/StatusColor";

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
  const jobs = useJobActionsStore((state) => state.jobsData);
  const setJobsData = useJobActionsStore((state) => state.setJobsData);
  const session = useUserStore((state) => state.session);
  const { tasks, isPending, isLoading } = useTasks(session?.user?.id!);
  const tasksData = tasks || [];
  useEffect(() => {
    if (tasksData && tasksData.length > 0) {
      setJobsData(tasksData);
    }
  }, [tasksData, setJobsData]);
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table" stickyHeader>
        <TableHead>
          <TableRow>
            {Header.map((item, key) => (
              <StyledTableCell key={key}>{item}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs?.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align="left">{row.company_name}</StyledTableCell>
              <StyledTableCell align="left">{row.position}</StyledTableCell>
              <StyledTableCell align="left">{row.country}</StyledTableCell>
              <StyledTableCell align="left">
                <StatusColor
                  status={row.status.toLocaleLowerCase() as Status}
                />
              </StyledTableCell>
              <StyledTableCell align="left">{row.vacancy_type}</StyledTableCell>
              <StyledTableCell align="left">{row.date_applied}</StyledTableCell>
              <StyledTableCell align="center">
                {" "}
                <EditActions task={row} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // "&:nth-of-type(odd)": {
  //   backgroundColor: theme.palette.action.hover,
  // },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
