import { useToastStore } from "../store/toastStore";

export default function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed right-5 top-[90px] z-[110] flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex min-w-[280px] max-w-sm animate-fade-in items-center gap-3 rounded-2xl bg-gray-950/95 px-5 py-4 text-white shadow-[0_20px_40px_rgba(0,0,0,0.2)] backdrop-blur-md"
        >
          {toast.type === "success" ? (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500/20 text-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500/20 text-red-400">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          )}
          
          <p className="flex-1 text-sm font-bold tracking-wide text-white">{toast.message}</p>
          
          <button 
            onClick={() => removeToast(toast.id)}
            className="text-gray-400 transition hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
