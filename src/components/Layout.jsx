import { Outlet, NavLink } from "react-router";
import React from "react";
import logo from "../assets/Seedie.svg";

function LeafLogo() {
  return (
    <svg
      className="h-10 w-10 text-emerald-600"
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)"
        fill="currentColor"
        stroke="none"
      >
        <path d="M398 2403 c-51 -6 -53 -17 -52 -248 0 -164 4 -206 26 -310 46 -218
          115 -358 233 -480 151 -156 372 -253 649 -285 151 -18 156 -19 156 -39 0 -10
          -22 -37 -50 -60 -58 -49 -114 -154 -131 -246 -41 -221 84 -506 259 -592 45
          -22 62 -25 115 -21 35 3 78 13 97 23 63 32 135 116 178 206 85 179 95 358 26
          504 -24 51 -79 125 -93 125 -5 0 -14 -28 -21 -62 -15 -80 -47 -144 -117 -238
          -78 -105 -105 -168 -111 -257 -3 -40 -8 -73 -12 -73 -14 0 -33 121 -27 178 4
          44 22 90 76 197 80 161 87 182 96 290 7 89 41 229 58 243 7 5 41 16 75 26 139
          37 238 112 290 219 29 61 57 161 47 176 -7 12 -116 -6 -177 -29 -126 -47 -223
          -141 -291 -282 -23 -49 -45 -88 -49 -88 -5 0 -8 30 -8 68 0 83 -23 243 -49
          342 -103 400 -346 620 -771 695 -93 16 -349 27 -422 18z m407 -108 c116 -21
          250 -66 334 -112 98 -54 227 -187 278 -288 50 -98 86 -210 107 -335 17 -102
          33 -300 23 -300 -3 0 -29 33 -59 73 -168 228 -414 470 -606 595 -77 50 -86
          53 -110 42 l-27 -12 41 -36 c22 -21 96 -86 163 -147 265 -236 512 -530 608
          -722 30 -62 36 -84 40 -160 3 -48 0 -99 -5 -113 -10 -25 -10 -25 -27 15 -46
          110 -97 209 -144 282 l-51 80 -117 16 c-275 37 -488 135 -606 279 -140 171
          -217 428 -217 726 0 151 -5 146 154 139 72 -4 172 -14 221 -22z"/>
      </g>
    </svg>
  );
}

function Layout() {
  const [open, setOpen] = React.useState(false);

  const navLinks = [
    { label: "Inicio", href: "/" },
    { label: "Categorías", href: "/categorias" },
    { label: "Sobre Nosotros", href: "/sobrenosotros" },
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
                <NavLink
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block py-2.5 text-sm font-medium ${
                      isActive ? "text-emerald-700" : "text-stone-600"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
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