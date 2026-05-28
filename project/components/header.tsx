"use client"; 

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { removeSessionCookie } from '@/lib/session';


const links = [
  { href: '/', label: 'Accueil' },
  { href: '/blogs', label: 'blogs' },
  { href: '/about', label: 'À propos' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    await removeSessionCookie();
    router.push('/');
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 h-14">
        <Link href="/" className="flex items-center gap-2 font-medium text-gray-900">
          Projet blog
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                pathname === href
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link href="/login" className="text-sm px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50">
            Connexion
          </Link>
          <Link href="/register" className="text-sm px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50">
            S'inscrire
          </Link>
          <button onClick={() =>{ handleLogout(); }} className="text-sm px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50">
            Se Déconnecter
          </button>
          <button
            className="md:hidden border border-gray-200 rounded-md p-1.5"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden flex flex-col px-4 pb-4 gap-1 border-t border-gray-100">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="py-2.5 px-2 text-gray-700 hover:bg-gray-50 rounded-md" onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}