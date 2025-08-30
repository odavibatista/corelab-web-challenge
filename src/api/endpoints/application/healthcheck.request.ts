import api, { IAPIError } from '../../api';

const healthCheck = async (): Promise<{} | IAPIError> => {
  const response = await api.get(`/app/healthcheck`).catch((err) => {
    return err.response;
  });

  return response.data;
};

export default healthCheck;
