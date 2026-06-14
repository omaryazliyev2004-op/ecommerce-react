import { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../Data/firebase";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");


    const registerUser = async (e) => {
        e.preventDefault();
        setErrorMsg("");


        try {
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            navigate("/");

        } catch (error) {
            setErrorMsg(error.message);
        }
    };

    return (
        <main className="relative min-h-screen flex items-center justify-center px-5 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950">

            {/* Animated gradient orbs */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-violet-600/30 blur-[120px] animate-pulse" />
                <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-blue-600/30 blur-[120px] animate-pulse" style={{ animationDelay: "1.5s" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-indigo-600/20 blur-[100px] animate-pulse" style={{ animationDelay: "0.75s" }} />
            </div>

            {/* Floating particles */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white/10"
                        style={{
                            width: `${Math.random() * 6 + 2}px`,
                            height: `${Math.random() * 6 + 2}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${Math.random() * 6 + 4}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 4}s`,
                        }}
                    />
                ))}
            </div>

            {/* Grid mesh */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Card */}
            <div className="relative w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_32px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl">

                <div className="text-center">
                    <span className="inline-flex items-center justify-center h-14 w-14 rounded-[18px] bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/30 text-2xl mb-4">✨</span>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-violet-400">
                        Create Account
                    </p>
                    <h1 className="mt-3 text-4xl font-black text-white">
                        Register
                    </h1>
                    <p className="mt-2 text-sm text-white/40">
                        Create a new account to continue.
                    </p>
                </div>

                <form onSubmit={registerUser} className="mt-10 flex flex-col gap-5">

                    <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/50">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/50">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20"
                            required
                        />
                    </div>

                    {errorMsg && (
                        <p className="text-red-400 text-sm text-center bg-red-500/10 rounded-xl py-2">{errorMsg}</p>
                    )}

                    <button
                        type="submit"
                        className="mt-2 w-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 py-4 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition hover:-translate-y-1 hover:shadow-violet-500/50 hover:from-violet-500 hover:to-indigo-500"
                    >
                        Create Account
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-white/40">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-violet-400 transition hover:text-violet-300"
                    >
                        Login
                    </Link>
                </p>

            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
                    50% { transform: translateY(-20px) scale(1.1); opacity: 0.7; }
                }
            `}</style>
        </main>
    );
}

export default Register;