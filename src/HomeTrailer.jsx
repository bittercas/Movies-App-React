import Search from './components/Search.jsx';
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';
import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateSearchCount } from './appwrite.js';
import { useParams, Link } from 'react-router-dom';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const HomeTrailer = () => {
    const [open, setOpen] = useState(false); // Navbar toggle
    const {title} = useParams();
    const [trailer, setTrailer] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchTrailer = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/trailer/${encodeURIComponent(title)}`);
            if(!response.ok) {
                throw new Error ('Error Fetching Trailer');
            }
            const data = await response.json();
            setTrailer(data);
        }
        catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log(title)
        fetchTrailer();
    }, [title]);

    return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <nav className="fixed top-0 left-0 w-full z-50 border-light-200 bg-light-100 dark:bg-dark-100 dark:border-dark-100">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Trailer Freak
                </span>
              </a>
              <button
                onClick={() => setOpen(!open)}
                type="button"
                className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
              </button>
              <div className={`${open ? 'block' : 'hidden'} absolute top-full right-0 z-50`}>
                <ul className="flex flex-col font-medium mt-2 rounded-lg bg-[#8C5EFF] dark:bg-[#AB8BFF] w-48 px-2 py-2 shadow-lg">
                  <li>
                    <Link className="block py-2 px-3 text-white rounded-sm dark:text-dark-100" to="/">Home</Link>
                  </li>
                  <li>
                    <Link className="block py-2 px-3 text-white rounded-sm dark:text-dark-100" to="/register">Register</Link>
                  </li>
                  <li>
                    <Link className="block py-2 px-3 text-white rounded-sm dark:text-dark-100" to="/login">Login</Link>
                  </li>
                  <li>
                    <a href="#" className="block py-2 px-3 text-white rounded-sm hover:bg-light-200 dark:hover:bg-dark-100">Forum</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <h1>Watch <span className="text-gradient">{title}</span> Trailer Now!</h1>
          {loading ? (
            <Spinner />
          ) : <section className='youtubeTrailer'>
          {trailer && (
            <iframe
                width="800"
                height="450"
                src={`https://www.youtube.com/embed/${trailer.videoId}`}
                title={trailer.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
            </iframe>
            )}
            </section>
            }
        </header>
      </div>
      <footer className="bg-[#470047] text-white py-10 mt-10">
        <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <ul className="space-y-2">
              <li><Link className="hover:text-gray-200" to="/">Home</Link></li>
              <li><Link className="hover:text-gray-200" to="/register">Register</Link></li>
              <li><Link className="hover:text-gray-200" to="/login">Login</Link></li>
              <li><a className="hover:text-gray-200" href="#forum">Forum</a></li>
          </ul>
        </div>
        <div>
          <ul className="space-y-2 text-gray-100">
            <li>&copy; 2025 Trailer Freak. All rights reserved</li>
            <li>Instagram: @bittercastro</li>
            <li>Email: vithercj@gmail.com</li>
        </ul>
      </div>

    {/* Columna derecha */}
    <div className="flex items-end justify-center md:justify-end">
      <p className="text-gray-200 text-sm">Developed with ❤️ by Vither Castro</p>
    </div>
  </div>
</footer>

    </main>
  );
};

export default HomeTrailer;