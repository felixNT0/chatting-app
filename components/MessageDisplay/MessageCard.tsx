import {
  DeleteFilled,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Typography,
} from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import styles from "./MessageCard.module.css";
import { deleteMessages, editMessage, fetchMessagesById } from "./query";

dayjs.extend(relativeTime);

const { Meta } = Card;

const { confirm } = Modal;

const { Text } = Typography;

interface Props {
  result: any | undefined;
  refetch: any;
  isLoading: boolean;
  currentUser: any;
  searchMessage: any;
}

function MessageCard({
  result,
  refetch,
  isLoading,
  currentUser,
  searchMessage,
}: Props) {
  const user = currentUser.find((user: any) => user.email);
  const deleteMessageMutation = useMutation(deleteMessages, {
    onSuccess: () => {
      refetch();
    },
  });

  const deleteMessage = (id: any) => {
    deleteMessageMutation.mutate(id);
  };

  const showDeleteConfirm = (id: any) => {
    confirm({
      title: "Are you sure you want to delete this Message?",
      icon: <ExclamationCircleOutlined />,
      okType: "danger",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        deleteMessage(id);
      },
      onCancel() {},
    });
  };

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          padding: "25px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            {searchMessage && !searchMessage.length && (
              <h3>Sorry, Can't Find Message!</h3>
            )}
            {(searchMessage ? searchMessage : result).map((mss: any) => (
              <Card
                key={mss.id}
                style={{ width: 300, marginTop: 16 }}
                loading={isLoading}
              >
                <Meta
                  avatar={
                    <Avatar src="https://lh3.googleusercontent.com/a-/AOh14Gi9NB4fM57ogfxOZ1v-k4Kxjj8xcZIzgK1S3aBuXg=s60-c-rg-br100" />
                  }
                  title={mss.message}
                  description={
                    <Text type="secondary">
                      {mss.user.username} posted{" "}
                      {dayjs(mss.createdAt).fromNow()}
                    </Text>
                  }
                />
                {user.id === mss.user.id && (
                  <>
                    <Divider className="mt-3 mb-1" />
                    <div className={styles.root}>
                      <Button
                        type="text"
                        onClick={() => showDeleteConfirm(mss.id)}
                        icon={<DeleteFilled />}
                      />
                      <EditModal id={mss.id} refetch={refetch} />
                    </div>
                  </>
                )}
                {mss.updatedAt && (
                  <>
                    <Divider className="mt-3 mb-1" />
                    <Text type="secondary" className="text-center mt-3">
                      Edited {dayjs(mss.updatedAt).fromNow()}
                    </Text>
                  </>
                )}
              </Card>
            ))}
          </Col>
        </Row>
      </div>
    </div>
  );
}

type UserProps = {
  id: string;
  refetch: any;
};

export const EditModal = ({ refetch, id }: UserProps) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data } = useQuery(["messageById", id], () => fetchMessagesById(id));

  const result = data && data;

  const { mutate } = useMutation(editMessage, {
    onSuccess: (res) => {
      refetch();
    },
  });

  const showModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const onFinish = () => {
    const value = form.getFieldsValue();

    mutate({ data: { ...value, updatedAt: new Date() }, id: id });

    form.resetFields();

    showModal();
  };
  return (
    <>
      <>
        <Button type="text" onClick={showModal} icon={<EditOutlined />} />
        {result && (
          <Form layout="vertical" form={form}>
            <Modal
              centered
              title="Edit Message"
              visible={isModalVisible}
              onOk={onFinish}
              okText="Send"
              onCancel={showModal}
            >
              <Form.Item
                name="message"
                style={{ textAlign: "center" }}
                initialValue={result.message}
              >
                <Input
                  size="large"
                  style={{ width: "70%" }}
                  placeholder="Edit Your Message Here..."
                />
              </Form.Item>
            </Modal>
          </Form>
        )}
      </>
    </>
  );
};

export default MessageCard;
