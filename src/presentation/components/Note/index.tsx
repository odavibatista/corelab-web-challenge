import s from './styles.module.scss';
import { JSX, useState } from 'react';

export interface INoteProps {
  id_note: string;
  note_title: string;
  note_text: string;
  note_color: string;
  starred: boolean;
  user_id: string;
  starNote?: (noteData: { note_id: string }) => void;
  changeColor?: (noteData: { note_id: string; note_color: string }) => void;
  updateNote?: (noteData: { note_title: string; note_text: string }) => void;

  deleteNote?: () => void;
}

const Note = ({
  id_note,
  note_title,
  note_text,
  note_color,
  starred,
  user_id,
  changeColor: handleColor,
  starNote: handleStar,
  updateNote: handleUpdate,
  deleteNote: handleDelete,
}: INoteProps): JSX.Element => {
  const [isInEdition, setIsInEdition] = useState(false);
  const [edittedNoteData, setEdittedNoteData] = useState({
    note_title,
    note_text,
  });
  const [isColorPickerOpen, setColorPickerOpen] = useState(false);

  const star = () => {
    handleStar({ note_id: id_note });
  };

  const changeColor = (newColor: string) => {
    handleColor({ note_id: id_note, note_color: newColor });
  };

  const update = () => {
    handleUpdate(edittedNoteData);
  };

  const deleteNote = () => {
    handleDelete();
  };

  const toggleEditMode = () => {
    setEdittedNoteData({ note_title, note_text });
    setIsInEdition(true);
  };

  return (
    <span className={`${s.note} ${s[note_color]}`} key={id_note}>
      {starred ? (
        <span className={`${s.star} ${s.starred}`} onClick={star}>
          ★
        </span>
      ) : (
        <span className={`${s.star} ${s.unstarred}`} onClick={star}>
          ☆
        </span>
      )}
      <h3 className={s.title}>{note_title}</h3>
      <p className={s.content}>{note_text}</p>
    </span>
  );
};

export default Note;
