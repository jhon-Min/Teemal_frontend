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
  Typography,
  Select,
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
import debounce from "lodash/debounce";

const { Text, Paragraph } = Typography;
const { TextArea } = Input;

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
    dataIndex: ["artist", "name"],
    key: ["artist", "name"],
  },
  {
    title: "Release",
    dataIndex: ["release", "name"],
    key: ["release", "name"],
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

  const [artistResult, setArtistResult] = useState([]);
  const [releaseResult, setReleaseResult] = useState([]);

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

  function searchArtistHandler(value) {
    artistLists(accessToken, "artists", `search=${value}`)
      .then((res) => {
        console.log(res.data.artists);
        setArtistResult(res.data.artists);
      })
      .catch((err) => console.log(err));
  }

  function searchReleaseHandler(value) {
    artistLists(accessToken, "release", `search=${value}`)
      .then((res) => {
        console.log(res.data.data);
        setReleaseResult(res.data.data);
      })
      .catch((err) => console.log(err));
  }

  function submitHandler(value) {
    createArtist(accessToken, "track", {
      ...value,
      writerId: "124c1a1e-e293-4ff3-8ba2-8c0ed35119f5",
    })
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

              <Form.Item
                name="artistId"
                label="Artist"
                rules={[
                  {
                    required: true,
                    message: "Please input Artist!",
                  },
                ]}
              >
                <Select
                  showSearch
                  style={{
                    width: "100%",
                  }}
                  onSearch={debounce(searchArtistHandler, 1000)}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  options={artistResult.map((list) => {
                    return {
                      value: list.id,
                      label: list.name,
                    };
                  })}
                />
              </Form.Item>

              <Form.Item
                name="releaseId"
                label="Release"
                rules={[
                  {
                    required: true,
                    message: "Please input Release!",
                  },
                ]}
              >
                <Select
                  showSearch
                  style={{
                    width: "100%",
                  }}
                  onSearch={debounce(searchReleaseHandler, 1000)}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  options={releaseResult.map((list) => {
                    return {
                      value: list.id,
                      label: list.name,
                    };
                  })}
                />
              </Form.Item>

              <Form.Item
                name="chord"
                label="Chord"
                rules={[
                  { required: true, message: "Please input music chord" },
                ]}
              >
                <TextArea showCount placeholder="Enter music chord" />
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
