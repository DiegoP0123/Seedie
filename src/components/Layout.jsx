import { Outlet, NavLink } from "react-router";
import React from "react";

function LeafLogo() {
  return (
    <span className="text-emerald-600 border-2 border-emerald-100 rounded-2xl" aria-hidden="true">
      <svg viewBox="0 0 48 48" role="img" focusable="false" className="h-8 w-8">
        <path
          d="M28.2 6.8c6.5 1.6 11 6.8 11.6 13.1-7.4 1-13.9-1.3-18.2-6.4 1.4-3 3.5-5.3 6.6-6.7Z"
          fill="currentColor"
        />
        <path
          d="M17.5 17.1c-6.1 2.5-9.6 8.2-9 14.4 7.2-.2 13-3.6 16.1-9.5-1.9-2.5-4.2-4-7.1-4.9Z"
          fill="currentColor"
        />
        <path
          d="M23.2 13.8c2.2 8.3 1.1 17-3.7 26.1"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M21.4 28.4c5.9-.7 11.1.8 15.7 4.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function Layout() {
  const [open, setOpen] = React.useState(false);

  const navLinks = [
    { label: "Inicio", href: "/" },
    { label: "Categorías", href: "/categorias" },
    { label: "Cuaderno", href: "/cuaderno" },
    { label: "Comunidad", href: "/comunidad" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-stone-800">
      {/* NAVBAR */}
      <header
        id="inicio"
        className="sticky top-0 z-50 bg-[#FBFDF8]/90 backdrop-blur-sm border-b border-stone-200"
      >
        <nav
          className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16"
          aria-label="Navegación principal"
        >
          {/* Marca */}
          <NavLink
            to="/"
            aria-label="Seedie inicio"
            className="flex items-center gap-2 text-xl font-extrabold text-stone-900 tracking-tight"
          >
            <LeafLogo />
            Seedie
          </NavLink>

          {/* Links - desktop */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <NavLink
                to={link.href}
                className={({ isActive }) =>
                        `text-sm font-medium rounded-full px-3 py-1.5 -mx-3 -my-1.5 transition-colors hover:bg-stone-200/60 hover:text-emerald-700 border ${
                            isActive
                            ? "text-emerald-700 border-emerald-700 bg-emerald-50"
                            : "text-stone-600 border-transparent"
                    }`}
                >
                {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA - desktop */}
          <a
            href="#cuaderno"
            className="hidden md:inline-flex items-center rounded-full bg-emerald-700 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-800"
          >
            Agregar planta
          </a>

          {/* Botón hamburguesa - mobile */}
          <button
            type="button"
            className="md:hidden inline-flex flex-col justify-center gap-1.5 h-10 w-10 rounded-lg hover:bg-stone-200/60"
            aria-controls="seedieNavbar"
            aria-expanded={open}
            aria-label="Abrir menú de navegación"
            onClick={() => setOpen(!open)}
          >
            <span
              className={`block h-0.5 w-6 mx-auto bg-stone-800 transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 mx-auto bg-stone-800 transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-6 mx-auto bg-stone-800 transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </nav>

        {/* Menú - mobile */}
        <div
          id="seedieNavbar"
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            open ? "max-h-96 border-t border-stone-200" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col px-4 sm:px-6 py-3">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block py-2.5 text-sm font-medium ${
                    link.active ? "text-emerald-700" : "text-stone-600"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2 pb-1">
              <a
                href="#cuaderno"
                onClick={() => setOpen(false)}
                className="inline-flex items-center rounded-full bg-emerald-700 px-5 py-2 text-sm font-medium text-white"
              >
                Agregar planta
              </a>
            </li>
          </ul>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-emerald-950 text-emerald-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <span className="text-emerald-400">
                <LeafLogo />
              </span>
              Seedie
            </div>

            <nav aria-label="Enlaces del footer">
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <li>
                  <a href="#inicio" className="hover:text-white transition-colors">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#categorias" className="hover:text-white transition-colors">
                    Categorías
                  </a>
                </li>
                <li>
                  <a href="#cuaderno" className="hover:text-white transition-colors">
                    Cuaderno
                  </a>
                </li>
                <li>
                  <a href="#comunidad" className="hover:text-white transition-colors">
                    Comunidad
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="mt-8 pt-6 border-t border-emerald-800/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-emerald-300/80">
            <p>© {new Date().getFullYear()} Seedie. Cultivado con cuidado.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">
                Privacidad
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Términos
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;