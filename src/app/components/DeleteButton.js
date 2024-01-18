import { useState } from 'react';

export default function DeleteButton({ label, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="fixed bg-black/80 inset-0 flex items-center h-full justify-center">
        <div className="bg-white p-4 rounded-lg">
          <div className="text-center font-bold">
            Are you sure want to delete ?
          </div>
          <div className="flex gap-2 mt-1">
            <button
              type="button"
              className="justifiy-center items-center "
              onClick={() => setShowConfirm(false)}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
              type="button"
              className="primary"
            >
              Yes,&nbsp; Delete!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button onClick={() => setShowConfirm(true)} type="button">
      {label}
    </button>
  );
}
