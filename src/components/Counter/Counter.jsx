import { Button, Stack, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../../redux/slices/counterSlice';
import { selectValue } from '../../redux/selectors/counterSelectors';

const Counter = () => {
  const count = useSelector(selectValue);
  const dispatch = useDispatch();

  return (
    <Stack spacing={2}>
      <Typography>Count: {count}</Typography>
      <Button onClick={() => dispatch(increment())}>Increment</Button>
      <Button onClick={() => dispatch(decrement())}>Decrement</Button>
    </Stack>
  );
};

export default Counter;
