'use client';

export const ErrorButton = () => (
  <>
    <button
      onClick={() => {
        fetch('/api/force-error-server');
      }}
      className="bg-indigo-500 text-white px-4 py-2 rounded-md cursor-pointer"
    >
      Error server side
    </button>
    <button
      onClick={() => {
        throw new Error('Error client side');
      }}
      className="bg-indigo-500 text-white px-4 py-2 rounded-md cursor-pointer"
    >
      Error client side
    </button>
  </>
);
