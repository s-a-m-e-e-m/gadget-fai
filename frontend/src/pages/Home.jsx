import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Gadgets from "./Gadgets";

const Home = () =>  {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-100">
            <Toaster position="top-center" />

            <section className="border-b border-slate-800/80 bg-[linear-gradient(135deg,#020617_15%,#0f172a_55%,#111827_100%)]">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-16 sm:px-10">
                    <p className="w-fit rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                        Gadget Hub
                    </p>
                    <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">
                        Discover Smart Gadgets
                    </h1>
                    <p className="max-w-2xl text-base text-slate-300 sm:text-lg">
                        Browse modern devices, compare specs quickly, and jump into your account to manage your favorites.
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <Link
                            to="/signin"
                            className="rounded-lg bg-cyan-500 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-cyan-400"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/signup"
                            className="rounded-lg border border-slate-600 bg-slate-900 px-5 py-2.5 font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </section>

            <Gadgets />
        </main>
    )
}

export default Home;