import React from 'react';

interface Props {
  ufdate: Date;
}

const FormattedDate = ({ ufdate }: Props) => {
  const fDate = new Intl.DateTimeFormat('se-SV', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(ufdate));

  return <span>{fDate}</span>;
};

export default FormattedDate;
