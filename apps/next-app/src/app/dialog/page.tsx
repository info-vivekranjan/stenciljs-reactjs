"use client";

import { useState } from "react";
import { DialogBox } from "react-library";

export default function Dialog() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <h1>Dialog</h1>
      <button onClick={() => setOpen(true)}>Open Dialog</button>

      {open && (
        <DialogBox
          dialogTitle="Sample Demo Title"
          description="This is a sample demo description This is a sample demo description This is a sample demo description This is a sample demo description"
          handleClose={handleClose}
        />
      )}
    </>
  );
}
