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
        <main className="min-h-screen bg-[#f5f5f7] dark:bg-[#030712] flex items-center justify-center px-5">

            <div className="w-full max-w-md rounded-[32px] border border-white/50 bg-white/70 p-8 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-gray-800 dark:bg-gray-900/70">

                <div className="text-center">

                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
                        Create Account
                    </p>

                    <h1 className="mt-4 text-4xl font-black text-gray-950 dark:text-white">
                        Register
                    </h1>

                    <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                        Create a new account to continue.
                    </p>
                </div>

                <form onSubmit={registerUser} className="mt-10 flex flex-col gap-5">

                    <div>
                        <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800/80 dark:text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800/80 dark:text-white"
                            required
                        />
                    </div>

                    {errorMsg && (
                        <p className="text-red-500 text-sm text-center">{errorMsg}</p>
                    )}

                    <button
                        type="submit"
                        className="mt-2 w-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition hover:-translate-y-1 hover:shadow-blue-500/40"
                    >
                        Create Account
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-blue-600 transition hover:text-blue-500 dark:text-blue-400"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </main>
    );
}

export default Register;