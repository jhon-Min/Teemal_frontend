import { Layout, Menu } from "antd";

import { useState } from "react";
const { Sider } = Layout;

export function Sidebar({ items, path }) {
  const [collapsed, setCollapsed] = useState(false);
  console.log(path);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      width={250}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        style={{
          height: 32,
          margin: 16,
          background: "rgba(255, 255, 255, 0.2)",
        }}
      />
      <Menu
        theme="dark"
        defaultSelectedKeys={[path]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
}
