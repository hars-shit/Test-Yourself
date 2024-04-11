import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function BasicChips({label}) {
  return (
    <Stack direction="row" spacing={1}>
      <Chip sx={{fontSize:'14px'}} label={label} />
    </Stack>
  );
}
