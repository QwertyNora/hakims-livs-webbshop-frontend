import React from "react";
import { Space, Table, Tag } from "antd";
const { Column, ColumnGroup } = Table;
const data = [
  {
    key: "1",
    productTitle: "NOCCO",
    lastName: "Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    productTitle: "MONSTER",
    lastName: "Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    productTitle: "BÄRS",
    lastName: "Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
const StorageTable = () => (
  <Table dataSource={data}>
    <Column title="Product Title" dataIndex="productTitle" key="productTitle" />
    <Column title="Last Name" dataIndex="lastName" key="lastName" />

    <Column title="Age" dataIndex="age" key="age" />
    <Column title="Address" dataIndex="address" key="address" />
    <Column
      title="Tags"
      dataIndex="tags"
      key="tags"
      render={(tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      )}
    />
    <Column
      title="Action"
      key="action"
      render={(_, record) => (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      )}
    />
  </Table>
);
export default StorageTable;
