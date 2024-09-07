import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Order {
  price: number;
  count: number;
}

interface UserData {
  id: number;
  name: string;
  status: string;
  orders: Order[];
}

const YourComponent = () => {
  const [isActive, setIsActive] = useState<number>(0);
  const [filter, setFilter] = useState<string>("");
  const [userData, setUserData] = useState<UserData[]>([]);
  const [userName, setUserName] = useState<UserData | null>(null);

  useEffect(() => {
    if (isActive === 1) setFilter("Yangi");
    else if (isActive === 2) setFilter("Qabul qilingan");
    else if (isActive === 3) setFilter("Jonatilgan");
    else if (isActive === 4) setFilter("Yopilgan");
    else setFilter("Rad etilgan");
  }, [isActive]);

  const Back = (item: UserData) => {
    setUserData(
      userData.map((item2) => {
        if (item2.id === item.id) {
          if (item.status === "Yangi") item2.status = "Rad etilgan";
          else if (item.status === "Qabul qilingan") item2.status = "Yangi";
          else if (item.status === "Jonatilgan") item2.status = "Qabul qilingan";
          else if (item.status === "Yopilgan") item2.status = "Jonatilgan";
        }
        return item2;
      })
    );
  };

  const Next = (item: UserData) => {
    setUserData(
      userData.map((item2) => {
        if (item2.id === item.id) {
          if (item.status === "Rad etilgan") item2.status = "Yangi";
          else if (item.status === "Yangi") item2.status = "Qabul qilingan";
          else if (item.status === "Qabul qilingan") item2.status = "Jonatilgan";
          else if (item.status === "Jonatilgan") item2.status = "Yopilgan";
        }
        return item2;
      })
    );
    setUserName(item);
  };

  const notify = () => {
    if (userName) {
      toast(`${userName.name} ${userName.status}ga o'zgartrildi`);
    }
  };

  const OrdersSumNew = userData
    .filter((item) => item.status === "Yangi")
    .map(
      (item2) =>
        item2.orders.reduce(
          (total, order) => total + order.price * order.count,
          0
        ) + 5000
    );

  const Accepted = userData
    .filter((item) => item.status === "Qabul qilingan")
    .map(
      (item2) =>
        item2.orders.reduce(
          (total, order) => total + order.price * order.count,
          0
        ) + 5000
    );

  const Send = userData
    .filter((item) => item.status === "Jonatilgan")
    .map(
      (item2) =>
        item2.orders.reduce(
          (total, order) => total + order.price * order.count,
          0
        ) + 5000
    );

  const Closed = userData
    .filter((item) => item.status === "Yopilgan")
    .map(
      (item2) =>
        item2.orders.reduce(
          (total, order) => total + order.price * order.count,
          0
        ) + 5000
    );

  const Rejected = userData
    .filter((item) => item.status === "Rad etilgan")
    .map(
      (item2) =>
        item2.orders.reduce(
          (total, order) => total + order.price * order.count,
          0
        ) + 5000
    );

  return (
  <></>
  );
};
