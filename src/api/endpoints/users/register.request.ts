import api, { IAPIError } from '../../api';

export interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface IRegisterResponse {
  token: string;
  id: string;
}

const register = async (
  data: IRegisterRequest,
): Promise<IRegisterResponse | IAPIError> => {
  const response = await api.post(`/users/register`, data).catch((err) => {
    return err.response;
  });

  return response.data;
};

export default register;
