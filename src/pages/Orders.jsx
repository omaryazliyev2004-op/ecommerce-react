import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../Data/firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (!user) { navigate("/login"); return; }

            try {
                const q = query(
                    collection(db, "orders"),
                    where("userId", "==", user.uid),
                    orderBy("createdAt", "desc")
                );
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setOrders(data);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f5f5f7] dark:bg-[#030712]">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#f5f5f7] px-5 py-12 sm:px-8 lg:px-10 dark:bg-[#030712]">
            <div className="mx-auto max-w-3xl">

                <div className="mb-10">
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
                        Buyurtmalar
                    </p>
                    <h1 className="mt-3 text-4xl font-black text-gray-950 dark:text-white">
                        Tarix
                    </h1>
                </div>

                {orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-[32px] bg-white py-20 text-center dark:bg-gray-900">
                        <div className="mb-4 text-5xl">📦</div>
                        <h2 className="text-xl font-black text-gray-950 dark:text-white">Buyurtma yo'q</h2>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Hali hech narsa buyurtma qilmadingiz.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-5">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="overflow-hidden rounded-[28px] border border-white/80 bg-white/70 shadow-[0_10px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/70"
                            >
                                {/* Order header */}
                                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-800">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                                            Buyurtma
                                        </p>
                                        <p className="mt-0.5 text-sm font-black text-gray-950 dark:text-white">
                                            #{order.id.slice(-6).toUpperCase()}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <span className="inline-flex items-center rounded-full bg-yellow-50 px-3 py-1 text-xs font-bold text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400">
                                            {order.status === "pending" ? "Jarayonda" : order.status}
                                        </span>
                                        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                                            {order.createdAt?.toDate
                                                ? order.createdAt.toDate().toLocaleDateString("uz-UZ")
                                                : "—"}
                                        </p>
                                    </div>
                                </div>

                                {/* Items */}
                                <div className="px-6 py-4">
                                    <div className="flex flex-col gap-3">
                                        {order.items?.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-4">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="h-14 w-14 rounded-2xl object-contain bg-gray-50 p-1 dark:bg-gray-800"
                                                />
                                                <div className="flex-1">
                                                    <p className="text-sm font-bold text-gray-950 dark:text-white">{item.title}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.qty} dona</p>
                                                </div>
                                                <p className="text-sm font-black text-gray-950 dark:text-white">
                                                    ${item.price * item.qty}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4 dark:border-gray-800">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        <p>{order.name}</p>
                                        <p>{order.phone}</p>
                                        <p>{order.address}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-400 dark:text-gray-500">Jami</p>
                                        <p className="text-2xl font-black text-gray-950 dark:text-white">${order.totalAmount}</p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500">
                                            {order.paymentMethod === "cash" ? "Naqd" : "Karta"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}