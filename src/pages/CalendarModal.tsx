import React, { useState } from 'react'
import Modal from 'react-modal'
import '../styles/CalendarModal.css'

Modal.setAppElement('#root')

interface CalendarModalProps {
  isOpen: boolean
  onClose: () => void
  selectedDate: Date
  onDateSelect: (date: Date) => void
}

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

const CalendarModal: React.FC<CalendarModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  onDateSelect,
}) => {
  const [viewDate, setViewDate] = useState(selectedDate)

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const startDayOffset = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay()

  const prevMonth = () => {
    const newDate = new Date(viewDate)
    newDate.setMonth(viewDate.getMonth() - 1)
    setViewDate(newDate)
  }

  const nextMonth = () => {
    const newDate = new Date(viewDate)
    newDate.setMonth(viewDate.getMonth() + 1)
    setViewDate(newDate)
  }

  const handleDateClick = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
    onDateSelect(newDate)
    onClose()
  }

  const daysArray = Array.from({ length: getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth()) }, (_, i) => i + 1)

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="calendar-modal" overlayClassName="calendar-overlay">
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={prevMonth}>❮</button>
          <h2>{viewDate.toLocaleDateString('en-US', { month: 'long' })}</h2>
          <button onClick={nextMonth}>❯</button>
        </div>
        <div className="calendar-weekdays">
          {days.map((d, idx) => (
            <span key={idx}>{d}</span>
          ))}
        </div>
        <div className="calendar-days">
          {Array(startDayOffset).fill(null).map((_, idx) => <span key={`empty-${idx}`} className="empty-day" />)}
          {daysArray.map(day => (
            <span key={day} onClick={() => handleDateClick(day)}>{day}</span>
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default CalendarModal
