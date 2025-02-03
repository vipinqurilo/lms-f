export default function ScheduleView() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg border border-gray-200 shadow-sm space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-gray-800">Schedule</h2>
          <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-gray-400"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="py-1 text-gray-400 font-medium">
              {day}
            </div>
          ))}
          {[1, 2, 3, 4, 5, 6, 7].map((date) => (
            <button
              key={date}
              className={`py-1 rounded-full w-8 h-8 mx-auto font-medium ${
                date === 4
                  ? "bg-indigo-500 text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {date}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl text-gray-800">Lessons</h3>
          <button className="text-sm text-gray-400 hover:text-gray-600">
            View all
          </button>
        </div>

        <div className="space-y-3">
          {[
            {
              subject: "Pre-Algebra",
              topic: "Multiplying decimals",
              time: "09:00 AM - 10:00 AM",
              color: "bg-blue-500",
              attendees: 3,
            },
            {
              subject: "Geometry",
              topic: "Polygon basics",
              time: "1:00 PM - 2:00 PM",
              color: "bg-violet-500",
              attendees: 2,
            },
            {
              subject: "Algebra",
              topic: "Equations and inequalities",
              time: "3:30 PM - 4:30 PM",
              color: "bg-green-500",
              attendees: 3,
            },
          ].map((lesson, index) => (
            <div
              key={index}
              className="p-4 bg-white border rounded-xl flex items-center justify-between relative overflow-hidden"
            >
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 ${lesson.color}`}
              />
              <div className="space-y-1">
                <p className="text-sm text-gray-400">{lesson.subject}</p>
                <p className="font-medium text-gray-800">{lesson.topic}</p>
                <p className="text-sm text-gray-400">{lesson.time}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {Array.from({ length: lesson.attendees }).map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white"
                    />
                  ))}
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="text-gray-400"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
