import api, { IAPIError } from '../../api';

const deleteNote = async (
  id_note: string,
  token: string,
): Promise<{} | IAPIError> => {
  const response = await api
    .delete(`/notes/delete/${id_note}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return err.response;
    });

  return response;
};

export default deleteNote;
