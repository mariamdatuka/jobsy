import { useUserStore } from "@src/store/userStore";

const Dashboard = () => {
  // const user = useUserStore((state) => state.user);
  // const sesstion = useUserStore((state) => state.session);
  // console.log("user", user);
  // console.log("sesstion", sesstion);
  const logout = useUserStore((state) => state.logout);
  return (
    <div>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Dashboard;
