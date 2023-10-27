import { Image, Layout, Menu } from "antd";
import logoImage from "../tee-mal-logo.png";

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
      <div style={{ textAlign: "center" }}>
        <Image width={60} src={logoImage} />
      </div>

      <Menu
        theme="dark"
        defaultSelectedKeys={[path]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
}
