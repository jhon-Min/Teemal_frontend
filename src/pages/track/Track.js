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
    title: "Music Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Artist",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Release",
    dataIndex: "name",
    key: "name",
  },
];

export function Track() {
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

  const columns = [...data];

  useEffect(() => {
    dataLists(pageNumber);
  }, []);

  function submitHandler(value) {
    createArtist(accessToken, "track", value)
      .then((res) => {
        onClose();
        dataLists(pageNumber);
        message.success("Created");
      })
      .catch((err) => message.error("Error"));
  }

  function dataLists(page = 1) {
    setLoading(true);
    artistLists(accessToken, "track", `page=${page}`)
      .then((res) => {
        console.log(res.data);
        setLists(res.data.data);
        setTotal(res.data.count);
      })
      .catch((err) => message.error("Error Occur! Please contact the admin"))
      .finally(setLoading(false));
  }

  return (
    <Spin
      size="medium"
      spinning={loading}
      style={{
        height: "100vh",
      }}
    >
      <Row>
        <Col xl={24} lg={24}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3 style={{ color: "red", fontWeight: "normal" }}>
              Total Music : {total}
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
            title="Create Track"
          >
            <Form layout="vertical" onFinish={submitHandler}>
              <Form.Item
                name="name"
                label="Track Name"
                rules={[{ required: true, message: "Please input track" }]}
              >
                <Input placeholder="Track Name" />
              </Form.Item>

              <Form.Item name="feat" label="Feat'">
                <Input placeholder="Featuring" />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                <SaveOutlined />
                Save
              </Button>
            </Form>
          </Drawer>

          <Table
            dataSource={lists}
            columns={columns}
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
