import React from 'react';

const TableLoader: React.FC = () => {
  return (
    <div className="min-w-full bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mt-4 mx-4"></div>
        <div className="flex flex-col space-y-2 mt-4 px-4 pb-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex space-x-4">
              <div className="w-1/3 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="w-1/3 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="w-1/3 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableLoader;
