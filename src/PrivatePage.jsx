import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SignedIn = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found — please log in.");
        return;
      }

      try {
        const res = await fetch("http://localhost:8000/api/users/userloggedin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Unauthorized or invalid token");
        }

        const data = await res.json();
        console.log("✅ User data:", data);
        setUserData(data.user);

      } catch (err) {
        console.error("🚨 Error fetching user:", err);
        setError(err.message);
      }
    };

    fetchUserData();
  }, []);

  return (
    <main>
      <h1>
        {error
          ? "⚠️ " + error
          : userData
          ? `Welcome back, ${userData.name}! 🎉`
          : "Loading user info..."}
      </h1>

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

          <div className="flex items-end justify-center md:justify-end">
            <p className="text-gray-200 text-sm">Developed with ❤️ by Vither Castro</p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default SignedIn;
