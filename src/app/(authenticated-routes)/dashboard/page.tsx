'use client'

import { useMemo, useState } from 'react';
import s from './styles.module.scss';
import { IFindNoteByIdResponse } from '../../../api/endpoints/notes/find-note-by-id.request';
import starNote from '../../../api/endpoints/notes/star-note.request';
import { useModal } from '../../../presentation/hooks/useModal';
import Note from '../../../presentation/components/Note';

export default function DashboardPage() {
  let token: string = '';

  const { modal, setModal, openCloseModal } = useModal();

  const [notes, setNotes] = useState<IFindNoteByIdResponse[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const starredNotes = useMemo(() => {
    return notes.filter((note) => note.starred);
  }, [notes]);

  const otherNotes = useMemo(() => {
    return notes.filter((note) => !note.starred);
  }, [notes]);

  function setError(message: string) {
    setErrorMessage(message);
  }

  const handleNoteStar = async (noteId: string) => {
    try {
      const data = await starNote(
        {
          note_id: noteId,
        },
        token,
      );

      if ('statusCode' in data) {
        setError(data.message);
        setModal({ message: data.message, type: 'error' });
      } else {
      }
    } catch (error: any) {
      setError(error.message);
      setModal({ message: errorMessage, type: 'error' });
    }
  };

  return (
    <main className={s.dashboard}>
      <section className={s.top}>
        <h1 className={s.title}>Core Notes</h1>
        <span className={s.search_bar}>
          <input
            type="text"
            placeholder="Search notes..."
            className={s.search_input}
          />
        </span>
      </section>
      <section className={`${s.favorites} ${s.section}`}>
        <h4 className={s.section_title}>Favorites</h4>
        <div className={s.cards}>
          {starredNotes.map((note) => (
            <Note key={note.id_note} note_title={note.note_title} id_note={note.id_note} note_color={note.note_color} note_text={note.note_text} starred={note.starred} user_id={note.user_id} handleStar={() => handleNoteStar(note.id_note)}   />
          ))}
        </div>
      </section>
      <section className={`${s.others} ${s.section}`}>
        <h4 className={s.section_title}>Others</h4>
        <div className={s.cards}>
          {otherNotes.map((note) => (
            <Note key={note.id_note} note_title={note.note_title} id_note={note.id_note} note_color={note.note_color} note_text={note.note_text} starred={note.starred} user_id={note.user_id} handleStar={() => handleNoteStar(note.id_note)}   />
          ))}
        </div>
      </section>
    </main>
  );
}
