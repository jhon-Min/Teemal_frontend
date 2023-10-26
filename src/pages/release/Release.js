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
} from "antd";
import { SaveOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  artistLists,
  createArtist,
  deleteArtist,
  updateArtist,
} from "../../services/api/musicApi";

const data = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Release Name",
    dataIndex: "name",
    key: "name",
  },
];

export function Release() {
  const { accessToken } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [lists, setLists] = useState([]);
  const [total, setTotal] = useState(0);
  const [edit, setEdit] = useState();

  function showDrawer() {
    setOpen(true);
  }

  function editDrawer(value) {
    setEditOpen(true);
    setEdit(value);
  }

  function onClose() {
    setOpen(false);
    setEditOpen(false);
  }

  const columns = [
    ...data,
    {
      title: "Action",
      dataIndex: "action",
      render: (value, data) => {
        return (
          <div>
            <Button
              size="small"
              className="editBtn mr-1"
              onClick={() => editDrawer(data)}
            >
              <EditOutlined />
            </Button>
            <Popconfirm
              title="Delete a user?"
              description="Are you sure to delete this user?"
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

  useEffect(() => {
    dataLists(pageNumber);
  }, []);

  function submitHandler(value) {
    createArtist(accessToken, "release", value)
      .then((res) => {
        onClose();
        dataLists(pageNumber);
        message.success("Created");
      })
      .catch((err) => message.error("Error"));
  }

  function dataLists(page = 1) {
    console.log(page);
    setLoading(true);
    artistLists(accessToken, "release", `page=${page}`)
      .then((res) => {
        setLists(res.data.data);
        setTotal(res.data.count);
      })
      .catch((err) => message.error("Error Occur! Please contact the admin"))
      .finally(setLoading(false));
  }

  function updateHandler(value) {
    updateArtist(accessToken, `release/${value.id}`, { name: value.name })
      .then((res) => {
        onClose();
        dataLists(pageNumber);
        message.success("Updated");
      })
      .catch((err) => message.error("Error Occur! Please contact the admin"));
  }

  function deleteHandler(value) {
    deleteArtist(accessToken, `release/${value.id}`)
      .then((res) => {
        dataLists(pageNumber);
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3 style={{ color: "red", fontWeight: "normal" }}>
              Total Release : {total}
            </h3>

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
                label="Release Name"
                rules={[
                  { required: true, message: "Please input release name" },
                ]}
              >
                <Input placeholder="Release Name" />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                <SaveOutlined />
                Save
              </Button>
            </Form>
          </Drawer>

          {/* Edit Form */}
          <Drawer
            open={editOpen}
            destroyOnClose={true}
            onClose={onClose}
            title="Edit Release"
          >
            <Form
              initialValues={edit}
              layout="vertical"
              onFinish={updateHandler}
            >
              <Form.Item
                name="name"
                label="Release Name"
                rules={[
                  { required: true, message: "Please input Release name" },
                ]}
              >
                <Input placeholder="Release Name" />
              </Form.Item>

              <Form.Item name="id" style={{ display: "none" }}>
                <Input placeholder="Release Id" />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                <SaveOutlined />
                Save
              </Button>
            </Form>
          </Drawer>

          <Table
            columns={columns}
            dataSource={lists}
            pagination={{
              responsive: true,
              current: pageNumber,
              total: total,
              onChange: (pageNumber) => {
                setPageNumber(pageNumber);
                dataLists(pageNumber);
              },
            }}
          />
        </Col>
      </Row>
    </Spin>
  );
}
