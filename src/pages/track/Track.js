import { Col, Row, Spin } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";

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

  return (
    <Spin
      size="medium"
      spinning={loading}
      style={{
        height: "100vh",
      }}
    >
      <Row>
        <Col xl={24} lg={24}></Col>
      </Row>
    </Spin>
  );
}
