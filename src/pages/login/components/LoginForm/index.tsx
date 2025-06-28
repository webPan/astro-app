import { Button, Form, Input } from "antd";
import { useUserStore } from "@/store";
import { getUserInfo } from "@/services/common.ts";

const LoginForm = () => {
  const { setUserInfo, userInfo } = useUserStore();
  const onFinish = async (values: Record<string, any>) => {
    setUserInfo(await getUserInfo(values));
  };
  console.log({ userInfo });
  return (
    <div className="m-auto min-h-[300px] w-[300px]">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item className="flex items-center justify-center">
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
