import differenceInDays from 'date-fns/differenceInDays'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'

export const formatDate = (ms) => {
  return differenceInDays(Date.now(), ms) > 7
    ? new Intl.DateTimeFormat('default', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(ms)
    : formatDistanceToNowStrict(ms) + ' ago';
};
