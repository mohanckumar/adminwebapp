import React, { useState } from 'react'
import { ToWords } from 'to-words'
import CalendarModal from './CalendarModal'

const Dashboard = () => {
  const jackpotAmount = 54627635276372
  const toWords = new ToWords()
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Dashboard</h2>
      <button onClick={() => setCalendarOpen(!calendarOpen)} >
        {selectedDate.toDateString()}
      </button>
      <p><strong>Jackpot Amount:</strong> ₹{jackpotAmount.toLocaleString()}</p>
      <p><strong>In Words:</strong> {toWords.convert(jackpotAmount)} Rupees Only</p>

      <footer style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: '#f0f0f0',
        padding: '10px 0',
        display: 'flex',
        justifyContent: 'space-around'
      }}>
        <button>Analytics</button>
        <button>Set Prizes</button>
        <button>Ads</button>
      </footer>

      <CalendarModal
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        selectedDate={selectedDate}
        onDateSelect={date => setSelectedDate(date)}
      />
    </div>
  )
}

export default Dashboard
