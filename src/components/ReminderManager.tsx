import React, { useState } from 'react';
import { Plus, Trash2, Bell } from 'lucide-react';

interface Reminder {
  id: string;
  text: string;
  time: string;
  active?: boolean;
}

interface ReminderManagerProps {
  reminders: Reminder[];
  onAddReminder: (text: string, time: string) => void;
  onDeleteReminder: (id: string) => void;
}

export function ReminderManager({
  reminders,
  onAddReminder,
  onDeleteReminder
}: ReminderManagerProps) {
  const [newReminderText, setNewReminderText] = useState('');
  const [newReminderTime, setNewReminderTime] = useState('12:00');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReminderText.trim()) {
      onAddReminder(newReminderText, newReminderTime);
      setNewReminderText('');
      setNewReminderTime('12:00');
      setShowForm(false);
    }
  };

  return (
    <div className="h-full p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-800">Reminders</h2>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Add reminder form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 bg-purple-50 rounded-lg p-3">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reminder Text
            </label>
            <input
              type="text"
              value={newReminderText}
              onChange={(e) => setNewReminderText(e.target.value)}
              placeholder="e.g., Take vitamins"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              type="time"
              value={newReminderTime}
              onChange={(e) => setNewReminderTime(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Reminders list */}
      <div className="space-y-2 mb-4">
        {reminders.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">
            No reminders yet
          </div>
        ) : (
          reminders.map((reminder) => (
            <div
              key={reminder.id}
              className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 flex items-center justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-800 text-sm truncate">{reminder.text}</div>
                <div className="text-xs text-gray-600 mt-1">
                  {reminder.time}
                </div>
              </div>
              <button
                onClick={() => onDeleteReminder(reminder.id)}
                className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors ml-2 flex-shrink-0"
                aria-label="Delete reminder"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Quick add templates */}
      <div className="pt-4 border-t border-gray-200">
        <div className="text-sm font-medium text-gray-700 mb-2">Quick Add</div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onAddReminder('Take breakfast medication', '08:00')}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-xs"
          >
            Breakfast Meds
          </button>
          <button
            onClick={() => onAddReminder('Take lunch medication', '12:00')}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-xs"
          >
            Lunch Meds
          </button>
          <button
            onClick={() => onAddReminder('Take dinner medication', '18:00')}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-xs"
          >
            Dinner Meds
          </button>
          <button
            onClick={() => onAddReminder('Bedtime medication', '21:00')}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-xs"
          >
            Bedtime Meds
          </button>
        </div>
      </div>
    </div>
  );
}