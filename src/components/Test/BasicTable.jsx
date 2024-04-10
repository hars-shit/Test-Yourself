import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MovingIcon from '@mui/icons-material/Moving';

export default function BasicTable({ pre_data }) {
  return (
    <TableContainer component={Paper} className="md:w-full lg:w-full xl:w-2/3 mx-auto">
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontSize:15,fontWeight:600}} >Topic Name</TableCell>
            <TableCell align="right" sx={{fontSize:15,fontWeight:600}}>Total Questions</TableCell>
            <TableCell align="right" sx={{fontSize:15,fontWeight:600}}>Correct</TableCell>
            <TableCell align="right" sx={{fontSize:15,fontWeight:600}}>Incorrect</TableCell>
            <TableCell align="right" sx={{fontSize:15,fontWeight:600}}>Retry</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pre_data.map((row, i) => (
            <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.topic}
              </TableCell>
              <TableCell align="right">{row.questions.length}</TableCell>
              <TableCell align="right">
                {/* Calculate total correct answers */}
                {row.questions.reduce((total, question) => total + (question.is_correct === 1 ? 1 : 0), 0)}
              </TableCell>
              <TableCell align="right"> {row.questions.reduce((total, question) => total + (question.is_correct === 0 ? 1 : 0), 0)}</TableCell>
              <TableCell align="right">
                <button style={{background:"rgb(217 199 187)"}}><MovingIcon /></button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
