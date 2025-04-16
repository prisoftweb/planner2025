import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function RatingComponent({setValue, value, isDisabled=false, size='large'}: 
  {value:number, setValue:Function, isDisabled?: boolean, size?: "small"| "large" | "medium"}) {
  return (
    <Stack spacing={1}>
      <Rating name="half-rating"
        size={size} 
        precision={0.5} 
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        disabled={isDisabled}
      />
    </Stack>
  );
}