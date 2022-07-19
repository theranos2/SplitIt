import CardContent from '@mui/material/CardContent';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

import { ItemDisplayProps } from './props';
import { Item } from '../../BillCreation/BillCreationProps';

const ItemsDisplay = (props: ItemDisplayProps) => {
  const { items, removeItem } = props;

  return (
    <>
      {items.map((item: Item, idx: number) => (
        <Card
          key={`item-display-${idx}`}
          sx={{ display: 'flex', width: '100%', paddingLeft: '10px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', paddingBottom: '10px' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                {item.name}
              </Typography>
            </CardContent>
          </Box>
          <Grid container justifyContent="flex-end">
            <IconButton onClick={() => removeItem(item)}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Card>
      ))}
    </>
  );
};

// To be used in bill creation (simple/advanced), and view
// also for friends lists and stuff later on.

export default ItemsDisplay;
