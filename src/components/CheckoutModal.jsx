import { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../Data/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useCartStore } from "../store/cartStore";

export default function CheckoutModal({ isOpen, onClose, totalAmount, totalItems, onSuccess, user }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "cash",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const cart = useCartStore.getState().cart;

      await addDoc(collection(db, "orders"), {
        userId: user?.uid || "guest",
        userEmail: user?.email || "guest",
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        paymentMethod: formData.paymentMethod,
        items: cart.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          qty: item.qty,
          image: item.image,
        })),
        totalAmount,
        totalItems,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      setIsProcessing(false);
      setStep(3);
      onSuccess();
    } catch (error) {
      console.error("Buyurtma saqlashda xatolik:", error);
      setIsProcessing(false);
    }
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formatted = '';
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += ' ';
      formatted += value[i];
    }
    setFormData({ ...formData, cardNumber: formatted.substring(0, 19) });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-950/40 backdrop-blur-md transition-opacity"
        onClick={step === 3 ? undefined : onClose}
      ></div>

      <div className="relative w-full max-w-lg overflow-hidden rounded-[32px] bg-white shadow-2xl transition-all">

        {step !== 3 && (
          <div className="flex items-center justify-between border-b border-gray-100 px-8 py-5">
            <div>
              <h2 className="text-xl font-black text-gray-950">Checkout</h2>
              <p className="text-sm font-semibold text-gray-500">{totalItems} items • ${totalAmount}</p>
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

        <div className="p-8">
          {step === 1 && (
            <form onSubmit={handleNext} className="animate-fade-in">
              <h3 className="mb-5 text-lg font-bold text-gray-900">Delivery Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full rounded-2xl border border-gray-200 bg-[#f5f5f7] px-4 py-3.5 text-sm text-gray-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+998 90 123 45 67"
                    className="w-full rounded-2xl border border-gray-200 bg-[#f5f5f7] px-4 py-3.5 text-sm text-gray-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">Delivery Address</label>
                  <textarea
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="City, Street, House number..."
                    rows="2"
                    className="w-full rounded-2xl border border-gray-200 bg-[#f5f5f7] px-4 py-3.5 text-sm text-gray-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="mt-8 w-full rounded-full bg-gray-950 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-600 active:scale-[0.98]"
              >
                Continue to Payment
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="animate-fade-in">
              <h3 className="mb-5 text-lg font-bold text-gray-900">Payment Method</h3>

              <div className="grid grid-cols-2 gap-4">
                <label className={`cursor-pointer rounded-2xl border-2 p-4 transition ${formData.paymentMethod === 'cash' ? 'border-blue-500 bg-blue-50' : 'border-gray-100 bg-[#f5f5f7] hover:border-gray-200'}`}>
                  <input type="radio" name="paymentMethod" value="cash" checked={formData.paymentMethod === 'cash'} onChange={handleChange} className="hidden" />
                  <div className="flex flex-col items-center gap-2 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${formData.paymentMethod === 'cash' ? 'text-blue-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className={`text-sm font-bold ${formData.paymentMethod === 'cash' ? 'text-blue-900' : 'text-gray-600'}`}>Cash on Delivery</span>
                  </div>
                </label>

                <label className={`cursor-pointer rounded-2xl border-2 p-4 transition ${formData.paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-100 bg-[#f5f5f7] hover:border-gray-200'}`}>
                  <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleChange} className="hidden" />
                  <div className="flex flex-col items-center gap-2 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${formData.paymentMethod === 'card' ? 'text-blue-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span className={`text-sm font-bold ${formData.paymentMethod === 'card' ? 'text-blue-900' : 'text-gray-600'}`}>Credit Card</span>
                  </div>
                </label>
              </div>

              <div className={`mt-6 space-y-4 overflow-hidden transition-all duration-300 ${formData.paymentMethod === 'card' ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-500">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      required={formData.paymentMethod === 'card'}
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="0000 0000 0000 0000"
                      className="w-full rounded-2xl border border-gray-200 bg-[#f5f5f7] py-3.5 pl-12 pr-4 text-sm font-bold text-gray-950 outline-none transition focus:border-blue-500 focus:bg-white"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-500">Expiry Date</label>
                    <input
                      type="text"
                      name="expiry"
                      required={formData.paymentMethod === 'card'}
                      value={formData.expiry}
                      onChange={(e) => {
                        let val = e.target.value.replace(/[^0-9]/g, '');
                        if (val.length > 2) val = val.substring(0, 2) + '/' + val.substring(2, 4);
                        setFormData({ ...formData, expiry: val.substring(0, 5) });
                      }}
                      placeholder="MM/YY"
                      className="w-full rounded-2xl border border-gray-200 bg-[#f5f5f7] px-4 py-3.5 text-sm font-bold text-gray-950 outline-none transition focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-500">CVV</label>
                    <input
                      type="password"
                      name="cvv"
                      required={formData.paymentMethod === 'card'}
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/[^0-9]/g, '').substring(0, 3) })}
                      placeholder="•••"
                      className="w-full rounded-2xl border border-gray-200 bg-[#f5f5f7] px-4 py-3.5 text-sm font-bold text-gray-950 outline-none transition focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex w-1/3 items-center justify-center rounded-full bg-gray-100 py-4 text-sm font-bold text-gray-700 transition hover:bg-gray-200"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="relative flex w-2/3 items-center justify-center overflow-hidden rounded-full bg-gray-950 py-4 text-sm font-bold text-white transition hover:bg-blue-600 disabled:bg-gray-400"
                >
                  {isProcessing ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  ) : (
                    `Pay $${totalAmount}`
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center py-6 text-center animate-fade-in">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-black text-gray-950">Thank You!</h2>
              <p className="mt-3 text-sm leading-6 text-gray-500">
                Your order has been placed successfully.<br />
                We will contact you shortly at <span className="font-bold text-gray-900">{formData.phone}</span>.
              </p>

              <div className="mt-8 w-full rounded-2xl bg-[#f5f5f7] p-5 text-left text-sm font-semibold text-gray-600">
                <div className="flex justify-between border-b border-gray-200 pb-3">
                  <span>Order Number</span>
                  <span className="text-gray-950">#APL-{Math.floor(10000 + Math.random() * 90000)}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span>Amount Paid</span>
                  <span className="font-black text-gray-950">${totalAmount}</span>
                </div>
              </div>

              <Link
                to="/orders"
                onClick={onClose}
                className="mt-4 w-full rounded-full border border-gray-200 py-4 text-sm font-bold text-gray-700 transition hover:bg-gray-100"
              >
                Buyurtmalarni ko'rish
              </Link>

              <Link
                to="/"
                onClick={onClose}
                className="mt-3 w-full rounded-full bg-gray-950 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-600"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}