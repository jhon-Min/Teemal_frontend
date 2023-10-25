import { Col, Row, Spin, Form, Input, Button, message } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useState } from "react";
import { CreateForm } from "../../components/CreateForm";
import { createCmsUser } from "../../services/api/userApi";
import { useSelector } from "react-redux";

export function User() {
  const [loading, setLoading] = useState(false);
  const [lists, setLists] = useState([]);
  const { accessToken } = useSelector((state) => state.user);

  function submitHandler(value) {
    console.log(value);
    createCmsUser(accessToken, "cmsUser", value)
      .then((res) => console.log(res))
      .catch((err) => message.error(err.response.data.message));
  }

  return (
    <Spin
      size="middle"
      spinning={loading}
      style={{
        height: "100vh",
      }}
    >
      <Row>
        <Col lg={24} xl={24}>
          <CreateForm title="Create User" isCreate={true}>
            <Form layout="vertical" onFinish={submitHandler}>
              <Form.Item
                name="loginName"
                label="Login Name"
                rules={[
                  { required: true, message: "Please input login name" },
                  {
                    min: 2,
                    max: 20,
                    message: "Login name must be between 10 and 30 characters",
                  },
                ]}
              >
                <Input placeholder="Login Name" />
              </Form.Item>

              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please input username" }]}
              >
                <Input placeholder="Eg.Nyi Sy Min" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please input password" },
                  {
                    min: 5,
                    max: 20,
                    message: "Password must be between 10 and 30 characters",
                  },
                ]}
              >
                <Input placeholder="password" />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                <SaveOutlined />
                Save
              </Button>
            </Form>
          </CreateForm>

          <CreateForm title="Edit User">
            <Form layout="vertical"></Form>
          </CreateForm>
        </Col>
      </Row>
    </Spin>
  );
}
