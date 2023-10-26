import {
  Col,
  Form,
  Row,
  Spin,
  Input,
  Button,
  message,
  Drawer,
  Table,
  Popconfirm,
  Pagination,
} from "antd";
import { SaveOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { CreateForm } from "../../components/CreateForm";
import {
  artistLists,
  createArtist,
  deleteArtist,
  updateArtist,
} from "../../services/api/musicApi";
import { useSelector } from "react-redux";

export function Artist() {
  const { accessToken } = useSelector((state) => state.user);
  const [lists, setLists] = useState([]);
  const [totalArtist, setTotalArtist] = useState(0);
  const [edit, setEdit] = useState();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  function showDrawer() {
    setOpen(true);
  }

  function onClose() {
    setOpen(false);
    setEditOpen(false);
  }

  function editDrawer(value) {
    setEditOpen(true);
    setEdit(value);
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Artist Name",
      dataIndex: "name",
      key: "name",
    },
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
              <Button size="small" className="delBtn">
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
    createArtist(accessToken, "artists", value)
      .then((res) => {
        onClose();
        dataLists();
        message.success("Created Success");
      })
      .catch((err) => message.error(err.response.data.message));
  }

  async function dataLists(pageNumber = 1) {
    setLoading(true);
    artistLists(accessToken, "artists", `page=${pageNumber}`)
      .then((res) => {
        setLists(res.data.artists);
        setTotalArtist(res.data.count);
      })
      .catch((err) => console.log(err))
      .finally(setLoading(false));
  }

  function updateHandler(value) {
    updateArtist(accessToken, "artists/" + value.id, { name: value.name })
      .then((res) => {
        dataLists(pageNumber);
        onClose();
        message.success("Updated Success");
      })
      .catch((err) => message.error(err.response.data.message));
  }

  function deleteHandler(value) {
    console.log(value.id);
    deleteArtist(accessToken, "artists/" + value.id)
      .then((res) => {
        dataLists();
        message.success("Success");
      })
      .catch((err) => console.log(err));
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ color: "red", fontWeight: "normal" }}>
                Total Artist : {totalArtist}
              </h3>
            </div>
            <Button
              type="primary"
              onClick={showDrawer}
              style={{ marginBottom: "20px" }}
            >
              Create
            </Button>

            {/* Create Form */}
            <Drawer
              open={open}
              destroyOnClose={true}
              onClose={onClose}
              title="Create Artist"
            >
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
            </Drawer>

            {/* Edit Form */}
            <Drawer
              open={editOpen}
              destroyOnClose={true}
              onClose={onClose}
              title="Edit Artist"
            >
              <Form
                initialValues={edit}
                layout="vertical"
                onFinish={updateHandler}
              >
                <Form.Item
                  name="name"
                  label="Artist Name"
                  rules={[
                    { required: true, message: "Please input artist name" },
                  ]}
                >
                  <Input placeholder="Artist Name" />
                </Form.Item>

                <Form.Item name="id" style={{ display: "none" }}>
                  <Input placeholder="Artist Id" />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                  <SaveOutlined />
                  Save
                </Button>
              </Form>
            </Drawer>
          </div>

          <Table
            pagination={{
              current: pageNumber,
              total: totalArtist,
              onChange: (pageNumber) => {
                setPageNumber(pageNumber);
                dataLists(pageNumber);
              },
            }}
            columns={columns}
            dataSource={lists}
          />
        </Col>
      </Row>
    </Spin>
  );
}
