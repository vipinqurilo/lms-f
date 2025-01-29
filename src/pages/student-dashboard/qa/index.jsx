"use client";

import { useState } from "react";
import { MessageSquare, Eye } from "lucide-react";
import StudentDashboardLayout from "../../../layouts/student-dashboard/StudentDashboardLayout";
import { Pagination } from "../../../components/student-dashboard/Pagination";
import { QuestionTypeIcon } from "../../../components/student-dashboard/QuestionTypeIcon";

const questions = [
  {
    id: "1",
    number: "Q1",
    question: "AngularJS and Angular refer to the same framework.",
    course: "Learn Angular Fundamentals Beginners Guide",
    type: "mcq",
    date: "March 24, 2024",
    time: "09:30 AM",
    replies: 0,
  },
  {
    id: "2",
    number: "Q2",
    question: "What is the purpose of Angular's NgIf directive?",
    course: "Learn Angular Fundamentals Beginners Guide",
    type: "code",
    date: "March 24, 2024",
    time: "09:30 AM",
    replies: 0,
  },
  {
    id: "3",
    number: "Q3",
    question: "Observables are not part of Angular's HTTP module.",
    course: "Learn Angular Fundamentals Beginners Guide",
    type: "mcq",
    date: "March 24, 2024",
    time: "09:30 AM",
    replies: 0,
  },
  {
    id: "4",
    number: "Q4",
    question: "Which of the following is a valid way to bind data in Angular?",
    course: "Learn Angular Fundamentals Beginners Guide",
    type: "code",
    date: "March 24, 2024",
    time: "09:30 AM",
    replies: 0,
  },
  {
    id: "5",
    number: "Q5",
    question: "Angular applications can only be written in TypeScript.",
    course: "Learn Angular Fundamentals Beginners Guide",
    type: "mcq",
    date: "March 24, 2024",
    time: "09:30 AM",
    replies: 0,
  },
];

export default function QAPage() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <StudentDashboardLayout className="space-y-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="text-2xl font-semibold p-4 px-8 ">
          Question & Answer
        </div>
        <hr />
        {/* Questions Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden px-8 p-4 ">
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full ">
              <thead className="bg-gray-50 ">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Question No
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Question
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Course
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Date
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                    No of Replies
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {questions.map((question) => (
                  <tr key={question.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">
                      {question.number}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {question.question}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {question.course}
                    </td>
                    <td className="px-6 py-4">
                      <QuestionTypeIcon type={question.type} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {question.date}
                      <br />
                      {question.time}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">
                      {question.replies}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-4">
                        <button className="text-gray-400 hover:text-primary flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          <span className="text-sm">Reply</span>
                        </button>
                        <button className="text-gray-400 hover:text-primary flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">View</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t">
            <Pagination
              currentPage={currentPage}
              totalPages={2}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </StudentDashboardLayout>
  );
}
