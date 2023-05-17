import { differenceInYears } from 'date-fns';

function Age({ date }) {
  const Ages = differenceInYears( new Date(), date);
  return <span>{Ages}</span>;
}

export default Age;