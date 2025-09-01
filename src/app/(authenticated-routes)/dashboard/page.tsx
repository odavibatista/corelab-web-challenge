'use client';

import { useEffect, useMemo, useState } from 'react';
import s from './styles.module.scss';
import { IFindNoteByIdResponse } from '../../../api/endpoints/notes/find-note-by-id.request';
import starNote from '../../../api/endpoints/notes/star-note.request';
import { useModal } from '../../../presentation/hooks/useModal';
import Note from '../../../presentation/components/Note';
import browseNotes from '../../../api/endpoints/notes/browse-notes.request';
import refreshPage from '../../../server/utils/refresh.function';
import Modal from '../../../presentation/components/Modal';
import { useRouter } from 'next/navigation';
import LoadingScreen from '../../../presentation/components/Loading';
import Image from 'next/image';
import searchNotes from '../../../api/endpoints/notes/search-notes.request';

export default function DashboardPage() {
  const { modal, setModal, openCloseModal } = useModal();

  const router = useRouter();

  const [notes, setNotes] = useState<IFindNoteByIdResponse[]>([]);
  const [areNotesLoading, setNotesLoading] = useState(true);
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

  const handleSearchNotes = async (content: string) => {
    const token = sessionStorage.getItem('session');
    try {
      const data = await searchNotes(content, token);
      if ('statusCode' in data) {
        setError(data.message);
      } else {
        setNotes(data);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleNoteStar = async (noteId: string) => {
    const token = sessionStorage.getItem('session');
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
        const notes = await browseNotes(token);

        if ('statusCode' in notes) {
          setError(notes.message);
          setModal({ message: notes.message, type: 'error' });
        } else {
          setNotes(notes);
        }
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    (async () => {
      const token = sessionStorage.getItem('session');
      const data = await browseNotes(token);

      if ('statusCode' in data) {
        setErrorMessage(data.message);
      } else {
        setNotes(data);

        setNotesLoading(false);
      }
    })();
  }, [areNotesLoading]);

  if (areNotesLoading) {
    return <LoadingScreen />;
  }

  return (
    <main className={s.dashboard}>
      <section className={s.top}>
        <h1 className={s.title}>Core Notes</h1>
        <span className={s.search_bar}>
          <Image
            src="/search-icon.png"
            alt="Search"
            width={16}
            height={16}
            className={s.search_icon}
          />
          <input
            type="text"
            placeholder="Search notes..."
            className={s.search_input}
            name="search"
            onChange={(e) => handleSearchNotes(e.target.value)}
          />
        </span>
      </section>

      {!areNotesLoading && starredNotes && starredNotes.length > 0 ? (
        <section className={`${s.favorites} ${s.section}`}>
          <h4 className={s.section_title}>Favorites</h4>
          <div className={s.cards}>
            {starredNotes.map((note) => (
              <Note
                key={note.id_note}
                note_title={note.note_title}
                id_note={note.id_note}
                note_color={note.note_color}
                note_text={note.note_text}
                starred={note.starred}
                user_id={note.user_id}
                starNote={() => handleNoteStar(note.id_note)}
              />
            ))}
          </div>
        </section>
      ) : (
        <></>
      )}
      {!areNotesLoading && otherNotes && otherNotes.length > 0 ? (
        <section className={`${s.other} ${s.section}`}>
          <h4 className={s.section_title}>Other</h4>
          <div className={s.cards}>
            {otherNotes.map((note) => (
              <Note
                key={note.id_note}
                note_title={note.note_title}
                id_note={note.id_note}
                note_color={note.note_color}
                note_text={note.note_text}
                starred={note.starred}
                user_id={note.user_id}
                starNote={() => handleNoteStar(note.id_note)}
              />
            ))}
          </div>
        </section>
      ) : (
        <></>
      )}
      {modal?.message !== '' && (
        <Modal
          modal={modal}
          openCloseModal={openCloseModal}
          key={modal.message}
        />
      )}
    </main>
  );
}
