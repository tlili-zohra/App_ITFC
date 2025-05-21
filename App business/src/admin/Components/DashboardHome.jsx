import React from "react";

export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-yellow-400 mb-4 drop-shadow">
        Welcome to your Admin Dashboard!
      </h1>
      <p className="text-yellow-100 mb-8">
        Use the navigation menu to manage users, videos, payments, and folders.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 rounded-xl shadow-md p-6 flex flex-col items-center">
          <span className="text-4xl mb-2 text-blue-700">👥</span>
          <span className="font-semibold text-blue-900">User Management</span>
          <span className="text-sm text-gray-500 mt-1 text-center">
            View, edit, and organize all users of the platform.
          </span>
        </div>
        <div className="bg-white/80 rounded-xl shadow-md p-6 flex flex-col items-center">
          <span className="text-4xl mb-2 text-violet-700">🎬</span>
          <span className="font-semibold text-violet-900">
            Video Management
          </span>
          <span className="text-sm text-gray-500 mt-1 text-center">
            Add, update, or remove training and management videos.
          </span>
        </div>
        <div className="bg-white/80 rounded-xl shadow-md p-6 flex flex-col items-center">
          <span className="text-4xl mb-2 text-yellow-500">💳</span>
          <span className="font-semibold text-yellow-700">Payment Video</span>
          <span className="text-sm text-gray-500 mt-1 text-center">
            Track and manage video payments for each user.
          </span>
        </div>
        <div className="bg-white/80 rounded-xl shadow-md p-6 flex flex-col items-center">
          <span className="text-4xl mb-2 text-yellow-600">📁</span>
          <span className="font-semibold text-yellow-800">User Folders</span>
          <span className="text-sm text-gray-500 mt-1 text-center">
            Organize and access folders for every user.
          </span>
        </div>
      </div>
    </div>
  );
}
