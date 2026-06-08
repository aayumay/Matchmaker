import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Highlighter, Mic, Plus, Tag } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { meetingNotes } from '../data/dashboard';
import type { MeetingNote } from '../types';

export default function NotesPage() {
  const { dark } = useTheme();
  const [notes, setNotes] = useState<MeetingNote[]>(meetingNotes);
  const [selectedNoteId, setSelectedNoteId] = useState(notes[0]?.id || '');
  const [newNoteText, setNewNoteText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editNoteText, setEditNoteText] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  const handleEditNote = () => {
    if (!selectedNote || !editNoteText.trim()) return;
    setNotes(notes.map(note => note.id === selectedNote.id ? { ...note, text: editNoteText } : note));
    setIsEditing(false);
  };

  const handleAddNote = () => {
    if (!newNoteText.trim()) return;

    const newNote: MeetingNote = {
      id: `note-${Date.now()}`,
      profileId: 'p001',
      text: newNoteText,
      aiSummary: newNoteText.length > 150 ? `${newNoteText.slice(0, 150)}…` : newNoteText,
      aiKeyPreferences: ['Family alignment', 'Career stability'],
      aiConcerns: ['Confirm location flexibility'],
      aiActions: ['Schedule a private follow-up', 'Review the updated compatibility shortlist'],
      createdAt: new Date().toISOString(),
      author: 'Priya Sharma',
    };

    setNotes((current) => [newNote, ...current]);
    setSelectedNoteId(newNote.id);
    setNewNoteText('');
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      mediaRecorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        setIsRecording(false);
        // Simulate speech-to-text transcription for demo purposes
        setNewNoteText(prev => prev + (prev ? ' ' : '') + 'Met with Arjun today. He mentioned that he is very keen on someone who understands his startup commitments. Location flexibility is a plus, preferably Mumbai or Bangalore.');
      };
    } catch (error) {
      console.error('Unable to access microphone:', error);
      // Fallback if no mic permissions (simulated)
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setNewNoteText(prev => prev + (prev ? ' ' : '') + 'Met with Arjun today. He mentioned that he is very keen on someone who understands his startup commitments. Location flexibility is a plus, preferably Mumbai or Bangalore.');
      }, 3000);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    } else {
      setIsRecording(false);
    }
  };

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));

  return (
    <div className="page-shell">
      <header className="border-b border-black/10 pb-7 dark:border-white/10">
        <span className="page-kicker">Confidential client record</span>
        <h1 className={`editorial-title ${dark ? 'text-white' : 'text-charcoal'}`}>Private notes</h1>
        <p className="mt-3 text-sm text-gray-500">Capture consultation detail and turn it into clear next actions.</p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
        <aside className="space-y-5">
          <section className="luxury-panel p-6">
            <div className="relative z-10">
              <span className="eyebrow">New consultation note</span>
              <h2 className="mt-3 font-display text-3xl font-semibold text-white">Capture the details</h2>
              <textarea
                value={newNoteText}
                onChange={(event) => setNewNoteText(event.target.value)}
                placeholder="Write discreet consultation notes…"
                className="input-premium mt-5 h-32 resize-none"
              />

              <button
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                className={`mt-3 flex w-full items-center justify-center gap-2 border px-4 py-3 text-[9px] font-bold uppercase tracking-[0.16em] transition-colors ${
                  isRecording
                    ? 'border-red-400 bg-red-400/10 text-red-200'
                    : 'border-white/15 text-white/55 hover:border-gold-300 hover:text-gold-200'
                }`}
              >
                <Mic className="h-3.5 w-3.5" />
                {isRecording ? 'Stop recording' : 'Record private audio'}
              </button>

              {isRecording && (
                <div className="my-4 flex h-7 items-center justify-center gap-1">
                  {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                    <motion.span
                      key={index}
                      className="w-0.5 bg-gold-300"
                      animate={{ height: [4, 22, 4] }}
                      transition={{ duration: 0.65, delay: index * 0.08, repeat: Infinity }}
                    />
                  ))}
                </div>
              )}

              <button onClick={handleAddNote} className="btn-gold mt-3 w-full">
                <Plus className="mr-2 h-3.5 w-3.5" />
                Save and analyse
              </button>
            </div>
          </section>

          <section className="card-premium p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="eyebrow">Recent records</span>
              <span className="font-display text-2xl text-gold-600">{notes.length}</span>
            </div>
            <div className="max-h-[390px] space-y-2 overflow-y-auto pr-1">
              {notes.map((note, index) => (
                <button
                  key={note.id}
                  onClick={() => {
                    setSelectedNoteId(note.id);
                    setIsEditing(false);
                  }}
                  className={`w-full border p-4 text-left transition-colors ${
                    selectedNoteId === note.id
                      ? 'border-gold-400 bg-gold-50 dark:bg-gold-400/10'
                      : 'border-black/10 hover:border-gold-400/50 dark:border-white/10'
                  }`}
                >
                  <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-gold-600">
                    Consultation {String(notes.length - index).padStart(2, '0')}
                  </span>
                  <p className={`mt-2 line-clamp-2 text-xs leading-5 ${dark ? 'text-gray-300' : 'text-charcoal'}`}>
                    {note.text}
                  </p>
                  <p className="mt-2 text-[9px] uppercase tracking-[0.12em] text-gray-400">{formatDate(note.createdAt)}</p>
                </button>
              ))}
            </div>
          </section>
        </aside>

        {selectedNote && (
          <motion.section
            key={selectedNote.id}
            className="space-y-5"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="card-premium p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="eyebrow">Original record</span>
                <div className="flex gap-2 items-center">
                  {!isEditing ? (
                    <button 
                      onClick={() => {
                        setEditNoteText(selectedNote.text);
                        setIsEditing(true);
                      }}
                      className="text-xs text-gold-500 hover:text-gold-400"
                    >
                      Edit
                    </button>
                  ) : (
                    <button 
                      onClick={handleEditNote}
                      className="text-xs text-emerald-500 hover:text-emerald-400"
                    >
                      Save
                    </button>
                  )}
                  <Highlighter className="h-4 w-4 text-gold-500" />
                </div>
              </div>
              {isEditing ? (
                <textarea
                  value={editNoteText}
                  onChange={(e) => setEditNoteText(e.target.value)}
                  className="input-premium mt-5 h-32 w-full resize-none"
                  autoFocus
                />
              ) : (
                <p className={`mt-5 font-display text-2xl leading-9 ${dark ? 'text-white' : 'text-charcoal'}`}>
                  {selectedNote.text}
                </p>
              )}
              <p className="mt-6 border-t border-black/10 pt-4 text-[9px] uppercase tracking-[0.14em] text-gray-400 dark:border-white/10">
                Recorded {formatDate(selectedNote.createdAt)} · {selectedNote.author}
              </p>
            </div>

            {selectedNote.aiSummary && (
              <div className="luxury-panel p-6 sm:p-8">
                <div className="relative z-10">
                  <span className="eyebrow">Private intelligence summary</span>
                  <p className="mt-4 text-sm leading-7 text-white/65">{selectedNote.aiSummary}</p>
                </div>
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              <div className="card-premium p-6">
                <h3 className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] ${dark ? 'text-white' : 'text-charcoal'}`}>
                  <Tag className="h-4 w-4 text-gold-500" />
                  Key preferences
                </h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {selectedNote.aiKeyPreferences?.map((preference) => (
                    <span key={preference} className="border border-gold-400/35 bg-gold-50 px-3 py-2 text-[10px] text-gold-800 dark:bg-gold-400/10 dark:text-gold-200">
                      {preference}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card-premium p-6">
                <h3 className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] ${dark ? 'text-white' : 'text-charcoal'}`}>
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  Considerations
                </h3>
                <div className="mt-5 space-y-3">
                  {selectedNote.aiConcerns?.map((concern) => (
                    <p key={concern} className="border-l border-amber-500 pl-3 text-xs leading-5 text-gray-500">{concern}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="card-premium p-6">
              <h3 className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] ${dark ? 'text-white' : 'text-charcoal'}`}>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Recommended actions
              </h3>
              <div className="mt-5 divide-y divide-black/10 dark:divide-white/10">
                {selectedNote.aiActions?.map((action, index) => (
                  <label key={action} className="flex cursor-pointer items-center gap-4 py-4">
                    <input type="checkbox" />
                    <span className="font-display text-xl text-gold-600">0{index + 1}</span>
                    <span className={`text-sm ${dark ? 'text-gray-300' : 'text-charcoal'}`}>{action}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
