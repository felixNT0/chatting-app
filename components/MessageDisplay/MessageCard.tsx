import { DeleteFilled } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Divider, Row } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useMutation } from "react-query";
import { deleteMessages } from "./query";

dayjs.extend(relativeTime);

const { Meta } = Card;

interface Props {
  result: any | undefined;
  refetch: any;
  isLoading: boolean;
  currentUser: any;
}

function MessageCard({ result, refetch, isLoading, currentUser }: Props) {
  const user = currentUser.find((user: any) => user.email);
  const deleteMessageMutation = useMutation(deleteMessages, {
    onSuccess: () => {
      refetch();
    },
  });

  const deleteMessage = (id: any) => {
    deleteMessageMutation.mutate(id);
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
        <Row gutter={[16, 16]} className="text-center">
          <Col span={24}>
            {result.map((mss: any) => (
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
                  description={`${mss.user.username} post ${dayjs(
                    mss.createdAt
                  ).fromNow()}`}
                />
                <Divider className="mt-3 mb-1" />
                {user.id === mss.user.id && (
                  <Button
                    type="text"
                    onClick={() => deleteMessage(mss.id)}
                    icon={<DeleteFilled />}
                  />
                )}
              </Card>
            ))}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default MessageCard;
