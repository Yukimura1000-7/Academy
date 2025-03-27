using SimpleNotesApp;
using System;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Windows;
using System.Windows.Input;
using System.Windows.Threading;

public class NotesViewModel : INotifyPropertyChanged
{
    public ObservableCollection<Note> Notes { get; set; }
    private Note selectedNote;
    private DispatcherTimer reminderTimer;

    public Note SelectedNote
    {
        get => selectedNote;
        set
        {
            selectedNote = value;
            OnPropertyChanged(nameof(SelectedNote));
        }
    }

    public ICommand AddNoteCommand { get; }
    public ICommand EditNoteCommand { get; }
    public ICommand DeleteNoteCommand { get; }
    public ICommand SortByDateCommand { get; }
    public ICommand SortByCategoryCommand { get; }
    public ICommand SortByTitleCommand { get; }

    public NotesViewModel()
    {
        Notes = new ObservableCollection<Note>();
        AddNoteCommand = new RelayCommand(AddNote);
        EditNoteCommand = new RelayCommand(EditNote, CanEditOrDelete);
        DeleteNoteCommand = new RelayCommand(DeleteNote, CanEditOrDelete);
        SortByDateCommand = new RelayCommand(SortByDate);
        SortByCategoryCommand = new RelayCommand(SortByCategory);
        SortByTitleCommand = new RelayCommand(SortByTitle);
        reminderTimer = new DispatcherTimer();
        reminderTimer.Interval = TimeSpan.FromMinutes(1); // Проверка напоминаний каждые 1 минуту
        reminderTimer.Tick += CheckReminders;
        reminderTimer.Start();
    }

    private void AddNote()
    {
        var newNote = new Note
        {
            Id = Notes.Count + 1,
            Title = "Новая заметка",
            Content = "",
            Category = "",
            CreationDate = DateTime.Now, // Устанавливаем текущую дату
            ReminderDate = DateTime.Now.AddMinutes(1) // Устанавливаем время напоминания по умолчанию (через минуту)
        };
        Notes.Add(newNote);
        SelectedNote = newNote;
    }

    private void EditNote()
    {
        if (SelectedNote != null)
        {
            SelectedNote.Title += " (изменено)";
            OnPropertyChanged(nameof(SelectedNote));
        }
    }

    private void DeleteNote()
    {
        if (SelectedNote != null)
        {
            Notes.Remove(SelectedNote);
            SelectedNote = null;
        }
    }

    private bool CanEditOrDelete()
    {
        return SelectedNote != null;
    }

    private void SortByDate()
    {
        var sortedNotes = Notes.OrderBy(n => n.CreationDate).ToList();
        Notes.Clear();
        foreach (var note in sortedNotes)
        {
            Notes.Add(note);
        }
    }

    private void SortByCategory()
    {
        var sortedNotes = Notes.OrderBy(n => n.Category).ToList();
        Notes.Clear();
        foreach (var note in sortedNotes)
        {
            Notes.Add(note);
        }
    }

    private void SortByTitle()
    {
        var sortedNotes = Notes.OrderBy(n => n.Title).ToList();
        Notes.Clear();
        foreach (var note in sortedNotes)
        {
            Notes.Add(note);
        }
    }

    private void CheckReminders(object sender, EventArgs e)
    {
        foreach (var note in Notes)
        {
            if (note.ReminderDate <= DateTime.Now)
            {
                MessageBox.Show($"Напоминание: {note.Title}", "Напоминание о заметке", MessageBoxButton.OK, MessageBoxImage.Information);
                note.ReminderDate = DateTime.MaxValue;
            }
        }
    }

    public event PropertyChangedEventHandler PropertyChanged;
    protected void OnPropertyChanged(string propertyName)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}