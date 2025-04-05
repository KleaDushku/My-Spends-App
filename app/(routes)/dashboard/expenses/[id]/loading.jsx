import React from 'react';

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 via-fuchsia-600 to-pink-500">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-white border-t-yellow-300 rounded-full animate-spin"></div>
        <p className="text-white text-xl font-semibold animate-pulse">Loading...</p>
      </div>
    </div>
  );
}

export default Loading;
