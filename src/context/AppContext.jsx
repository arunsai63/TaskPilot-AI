import { createContext, useContext, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { generateId, getDayKey } from '../utils/format'

const AppContext = createContext(null)

const DEFAULT_TIMER_SETTINGS = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  sessionsBeforeLongBreak: 4,
  autoStartBreaks: false,
  autoStartFocus: false,
  soundEnabled: true,
  notificationsEnabled: true,
  sessionLabel: 'Focus Session'
}

export function AppProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage('tasks', [])
  const [timerSettings, setTimerSettings] = useLocalStorage('timerSettings', DEFAULT_TIMER_SETTINGS)
  const [sessions, setSessions] = useLocalStorage('sessions', [])
  const [reminders, setReminders] = useLocalStorage('reminders', [])
  const [workLog, setWorkLog] = useLocalStorage('workLog', {})
  const [stats, setStats] = useLocalStorage('stats', { totalFocusMinutes: 0, totalSessions: 0, streak: 0, lastActiveDay: null })

  // Tasks
  const addTask = useCallback((task) => {
    setTasks(prev => [{
      id: generateId(),
      title: '',
      description: '',
      priority: 'medium',
      status: 'todo',
      dueDate: null,
      estimatedPomodoros: 1,
      completedPomodoros: 0,
      tags: [],
      createdAt: new Date().toISOString(),
      ...task
    }, ...prev])
  }, [setTasks])

  const updateTask = useCallback((id, updates) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
  }, [setTasks])

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }, [setTasks])

  // Sessions
  const addSession = useCallback((session) => {
    const newSession = {
      id: generateId(),
      type: 'focus',
      duration: 25,
      taskId: null,
      completedAt: new Date().toISOString(),
      ...session
    }
    setSessions(prev => [newSession, ...prev])

    if (session.type === 'focus' || !session.type) {
      const today = getDayKey()
      setWorkLog(prev => ({
        ...prev,
        [today]: (prev[today] || 0) + (session.duration || 25)
      }))
      setStats(prev => {
        const lastDay = prev.lastActiveDay
        const isConsecutive = lastDay && (new Date(today) - new Date(lastDay)) / 86400000 === 1
        return {
          ...prev,
          totalFocusMinutes: prev.totalFocusMinutes + (session.duration || 25),
          totalSessions: prev.totalSessions + 1,
          streak: lastDay === today ? prev.streak : (isConsecutive ? prev.streak + 1 : 1),
          lastActiveDay: today
        }
      })
    }
  }, [setSessions, setWorkLog, setStats])

  // Reminders
  const addReminder = useCallback((reminder) => {
    setReminders(prev => [{
      id: generateId(),
      title: '',
      time: null,
      repeat: 'none',
      enabled: true,
      createdAt: new Date().toISOString(),
      ...reminder
    }, ...prev])
  }, [setReminders])

  const updateReminder = useCallback((id, updates) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r))
  }, [setReminders])

  const deleteReminder = useCallback((id) => {
    setReminders(prev => prev.filter(r => r.id !== id))
  }, [setReminders])

  const updateTimerSettings = useCallback((updates) => {
    setTimerSettings(prev => ({ ...prev, ...updates }))
  }, [setTimerSettings])

  return (
    <AppContext.Provider value={{
      tasks, addTask, updateTask, deleteTask,
      timerSettings, updateTimerSettings,
      sessions, addSession,
      reminders, addReminder, updateReminder, deleteReminder,
      workLog, stats
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
