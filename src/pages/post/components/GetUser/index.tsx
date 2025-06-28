import { useUserStore } from "@/store";

const GetUser = () => {
  const { userInfo } = useUserStore();
  console.log(userInfo);
  return <div>{JSON.stringify(userInfo)}</div>;
};

export default GetUser;
