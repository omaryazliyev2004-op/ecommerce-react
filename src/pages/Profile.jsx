import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Data/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [form, setForm] = useState({
        displayName: "",
        phone: "",
        address: "",
        bio: "",
        avatarUrl: "",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (!currentUser) { navigate("/login"); return; }
            setUser(currentUser);
            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) setForm((prev) => ({ ...prev, ...docSnap.data() }));
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await setDoc(doc(db, "users", user.uid), form, { merge: true });
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (error) { console.error(error); }
        setSaving(false);
    };

    const handleLogout = async () => { await signOut(auth); navigate("/login"); };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f5f5f7] dark:bg-[#030712]">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
        );
    }

    const initials = form.displayName
        ? form.displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
        : user?.email[0].toUpperCase();

    return (
        <main className="min-h-screen bg-[#f5f5f7] dark:bg-[#030712]">

            {/* Hero banner */}
            <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700">
                {/* Pattern */}
                <div className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                              radial-gradient(circle at 80% 20%, white 1px, transparent 1px),
                              radial-gradient(circle at 60% 80%, white 1px, transparent 1px)`,
                        backgroundSize: "60px 60px"
                    }}
                />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f5f5f7] dark:from-[#030712] to-transparent" />
            </div>

            <div className="mx-auto max-w-2xl px-5 sm:px-8">

                {/* Avatar */}
                <div className="relative -mt-16 mb-6 flex items-end justify-between">
                    <div className="relative">
                        {form.avatarUrl ? (
                            <img
                                src={form.avatarUrl}
                                alt="Avatar"
                                className="h-32 w-32 rounded-[28px] object-cover border-4 border-[#f5f5f7] dark:border-[#030712] shadow-2xl"
                                onError={(e) => e.target.style.display = "none"}
                            />
                        ) : (
                            <div className="h-32 w-32 rounded-[28px] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-4xl font-black text-white border-4 border-[#f5f5f7] dark:border-[#030712] shadow-2xl">
                                {initials}
                            </div>
                        )}
                        {/* Online dot */}
                        <span className="absolute bottom-2 right-2 h-4 w-4 rounded-full bg-green-500 border-2 border-[#f5f5f7] dark:border-[#030712]" />
                    </div>

                    <Link
                        to="/orders"
                        className="mb-3 flex items-center justify-center gap-2 w-full rounded-full border border-gray-200 py-4 text-sm font-bold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                        📦 Buyurtmalar tarixi
                    </Link>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="mb-2 flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-bold text-red-500 shadow-sm transition hover:bg-red-500 hover:text-white hover:border-red-500 dark:border-red-500/20 dark:bg-gray-900 dark:hover:bg-red-500 dark:hover:border-red-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>

                {/* Ism va email */}
                <div className="mb-6">
                    <h1 className="text-3xl font-black text-gray-950 dark:text-white">
                        {form.displayName || "Foydalanuvchi"}
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                    {form.bio && (
                        <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">{form.bio}</p>
                    )}

                    {/* Badges */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {form.phone && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                {form.phone}
                            </span>
                        )}
                        {form.address && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {form.address}
                            </span>
                        )}
                    </div>
                </div>

                {/* Form */}
                <div className="mb-12 overflow-hidden rounded-[32px] border border-white/80 bg-white/70 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-gray-800/80 dark:bg-gray-900/70">

                    {/* Form header */}
                    <div className="border-b border-gray-100 px-8 py-5 dark:border-gray-800">
                        <h2 className="text-lg font-black text-gray-950 dark:text-white">Ma'lumotlarni tahrirlash</h2>
                    </div>

                    <form onSubmit={handleSave} className="grid gap-5 p-8 sm:grid-cols-2">

                        {/* Avatar URL - full width */}
                        <div className="sm:col-span-2">
                            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                                Profil rasmi URL
                            </label>
                            <input
                                type="url"
                                name="avatarUrl"
                                value={form.avatarUrl}
                                onChange={handleChange}
                                placeholder="https://example.com/avatar.jpg"
                                className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800/80 dark:text-white"
                            />
                        </div>

                        {/* Ism */}
                        <div>
                            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                                Ism familiya
                            </label>
                            <input
                                type="text"
                                name="displayName"
                                value={form.displayName}
                                onChange={handleChange}
                                placeholder="Ism Familiya"
                                className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800/80 dark:text-white"
                            />
                        </div>

                        {/* Telefon */}
                        <div>
                            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                                Telefon
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="+998 90 123 45 67"
                                className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800/80 dark:text-white"
                            />
                        </div>

                        {/* Manzil - full width */}
                        <div className="sm:col-span-2">
                            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                                Manzil
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                placeholder="Shahar, ko'cha, uy"
                                className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800/80 dark:text-white"
                            />
                        </div>

                        {/* Bio - full width */}
                        <div className="sm:col-span-2">
                            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                                O'zi haqida
                            </label>
                            <textarea
                                name="bio"
                                value={form.bio}
                                onChange={handleChange}
                                placeholder="O'zingiz haqida qisqacha..."
                                rows="3"
                                className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800/80 dark:text-white"
                            />
                        </div>

                        {/* Email */}
                        <div className="sm:col-span-2">
                            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                                Email
                            </label>
                            <input
                                type="email"
                                value={user?.email}
                                disabled
                                className="w-full rounded-2xl border border-gray-100 bg-gray-50/80 px-4 py-3 text-sm text-gray-400 outline-none cursor-not-allowed dark:border-gray-800 dark:bg-gray-800/50 dark:text-gray-600"
                            />
                        </div>

                        {/* Save button - full width */}
                        <div className="sm:col-span-2">
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-blue-500/30 disabled:opacity-70 disabled:hover:translate-y-0"
                            >
                                {saving ? "Saqlanmoqda..." : saved ? "✓ Saqlandi!" : "Saqlash"}
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </main>
    );
}