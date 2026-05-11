import { Link } from "react-router-dom";

const footerLinks = {
  Shop: [
    { label: "iPhone", to: "/iphone" },
    { label: "Mac", to: "/mac" },
    { label: "Watch", to: "/watch" },
    { label: "Cart", to: "/cart" },
  ],
  Support: [
    { label: "FAQ", to: "#" },
    { label: "Yetkazib berish", to: "#" },
    { label: "Qaytarish", to: "#" },
    { label: "Bog'lanish", to: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f7] text-sm text-gray-500 dark:bg-gray-950 dark:text-gray-400">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 border-b border-gray-200 px-5 py-12 sm:px-8 md:grid-cols-4 lg:px-10 dark:border-gray-800">
        <div className="flex flex-col gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 814 1000" className="h-8 w-8 fill-gray-950 dark:fill-white">
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 134.4-317.3 265.5-317.3 69.8 0 127.9 45.6 171.6 45.6 41.8 0 107.5-48 185.9-48 29.8 0 130.3 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
          </svg>
          <p className="max-w-[230px] text-xs leading-6">
            Premium Apple mahsulotlari, tez yetkazib berish va qulay servis.
          </p>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="mb-4 font-black text-gray-950 dark:text-white">{title}</h4>
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <li key={link.label}>
                  {link.to === "#" ? (
                    <a href={link.to} className="transition hover:text-gray-950 dark:hover:text-white">
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.to} className="transition hover:text-gray-950 dark:hover:text-white">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="mb-4 font-black text-gray-950 dark:text-white">Bog'lanish</h4>
          <ul className="flex flex-col gap-3">
            <li>support@apple.uz</li>
            <li>+998 71 123 45 67</li>
            <li>Toshkent, Uzbekistan</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 sm:px-8 md:flex-row lg:px-10">
        <p>© 2026 Apple Store UZ. Barcha huquqlar himoyalangan.</p>
        <div className="flex gap-6">
          <a href="#" className="transition hover:text-gray-950 dark:hover:text-white">Maxfiylik</a>
          <a href="#" className="transition hover:text-gray-950 dark:hover:text-white">Shartlar</a>
          <a href="#" className="transition hover:text-gray-950 dark:hover:text-white">Cookies</a>
          <Link
            to="/admin-login"
            className="transition hover:text-gray-950 dark:hover:text-white opacity-0 hover:opacity-100 select-none"
          >
            ADMIN PANELGA
          </Link>
        </div>
      </div>
    </footer>
  );
}