import { Row, Spin } from "antd";
import { useState } from "react";

export function User() {
  const [loading, setLoading] = useState(true);

  return (
    <Spin size="middle" spinning={loading}>
      <Row></Row>
    </Spin>
  );
}
