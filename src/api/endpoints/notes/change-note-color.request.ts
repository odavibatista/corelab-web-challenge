import api, { IAPIError } from '../../api';

interface ChangeNoteColorAttributes {
  note_id: string;
  note_color: 'red' | 'yellow' | 'blue' | 'green';
}

const changeNoteColor = async (
  data: ChangeNoteColorAttributes,
  token: string,
): Promise<{} | IAPIError> => {
  const response = await api
    .post(`/notes/change-color`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return err.response;
    });

  return response;
};

export default changeNoteColor;
