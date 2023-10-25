import {
  Row,
  Card,
  Divider,
  Col,
  Button,
  Layout,
  Form,
  Input,
  message,
} from "antd";
import { login } from "../services/api/loginApi";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";

export function Login() {
  const dispatch = useDispatch();
  function loginHandler(value) {
    login("login", value)
      .then((res) => {
        dispatch(setUser(res.data));
      })
      .catch((err) => console.log(err));
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error(errorInfo);
  };
  return (
    <>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card>
            <h1 style={{ marginBottom: "25px", textAlign: "center" }}>
              Teemal
            </h1>

            <div>
              <Form
                layout="vertical"
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={loginHandler}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Username"
                  name="loginName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%", marginTop: "20px" }}
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}
