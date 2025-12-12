import Search from './components/Search.jsx';
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';
import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateSearchCount } from './appwrite.js';
import { useParams, Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [open, setOpen] = useState(false);
    const [token, setToken] = useState('');
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [privateData, setPrivateData] = useState('');
    const navigate = useNavigate();

    async function login(e) {
    e.preventDefault(); // <-- evita que el form recargue la página
    setPrivateData('');

    try {
      const response = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
console.log("🔹 Login response:", data);

if (response.ok && data.token) {  // verificar que el token exista
  localStorage.setItem("token", data.token); // guarda en localStorage
  setToken(data.token);                    // guarda en estado si quieres
  setFormData({ email: '', password: '' });
  navigate('/userloggedin');
} else {
  alert(`❌ ${data.message || 'Login failed'}`);
}

    } catch (err) {
      console.error("🚨 Error during login:", err);
      alert("Server connection error");
    }
  }

  const handleModification = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
    return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header className="max-w-md mx-auto mb-20">
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
          <h1>Login to <span className="text-gradient">Trailer Freak</span> </h1><br /><br />
          <form class="max-w-md mx-auto" onSubmit={login}>
            <div class="relative z-0 w-full mb-5 group">
                <input type="email" name="email" id="floating_email" value={formData.email} onChange={handleModification} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <input type="password" name="password" id="floating_password" value={formData.password} onChange={handleModification} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>
            <button type="submit" class="text-white bg-[#470047] hover:bg-[#5C005C] focus:ring-4 focus:outline-none focus:ring-[#8A008A] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#470047] dark:hover:bg-[#5C005C] dark:focus:ring-[#8A008A]">Submit</button>
            </form>
        </header>
      </div>
      <footer className="bg-[#470047] text-white py-10 mt-10 relative z-10">
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

export default Login;