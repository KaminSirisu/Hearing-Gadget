import { createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

const ModalContext = createContext(null);

export function useModal() {
    return useContext(ModalContext);
}

export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return createPortal(
        <ModalContext.Provider value={{ onClose }}>
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                onClick={(e) => e.target === e.currentTarget && onClose()}
            >
                <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                        <button
                            onClick={onClose}
                            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="px-6 py-5">{children}</div>
                </div>
            </div>
        </ModalContext.Provider>,
        document.getElementById('modal-root')
    );
}
