import React from 'react';

const formatStatus = (status, props) => {
  const statusCodes = {
    200: 'success',
    201: 'success',
    401: 'error',
    500: 'error',
    undefined: 'error'

  };

  return statusCodes[status];
};

export default formatStatus;
