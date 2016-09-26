const readableDateOptions = {
  era: 'narrow',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'short',
  timezone: 'UTC',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

export const readableDate = (date) => {
  const d = new Date(date);
  return d.toLocaleString('en', readableDateOptions);
};
