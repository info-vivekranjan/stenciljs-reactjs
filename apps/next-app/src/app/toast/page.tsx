"use client";

import { useCallback, useState } from "react";
import { ToastBox } from "react-library";

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

const MAX_VISIBLE = 3;

export default function Toast() {
  const [toastData, setToastData] = useState<{
    visible: TOAST_DATA_TYPE[];
    queue: TOAST_DATA_TYPE[];
  }>({
    visible: [],
    queue: [],
  });

  const handleAddToast = (message: string, type: TOAST_TYPE) => {
    const payload = {
      id: Date.now(),
      message,
      type,
    };

    setToastData((prev) => {
      if (prev.visible.length < MAX_VISIBLE) {
        return {
          ...prev,
          visible: [...prev.visible, payload],
        };
      }

      return {
        ...prev,
        queue: [...prev.queue, payload],
      };
    });
  };

  const handleDeleteToast = useCallback((id: number) => {
    setToastData((prev) => {
      let visible = prev.visible.filter((item) => item.id !== id);

      if (visible.length < MAX_VISIBLE && prev.queue.length > 0) {
        const [lastVisible, ...restQueue] = prev.queue;

        return {
          visible: [...visible, lastVisible],
          queue: restQueue,
        };
      }

      return {
        ...prev,
        visible,
      };
    });
  }, []);

  console.log(toastData);

  return (
    <>
      <h1>Toast</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <button
          onClick={() =>
            handleAddToast(
              "This is a sample SUCCESS message.",
              TOAST_TYPE.SUCCESS,
            )
          }
        >
          SUCCESS
        </button>
        <button
          onClick={() =>
            handleAddToast("This is a sample ERROR message.", TOAST_TYPE.ERROR)
          }
        >
          ERROR
        </button>
        <button
          onClick={() =>
            handleAddToast(
              "This is a sample WARNING message.",
              TOAST_TYPE.WARNING,
            )
          }
        >
          WARNING
        </button>
        <button
          onClick={() =>
            handleAddToast("This is a sample INFO message.", TOAST_TYPE.INFO)
          }
        >
          INFO
        </button>
      </div>

      <section
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {toastData?.visible?.map((toast) => {
          return (
            <ToastBox
              key={toast.id}
              toast={toast}
              handleDeleteToast={handleDeleteToast}
            />
          );
        })}
      </section>
    </>
  );
}
