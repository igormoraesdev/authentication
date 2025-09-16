'use client';

import { signOut } from 'next-auth/react';

export const SignoutButton = () => (
  <button
    onClick={() => signOut()}
    className="flex justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    Sair
  </button>
);
