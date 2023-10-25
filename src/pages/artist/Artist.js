import { Col, Form, Row, Spin, Input, Button, message } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useState } from "react";
import { CreateForm } from "../../components/CreateForm";
import { createArtist } from "../../services/api/musicApi";
import { useSelector } from "react-redux";

export function Artist() {
  const { accessToken } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  function submitHandler(value) {
    // console.log(value);
    createArtist(accessToken, "artists", value)
      .then((res) => {
        console.log(res);
        message.success("Created Success");
      })
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
          <CreateForm title="Create Artist" isCreate={true}>
            <Form layout="vertical" onFinish={submitHandler}>
              <Form.Item
                name="name"
                label="Artist Name"
                rules={[
                  { required: true, message: "Please input artist name" },
                ]}
              >
                <Input placeholder="Artist Name" />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                <SaveOutlined />
                Save
              </Button>
            </Form>
          </CreateForm>
        </Col>
      </Row>
    </Spin>
  );
}
