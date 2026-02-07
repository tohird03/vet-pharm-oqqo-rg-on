export const dateFormatter = (date: string) => {
  const formattedDate = new Date(date);

  const month = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];

  const year = formattedDate.getFullYear();
  const time = String(formattedDate).split(' ')[4];

  return (
    `${formattedDate.getDate() }.${ month[formattedDate.getMonth()] }.${ year }ㅤ${ time}`
  );
};

export const dateFormatterWithStringMonth = (date: string) => {
  const formattedDate = new Date(date);

  const month = [
    'yanvar',
    'fevral',
    'mart',
    'aprel',
    'may',
    'iyun',
    'iyul',
    'avgust',
    'sentyabr',
    'oktyabr',
    'noyabr',
    'dekabr',
  ];

  const year = formattedDate.getFullYear();

  return (
    `${formattedDate.getDate() }-${ month[formattedDate.getMonth()] } ${ year }-yil`
  );
};

export const formatMs = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours} soat ${minutes} daqiqa ${seconds} sekund`;
};

const msToTime = (ms: number) => {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);

  return `${h} soat ${m} daqiqa`;
};
