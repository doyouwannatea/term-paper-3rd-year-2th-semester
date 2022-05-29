import { Box, Typography, Stack, Button } from '@mui/material';

type Props = {
  label: string;
};

const FileInput: React.FC<Props> = ({ label }) => (
  <Box>
    {/* LABEL */}
    <Typography
      color="gray"
      component="label"
      variant="caption"
      mb={0.5}
      display="block"
      htmlFor="passport-input"
    >
      {label}
    </Typography>

    {/* BUTTON */}
    <Stack
      gap={1}
      direction="row"
      flexWrap="wrap"
      alignItems="center"
    >
      <Box
        display="inline-block"
        component="label"
        htmlFor="passport-input"
      >
        <Box
          component="input"
          display="none"
          accept="image/*"
          id="passport-input"
          type="file"
        />
        <Button variant="outlined" component="span">
          загрузить
        </Button>
      </Box>

      {/* ENTERED FILE NAME */}
      <Typography>(1).jpgинтерфейсные классы (1).jpg</Typography>
    </Stack>
  </Box>
);

export default FileInput;
