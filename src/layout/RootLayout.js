import { Link, Outlet, useLocation } from "react-router-dom";
import {
  AudioOutlined,
  PieChartOutlined,
  UserOutlined,
  DownOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, theme, Breadcrumb, Dropdown, Space } from "antd";
import { Sidebar } from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { logOff } from "../features/userSlice";

const { Header, Content, Footer } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const routes = [
  getItem(<Link to="/">Home</Link>, "", <PieChartOutlined />),
  getItem("User Management", "sub1", <UserOutlined />, [
    getItem(<Link to="users">User Lists</Link>, "users"),
  ]),
  getItem(<Link to="artists">Artists</Link>, "artists", <AudioOutlined />),
  getItem(<Link to="release">Release</Link>, "release", <AudioOutlined />),
];

export function RootLayout({ children, breadCrumb }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const currentPath = location.pathname.substring(1);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  function logout(e) {
    dispatch(logOff());
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
      <Sidebar items={routes} path={currentPath} />

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
                {user.name}
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
