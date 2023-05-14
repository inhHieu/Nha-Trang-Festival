import { formatDistanceToNow } from 'date-fns';

function TimeAgo({ date }) {
  const timeAgo = formatDistanceToNow(date, { addSuffix: true });
  return <span>{timeAgo}</span>;
}

export default TimeAgo;