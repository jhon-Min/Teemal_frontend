import {
  Col,
  Row,
  Spin,
  Button,
  message,
  Table,
  Drawer,
  Form,
  Input,
  Popconfirm,
  Space,
  Image,
  Upload,
} from "antd";
import {
  SaveOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  bannerLists,
  createArtist,
  createBanner,
  deleteArtist,
} from "../../services/api/musicApi";

const data = [
  {
    title: "Banner Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Sorting",
    dataIndex: "sorting",
    key: "sorting",
  },
  {
    title: "Duration (second)",
    dataIndex: "timer",
    key: "timer",
  },
];

export function Banner() {
  const { accessToken } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [lists, setLists] = useState([]);

  function showDrawer() {
    setOpen(true);
  }

  function onClose() {
    setOpen(false);
  }

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (value, data) => {
        return (
          <div>
            <Image
              width={100}
              src={data.image}
              placeholder={
                <Image
                  preview={false}
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_100,w_200"
                  width={100}
                />
              }
            />
          </div>
        );
      },
    },
    ...data,
    {
      title: "Action",
      dataIndex: "action",
      render: (value, data) => {
        return (
          <div>
            <Popconfirm
              title="Delete a user?"
              description="Are you sure to delete this banner?"
              onConfirm={() => deleteHandler(data)}
              okText="Yes"
              cancelText="No"
            >
              <Button className="delBtn" size="small">
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  useEffect(() => {
    dataLists();
  }, []);

  function submitHandler(values) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("sorting", values.sorting);
    formData.append("timer", values.timer);
    formData.append("image", values.image[0].originFileObj);

    createBanner(accessToken, "banner", formData)
      .then((res) => {
        onClose();
        dataLists();
        message.success("Created");
      })
      .catch((err) => {
        message.error("Error");
        console.log(err);
      });
  }

  function dataLists(page = 1) {
    setLoading(true);
    bannerLists(accessToken, "banner")
      .then((res) => {
        setLists(res.data);
      })
      .catch((err) => message.error("Error Occur! Please contact the admin"))
      .finally(setLoading(false));
  }

  function deleteHandler(value) {
    deleteArtist(accessToken, `banner/${value.id}`)
      .then((res) => {
        dataLists();
        message.success("Deleted!");
      })
      .catch((err) => message.error("Error Occur! Please contact the admin"));
  }

  return (
    <Spin
      size="small"
      spinning={loading}
      style={{
        height: "100vh",
      }}
    >
      <Row>
        <Col lg={24}>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button
              type="primary"
              onClick={showDrawer}
              style={{ marginBottom: "20px" }}
            >
              Create
            </Button>
          </div>

          {/* Create Form */}
          <Drawer
            open={open}
            destroyOnClose={true}
            onClose={onClose}
            title="Create Release"
          >
            <Form layout="vertical" onFinish={submitHandler}>
              <Form.Item
                name="name"
                label="Banner Name"
                rules={[
                  { required: true, message: "Please input banner name" },
                ]}
              >
                <Input placeholder="Banner Name" />
              </Form.Item>

              <Form.Item
                name="sorting"
                label="Sorting"
                rules={[{ required: true, message: "Please input sorting" }]}
              >
                <Input placeholder="Sorting" type="number" />
              </Form.Item>

              <Form.Item
                name="timer"
                label="Duration"
                rules={[{ required: true, message: "Please input duration" }]}
              >
                <Input placeholder="Duration" type="number" />
              </Form.Item>

              <Form.Item
                name="image"
                label="Banner Image"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: "Please upload an image" }]}
              >
                <Upload
                  name="image"
                  accept=".png,.jpeg,.jpg"
                  listType="picture"
                  beforeUpload={() => false} // Return false to prevent default upload action
                >
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                // style={{ marginTop: "40px" }}
              >
                <SaveOutlined />
                Save
              </Button>
            </Form>
          </Drawer>

          <Table columns={columns} dataSource={lists} />
        </Col>
      </Row>
    </Spin>
  );
}
