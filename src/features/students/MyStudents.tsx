import React from 'react';
import { ROUTES } from '../../shared/constants/routes';
import { COURSES } from '../../shared/constants/courses';
import { Users } from 'lucide-react';

export const MyStudentsPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">My Students</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COURSES.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100 flex flex-col h-64">
            <div className="p-6 flex-1 flex flex-col">
              <div className="mb-3">
                <span className="px-2.5 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                  Semester {course.semester}
                </span>
              </div>
              <h2 className="text-lg font-bold text-gray-800 mb-1">{course.id}: {course.name}</h2>
              <p className="text-gray-500 text-sm">Credits: {course.credits}</p>
              <div className="mt-auto border-t border-indigo-50 pt-4">
                <button 
                  className="w-full flex items-center justify-center space-x-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 py-2 px-4 rounded-lg transition-colors"
                  onClick={() => alert(`Viewing students for ${course.name}`)}
                >
                  <Users size={16} />
                  <span>View Students</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};