'use client';

import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit2, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

// Define the Note type to match your Supabase data structure
interface Note {
    id: number;
    title: string;
}

export default function NotesPage() {
    const supabase = createClient();
    const [notes, setNotes] = useState<Note[]>([]);
    const [newNote, setNewNote] = useState('');
    const [editNoteId, setEditNoteId] = useState<number | null>(null);
    const [editNoteTitle, setEditNoteTitle] = useState('');

    // Fetch notes from Supabase
    async function fetchNotes() {
        const { data: notes, error } = await supabase
            .from<Note>('notes')
            .select();
        if (error) {
            console.error('Error fetching notes:', error.message);
            return;
        }
        setNotes(notes || []);
    }

    // Add a new note to Supabase
    async function addNote() {
        if (newNote.trim() === '') return;

        const { error } = await supabase
            .from<Note>('notes')
            .insert([{ title: newNote }]);
        if (error) {
            console.error('Error adding note:', error.message);
            return;
        }
        setNewNote('');
        fetchNotes();  // Refresh the notes list
    }

    // Delete a note from Supabase
    async function deleteNote(id: number) {
        const { error } = await supabase
            .from<Note>('notes')
            .delete()
            .eq('id', id);
        if (error) {
            console.error('Error deleting note:', error.message);
            return;
        }
        fetchNotes();  // Refresh the notes list
    }

    // Update a note in Supabase
    async function updateNote() {
        if (editNoteTitle.trim() === '' || editNoteId === null) return;

        const { error } = await supabase
            .from<Note>('notes')
            .update({ title: editNoteTitle })
            .eq('id', editNoteId);
        if (error) {
            console.error('Error updating note:', error.message);
            return;
        }
        setEditNoteId(null);
        setEditNoteTitle('');
        fetchNotes();  // Refresh the notes list
    }

    // Fetch notes on component mount
    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white shadow-md rounded-md p-4">
                <h1 className="text-2xl font-bold mb-4">Your Notes</h1>
                <div className="mb-4">
                    <Label htmlFor="newNote" className="block mb-2">Add a new note</Label>
                    <Input
                        id="newNote"
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Enter note title"
                        className="mb-2"
                    />
                    <Button onClick={addNote} className="w-full">
                        Add Note
                    </Button>
                </div>

                {/* Edit Note Section */}
                {editNoteId !== null && (
                    <div className="mb-4">
                        <Label htmlFor="editNote" className="block mb-2">Edit note</Label>
                        <Input
                            id="editNote"
                            type="text"
                            value={editNoteTitle}
                            onChange={(e) => setEditNoteTitle(e.target.value)}
                            placeholder="Enter new note title"
                            className="mb-2"
                        />
                        <Button onClick={updateNote} className="w-full">
                            Update Note
                        </Button>
                    </div>
                )}

                {/* Notes List */}
                <div className="space-y-2">
                    {notes.map(note => (
                        <div key={note.id} className="flex items-center justify-between p-2 border rounded-md bg-gray-100">
                            <p>{note.title}</p>
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => {
                                        setEditNoteId(note.id);
                                        setEditNoteTitle(note.title);
                                    }}
                                    variant="outline"
                                    className="p-2">
                                    <Edit2 className="h-5 w-5 text-blue-500" />
                                </Button>
                                <Button
                                    onClick={() => deleteNote(note.id)}
                                    variant="destructive"
                                    className="p-2">
                                    <Trash2 className="h-5 w-5 text-white" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
