"use client"; 

import Link from 'next/link';

const navigation = [
  { href: '/', label: 'Accueil' },
  { href: '/blogs', label: 'blogs' },
  { href: '/about', label: 'À propos' },
];

const Account = [
  { href: '/signin', label: 'Inscription' },
  { href: '/login', label: 'Connexion' },
  { href: '/profil', label: 'Mon Profil' },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-medium text-gray-900 mb-3">
              Projet blogs
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              Rechercher des informations sur l'actualité et plus.
            </p>
            <div className="flex gap-2">
              {['twitter', 'github', 'linkedin'].map((s) => (
                <a key={s} href="#" className="w-8 h-8 border border-gray-200 rounded-md flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors">
                  <span className="sr-only">{s}</span>
                </a>
              ))}
            </div>
          </div>

          {[
            { title: 'Navigation', links: navigation },
            { title: 'Compte', links: Account },
          ].map(({ title, links }) => (
            <div key={title}>
              <p className="text-xs font-medium text-gray-900 uppercase tracking-wider mb-3">{title}</p>
              <ul className="space-y-2">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">© 2026 Projet blogs. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}