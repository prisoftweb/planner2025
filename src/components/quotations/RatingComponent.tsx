import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function RatingComponent({setValue, value}: {value:number, setValue:Function}) {
  return (
    <Stack spacing={1}>
      <Rating name="half-rating" 
        defaultValue={2.5} 
        precision={0.5} 
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </Stack>
  );
}