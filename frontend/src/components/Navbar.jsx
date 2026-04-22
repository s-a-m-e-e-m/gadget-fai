import React from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import { logoutlink } from '../utils/links';

const Navbar = () => {
    const { user, setUser }  = React.useContext(AuthContext);

    const handleLogout = async () => {
        const res = await axios.delete(logoutlink, { withCredentials: true });
        if (res.status === 200) {
            setUser(null);
        }
    };


  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-10">
            <Link to="/" className="text-lg font-black tracking-tight text-slate-100 transition hover:text-cyan-300">
                GadgifAI
            </Link>

            {user ? (
                <div className="flex items-center gap-3">
                    <span className="hidden rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm font-medium text-slate-300 sm:inline-flex">
                        {user.name}
                    </span>
                    <button
                        onClick={handleLogout}
                        className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-2 sm:gap-3">
                    <Link
                        to="/signin"
                        className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300"
                    >
                        Sign In
                    </Link>
                    <Link
                        to="/signup"
                        className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                        Sign Up
                    </Link>
                </div>
            )}
        </div>
    </header>
  )
}

export default Navbar
