import s from "./styles.module.scss";
import { JSX } from "react";

export interface INoteProps {
  id_note: string;
  note_title: string;
  note_content: string;
  note_color: string;
  starred: boolean;
  user_id: string;
    handleStar: (noteData: {
    note_id: string;
  }) => void;
  changeColor: (noteData: {
    note_id: string;
    note_color: string;
  }) => void;
  handleUpdate: (noteData: {
    note_title: string;
    note_content: string;
  }) => void;

  handleNoteDelete: () => void;
}

const Note = ({
  id_note,
  note_title,
  note_content,
  note_color,
  starred,
  user_id,
  handleUpdate: updateNote,
  handleNoteDelete: onDelete
}: INoteProps): JSX.Element => {
 return (
    <div className={`${s.note} ${s[note_color]}`} key={id_note}>
        <h6 className={s.title}>{note_title}</h6>
        <p className={s.content}>{note_content}</p>
    </div>
 )
};

export default Note;