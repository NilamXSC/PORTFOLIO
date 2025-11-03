// src/components/Loader.jsx
import React from "react";

export default function Loader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full border-4 border-gray-200 border-t-[6px] border-t-[var(--accent)]">
                    <img src="/src/assets/logo-symbol.png" alt="Arc of Nilam logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '9999px' }} />
                </div>
                <div className="text-sm text-[var(--muted)]">Loading Arc of Nilam…</div>
            </div>

            <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
}
