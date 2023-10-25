import { useState } from "react";
import { Button, Drawer } from "antd";

export function CreateForm({ children, title, isCreate = false }) {
  const [open, setOpen] = useState(false);

  function showDrawer() {
    setOpen(true);
  }

  function onClose() {
    setOpen(false);
  }

  return (
    <div style={{ display: "flex", justifyContent: "end" }}>
      {isCreate == true ? (
        <Button
          type="primary"
          onClick={showDrawer}
          style={{ marginBottom: "20px" }}
        >
          Create
        </Button>
      ) : (
        ""
      )}

      <Drawer open={open} destroyOnClose={true} onClose={onClose} title={title}>
        {children}
      </Drawer>
    </div>
  );
}
