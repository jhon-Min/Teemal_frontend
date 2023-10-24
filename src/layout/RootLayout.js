import { Link, Outlet } from "react-router-dom";
import {
  PieChartOutlined,
  UserOutlined,
  DownOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, theme, Breadcrumb, Dropdown, Space } from "antd";
import { Sidebar } from "../components/Sidebar";

const { Header, Content, Footer } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const routes = [getItem(<Link to="/">Home</Link>, "1", <PieChartOutlined />)];

export function RootLayout({ children, breadCrumb }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  function logout(e) {
    console.log("logout");
    // dispatch(logOff());
  }

  const items = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <a onClick={logout}>
          <LogoutOutlined style={{ marginRight: "13px", color: "#dc3545" }} />
          <span>Logout</span>
        </a>
      ),
      key: "2",
    },
  ];

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sidebar items={routes} />

      <Layout className="site-layout">
        <Header
          style={{
            padding: "0 50px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                My name is nyisaymin
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Header>

        <Content className="container">
          <div style={{ margin: "50px 0px" }}>
            <Outlet />
          </div>
        </Content>

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Develop by Techbridge
        </Footer>
      </Layout>
    </Layout>
  );
}
