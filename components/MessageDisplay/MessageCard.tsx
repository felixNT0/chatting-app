import {
  DeleteFilled,
  DislikeOutlined,
  EditFilled,
  ExclamationCircleOutlined,
  LikeFilled,
} from "@ant-design/icons";
import { Avatar, Card, Col, Form, Input, Modal, Row, Typography } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { UserType } from "../../types/users";
import styles from "./MessageCard.module.css";
import {
  deleteLikes,
  deleteMessages,
  editMessage,
  fetchLikes,
  fetchMessagesById,
  likeMessage,
} from "./query";

const { Meta } = Card;

const { confirm } = Modal;

const { Text, Title } = Typography;

interface Props {
  result: any | undefined;
  refetch: any;
  isLoading: boolean;
  currentUser: UserType[] | null;
  searchMessage: any;
  values: string;
}

type MessageAuthorType = {
  user: any;
  curentUser: any;
};

export function MessageAuthor(props: MessageAuthorType) {
  dayjs.extend(relativeTime);

  const linkToProfile = `${props.user.username}`;

  const text = `Posted by`;

  const timePosted = `${dayjs(props.user.createdAt).fromNow()}`;

  return (
    <div className={styles.user}>
      <Text style={{ fontSize: "12px" }} type="secondary">
        {text}
      </Text>
      {props.curentUser.id === props.user.id ? (
        <Link href={`/profile/${props.user.id}`}>
          <a style={{ fontSize: "12px", color: "#1890ff" }}>You</a>
        </Link>
      ) : (
        <Link href={`/profile/${props.user.id}`}>
          <a style={{ fontSize: "12px", color: "#1890ff" }}>{linkToProfile}</a>
        </Link>
      )}

      <Text style={{ fontSize: "12px" }} type="secondary">
        {timePosted}
      </Text>
    </div>
  );
}

function MessageCard({
  result,
  refetch,
  isLoading,
  currentUser,
  searchMessage,
  values,
}: Props) {
  const user = currentUser?.find((user: any) => user.email);
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
      <div>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            {/* {!searchMessage && !result && <p>{`Search ${values} Not Found`}</p>} */}
            {(searchMessage ? searchMessage : result).map((mss: any) => (
              <div key={mss.id} className="mb-5">
                {user?.id === mss.user.id ? (
                  <div className="d-flex justify-end pr-5">
                    <Card
                      key={mss.id}
                      // style={{
                      //   boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
                      //   width: "50%",
                      //   marginTop: 16,
                      //   border: "1px solid #1890ff",
                      // }}
                      actions={[
                        <LikeButton
                          key="like"
                          currentUserId={user?.id}
                          id={mss.id}
                        />,
                        <DeleteFilled
                          style={{ color: "#1890ff" }}
                          key="delect"
                          onClick={() => showDeleteConfirm(mss.id)}
                        />,
                        <EditModal key="edit" id={mss.id} refetch={refetch} />,
                      ]}
                    >
                      <Meta
                        avatar={
                          <Avatar src="https://joeschmoe.io/api/v1/random" />
                        }
                        description={<Title level={5}>{mss.message}</Title>}
                        title={
                          <MessageAuthor user={mss.user} curentUser={user} />
                        }
                      />
                    </Card>
                  </div>
                ) : (
                  <div className="d-flex justify-start pl-5">
                    <Card
                      key={mss.id}
                      // style={{
                      //   boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
                      //   width: "50%",
                      //   marginTop: 16,
                      //   border: "1px solid #1890ff",
                      // }}
                      actions={[
                        <LikeButton
                          key="like"
                          currentUserId={user?.id}
                          id={mss.id}
                        />,
                      ]}
                    >
                      <Meta
                        avatar={
                          <Avatar src="https://joeschmoe.io/api/v1/random" />
                        }
                        description={<Title level={5}>{mss.message}</Title>}
                        title={
                          <MessageAuthor user={mss.user} curentUser={user} />
                        }
                      />
                    </Card>
                  </div>
                )}
              </div>
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
        <EditFilled style={{ color: "#1890ff" }} onClick={showModal} />

        {data && (
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
                initialValue={data.message}
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

type LikeProps = {
  currentUserId?: string;
  id: string;
};

export function LikeButton({ currentUserId, id }: LikeProps) {
  const [isLike, setIsLike] = useState(false);

  const { data, refetch } = useQuery("LIKES", fetchLikes);

  const liked = data && data;

  const deleteLike = useMutation(deleteLikes, {
    onSuccess: (res) => {
      console.log(res);
    },
  });

  const { mutate } = useMutation(likeMessage, {
    onSuccess: (res) => {
      console.log(res);
      // refetch();
    },
  });

  // const openNotification = (placement: NotificationPlacement) => {
  //   notification.info({
  //     message: `Login To Like this Topic`,
  //     placement,
  //   });
  // };

  const [likes, setLikes] = useState(0);

  const like = () => {
    setIsLike(true);
    setLikes(likes + 1);
  };

  const dislike = () => {
    setIsLike(false);
    setLikes(likes - 1);
  };

  const toggleLike = () => {
    if (like.length > 0) {
      const checkId = liked.find((mssId: any) => mssId.mssId === id);
      console.log(!checkId.isLike);
    }
    // if (!checkId.isLike) {
    // mutate({
    //   isLike: true,
    //   mssId: id,
    //   userId: currentUserId,
    //   id: uuidv4(),
    //   createdAt: new Date(),
    // });
    // } else {
    //   deleteLike.mutate(checkId.id);
    // }
    // console.log({
    //   isLike: true,
    //   mssId: id,
    //   userId: currentUserId,
    //   id: uuidv4(),
    //   createdAt: new Date(),
    // });
  };

  const iconProps = { onClick: toggleLike, className: styles.like_icon };

  // useEffect(() => {
  //   if (likes) {
  //     setIsLike(liked.isLiked ? true : false);
  //   }
  // }, [likes]);

  return (
    <>
      <div className={styles.like}>
        {isLike ? (
          <LikeFilled {...iconProps} />
        ) : (
          <DislikeOutlined {...iconProps} />
        )}
        <p className={styles.like_count}>{likes}</p>
      </div>
    </>
  );
}

export default MessageCard;
