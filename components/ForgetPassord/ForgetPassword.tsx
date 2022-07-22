import { WechatFilled } from "@ant-design/icons";
import emailjs from "@emailjs/browser";
import { Alert, Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { fetchUser } from "../Login/query";
import { resetPassword } from "./query";

function ForgetPassword() {
  const [form] = Form.useForm();

  const router = useRouter();

  const [showReset, setShowReset] = useState(false);

  const [showVerify, setShowVerify] = useState(true);

  const [error, setError] = useState<string>();

  const { data, refetch } = useQuery("users", fetchUser);

  const result = data && data;

  const { mutate } = useMutation(resetPassword, {
    onSuccess: () => {
      refetch();
      router.push("/login");
    },
  });

  const [findedUser, setFindedUser] = useState<any>([]);

  const onFinishVerification = () => {
    let checkUser = result.find(
      (user: any) => user.email === form.getFieldsValue().email
    );
    if (checkUser) {
      setFindedUser(checkUser);
      setShowVerify(false);
      setShowReset(true);
    } else {
      setError("Email does not exist");
    }
  };

  const onFinishResetPassword = async () => {
    const { confirm_password, ...other } = form.getFieldsValue();
    const id = findedUser.id;
    const { password, createdAt, updatedAt, remember, ...values } = findedUser;
    const value = { ...other, ...values };

    await emailjs
      .send("service_e4zpwal", "template_4p5mr4l", value, "Ia3qhzbvtlw8-6ePl")
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    mutate({ data: { ...other, updatedAt: new Date() }, id: id });
  };
  return (
    <div style={{ marginTop: "15px", textAlign: "center", padding: "0px 15%" }}>
      <WechatFilled
        style={{ fontSize: "70px", color: "#1890ff", marginBottom: "15px" }}
      />
      <h1>Reset Password</h1>
      {showVerify && (
        <>
          <h5 className="mb-5">Your are about to reset your password now</h5>
          <Form form={form} onFinish={onFinishVerification} layout="vertical">
            {error && (
              <div className="text-center, mb-5">
                <Alert message={error} type="error" showIcon closable />
              </div>
            )}
            <Form.Item
              name="email"
              style={{ textAlign: "center" }}
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                size="large"
                style={{ width: "50%" }}
                placeholder="Type your email..."
              />
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              <Button
                htmlType="submit"
                style={{ width: "30%", backgroundColor: "#1890ff" }}
                size="large"
                type="primary"
              >
                Continue
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
      {showReset && (
        <>
          <h5 className="mb-5">Input your new password</h5>
          <Form form={form} onFinish={onFinishResetPassword} layout="vertical">
            <Form.Item
              name="password"
              style={{ textAlign: "center" }}
              rules={[
                { required: true, message: "Please input your New Password!" },
              ]}
            >
              <Input.Password
                size="large"
                style={{ width: "50%" }}
                placeholder="New password..."
              />
            </Form.Item>
            <Form.Item
              name="confirm_password"
              style={{ textAlign: "center" }}
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                size="large"
                style={{ width: "50%" }}
                placeholder="Confirm password..."
              />
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              <Button
                htmlType="submit"
                style={{ width: "30%", backgroundColor: "#1890ff" }}
                size="large"
                type="primary"
              >
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </div>
  );
}

export default ForgetPassword;
