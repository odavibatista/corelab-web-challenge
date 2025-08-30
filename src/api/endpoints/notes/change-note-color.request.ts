import api, { IAPIError } from '../../api';

interface ChangeNoteColorAttributes {
  note_id: string;
  color: 'red' | 'yellow' | 'blue' | 'green';
}

const changeNoteColor = async (
  data: ChangeNoteColorAttributes,
  token: string,
): Promise<{} | IAPIError> => {
  const response = await api
    .post(`/notes/change-color`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return err.response;
    });

  return response.data;
};

export default changeNoteColor;
