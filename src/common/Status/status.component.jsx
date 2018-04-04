const formatStatus = (status) => {
  const statusCodes = {
    200: 'success',
    201: 'success',
    401: 'error',
    500: 'warning',
    404: 'error'

  };

  return statusCodes[status];
};

export default formatStatus;
