import React from 'react';

export const SkeletonLoader = () => {
  return (
    <div className='flex flex-col md:flex-row gap-8 w-full animate-pulse'>
      {/* Main weather display skeleton */}
      <div className='flex flex-col gap-6 items-center justify-start max-w-[400px]'>
        <div className='py-8 px-6 bg-base-100 rounded-lg shadow-lg w-full'>
          {/* Weather icon skeleton */}
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-gray-200 h-[120px] w-[120px]"></div>
          </div>
          
          {/* Weather info skeletons */}
          <div className='text-center'>
            <div className='h-10 bg-gray-200 rounded w-32 mx-auto mb-2'></div>
            <div className='h-6 bg-gray-200 rounded w-48 mx-auto mb-2'></div>
            <div className='h-4 bg-gray-200 rounded w-40 mx-auto'></div>
          </div>
        </div>
      </div>
      
      {/* Weather details skeleton */}
      <div className='flex flex-col gap-4 flex-1'>
        <div className='bg-base-100 rounded-lg shadow-lg p-6'>
          {/* Heading skeleton */}
          <div className='h-7 bg-gray-200 w-48 rounded mb-4'></div>
          
          {/* Wind status skeleton */}
          <div className='p-4 bg-base-200 rounded-lg mb-4'>
            <div className='h-5 bg-gray-300 w-32 rounded mb-2'></div>
            <div className='flex items-center gap-2'>
              <div className='h-6 w-6 bg-gray-300 rounded'></div>
              <div className='h-8 bg-gray-300 w-20 rounded'></div>
            </div>
          </div>
          
          {/* Humidity skeleton */}
          <div className='p-4 bg-base-200 rounded-lg'>
            <div className='h-5 bg-gray-300 w-24 rounded mb-2'></div>
            <div className='flex items-center gap-2'>
              <div className='h-6 w-6 bg-gray-300 rounded'></div>
              <div className='h-8 bg-gray-300 w-20 rounded'></div>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
