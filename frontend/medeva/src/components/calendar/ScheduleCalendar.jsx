import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

const DAYS = ["SEN", "SEL", "RAB", "KAM", "JUM", "SAB", "MIN"];
const MONTH_NAMES = [
  "JANUARI",
  "FEBRUARI",
  "MARET",
  "APRIL",
  "MEI",
  "JUNI",
  "JULI",
  "AGUSTUS",
  "SEPTEMBER",
  "OKTOBER",
  "NOVEMBER",
  "DESEMBER",
];

export default function ScheduleCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const prevMonthDays = new Date(year, month, 0).getDate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let firstDay = new Date(year, month, 1).getDay();
  firstDay = firstDay === 0 ? 6 : firstDay - 1;

  const totalCells = 35;

  const calendarDays = Array.from({ length: totalCells }, (_, i) => {
    const dayNumber = i - firstDay + 1;
    if (dayNumber <= 0) {
      return { day: prevMonthDays + dayNumber, currentMonth: false };
    } else if (dayNumber > daysInMonth) {
      return { day: dayNumber - daysInMonth, currentMonth: false };
    } else {
      return { day: dayNumber, currentMonth: true };
    }
  });

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full h-full">
      {/* Header 1 */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-50 p-1.5 rounded-lg text-blue-500">
          <CalendarDays className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-gray-700 text-sm">Jadwal Jaga</h3>
      </div>

      {/* Header 2 */}
      <div className="flex justify-between items-center mb-6">
        <div className="font-extrabold text-gray-800 text-base tracking-wide">
          {MONTH_NAMES[month]} {year}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="hover:bg-gray-100 rounded-full p-1 transition"
          >
            <ChevronLeft className="w-5 h-5 text-blue-500" />
          </button>
          <button
            onClick={handleNextMonth}
            className="hover:bg-gray-100 rounded-full p-1 transition"
          >
            <ChevronRight className="w-5 h-5 text-blue-500" />
          </button>
        </div>
      </div>

      {/* Nama Hari */}
      <div className="grid grid-cols-7 gap-1 text-center mb-4">
        {DAYS.map((day) => (
          <div key={day} className="text-[11px] font-bold text-gray-400">
            {day}
          </div>
        ))}
      </div>

      {/* Grid Tanggal */}
      <div className="grid grid-cols-7 gap-y-2 text-center border-t pt-4">
        {calendarDays.map((item, idx) => {
          const isSunday = idx % 7 === 6;
          const isToday =
            item.day === today.getDate() &&
            item.currentMonth &&
            month === today.getMonth() &&
            year === today.getFullYear();

          return (
            <div
              key={idx}
              className="relative py-1 flex flex-col items-center justify-center"
            >
              <div
                className={`
                flex flex-col items-center justify-center w-10 h-10 rounded-xl transition-all
                ${
                  isToday
                    ? "border-2 border-blue-500 bg-blue-50/30"
                    : "hover:bg-gray-50"
                }
              `}
              >
                <span
                  className={`text-[13px] font-bold ${
                    !item.currentMonth
                      ? "text-gray-300"
                      : isSunday
                      ? "text-red-500"
                      : "text-gray-600"
                  } ${isToday ? "text-blue-600" : ""}`}
                >
                  {item.day}
                </span>

                {/* Titik Biru */}
                {item.currentMonth && (
                  <div
                    className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                      isToday ? "bg-blue-600" : "bg-blue-500"
                    }`}
                  ></div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend Footer */}
      <div className="mt-8 flex gap-4 pt-5 border-t border-gray-50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-2 bg-blue-400 rounded-full"></div>
          <span className="text-[11px] font-bold text-gray-400">
            30 Jadwal Jaga
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-2 bg-yellow-400 rounded-full"></div>
          <span className="text-[11px] font-bold text-gray-400">
            0 Jadwal Pengganti
          </span>
        </div>
      </div>
    </div>
  );
}
