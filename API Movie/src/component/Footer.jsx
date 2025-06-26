// Komponen Footer
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 p-8 mt-10 rounded-t-lg shadow-lg">
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold mb-2">LayarLebar</p>
        <p className="text-sm">
          Menjelajahi dunia sinema dengan kecerdasan.
        </p>
        <div className="flex justify-center space-x-4 my-4">
          {/* Placeholder untuk ikon media sosial atau tautan lain */}
          <a href="#" className="hover:text-white transition-colors duration-300">
            <svg className="w-5 h-5 inline-block mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {/* Example: Basic Facebook icon path (replace with actual icons if desired) */}
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22h6.76c3.272-1.666 5.54-5.027 5.54-8.878Z" clipRule="evenodd" />
            </svg>
            Facebook
          </a>
          <a href="#" className="hover:text-white transition-colors duration-300">
            <svg className="w-5 h-5 inline-block mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {/* Example: Basic Twitter icon path */}
              <path d="M22.19 5.86a8.66 8.66 0 0 1-2.53.69 4.33 4.33 0 0 0 1.88-2.45 8.64 8.64 0 0 1-2.73 1.05 4.33 4.33 0 0 0-7.39 3.96 12.26 12.26 0 0 1-8.91-4.52 4.33 4.33 0 0 0 1.34 5.78 4.31 4.31 0 0 1-1.96-.54v.05a4.33 4.33 0 0 0 3.47 4.25 4.33 4.33 0 0 1-1.95.07 4.33 4.33 0 0 0 4.04 3 8.66 8.66 0 0 1-5.36 1.85c-.35 0-.7-.02-1.04-.06A12.28 12.28 0 0 0 3.75 20c7.5 0 11.63-6.2 11.63-11.63V8.37a8.23 8.23 0 0 0 2.05-2.17 8.16 8.16 0 0 0 .56-2.34z" />
            </svg>
            Twitter
          </a>
          {/* Tambahkan ikon lain jika diperlukan */}
        </div>
        <p className="text-xs">
          Data film disediakan oleh <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">TMDB</a>.
        </p>
        <p className="text-xs mt-1">
          &copy; {new Date().getFullYear()} Dunia Streaming. Hak Cipta Dilindungi Undang-Undang.
        </p>
      </div>
    </footer>
  );
};

export default Footer;