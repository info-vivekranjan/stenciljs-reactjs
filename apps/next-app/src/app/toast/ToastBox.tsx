"use client";

import { useEffect } from "react";

enum TOAST_TYPE {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

interface TOAST_DATA_TYPE {
  id: number;
  message: string;
  type: TOAST_TYPE;
}

export default function ToastBox({
  toast,
  handleDeleteToast,
}: {
  toast: TOAST_DATA_TYPE;
  handleDeleteToast: (id: number) => void;
}) {
  const getBackgroundColor = () => {
    let color = "black";
    if (toast.type === TOAST_TYPE.SUCCESS) {
      color = "green";
    } else if (toast.type === TOAST_TYPE.ERROR) {
      color = "red";
    } else if (toast.type === TOAST_TYPE.WARNING) {
      color = "orange";
    } else if (toast.type === TOAST_TYPE.INFO) {
      color = "blue";
    }

    return color;
  };

  useEffect(() => {
    setTimeout(() => {
      handleDeleteToast(toast.id);
    }, 3000);
  }, [toast.id]);

  return (
    <div
      style={{
        backgroundColor: getBackgroundColor(),
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "15px",
        padding: "10px",
        borderRadius: "8px",
        width: "300px",
        color: "white",
      }}
    >
      <span>{toast.message}</span>
      <button
        style={{
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          backgroundColor: "white",
          border: "1px solid white",
        }}
        onClick={() => handleDeleteToast(toast.id)}
      >
        X
      </button>
    </div>
  );
}
