import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface Order {
  price: number;
  count: number;
}

interface UserDataItem {
  id: number;
  status: string;
  orders: Order[];
}

const Saidbarscom: React.FC = () => {
  const [userData, setUserData] = useState<UserDataItem[]>([]);
  const [filter, setFilter] = useState<string>("Yangi");
  const [isActive, setIsActive] = useState<number>(1);
  const [userName, setUserName] = useState<UserDataItem>({
    id: 0,
    status: "",
    orders: [],
  });

  useEffect(() => {
    switch (isActive) {
      case 1:
        setFilter("Yangi");
        break;
      case 2:
        setFilter("Qabul qilingan");
        break;
      case 3:
        setFilter("Jonatilgan");
        break;
      case 4:
        setFilter("Yopilgan");
        break;
      default:
        setFilter("Rad etilgan");
        break;
    }
  }, [isActive]);

  const Back = (item: UserDataItem) => {
    const updatedStatus =
      item.status === "Yangi"
        ? "Rad etilgan"
        : item.status === "Qabul qilingan"
        ? "Yangi"
        : item.status === "Jonatilgan"
        ? "Qabul qilingan"
        : "Jonatilgan";

    setUserData((prevUserData) =>
      prevUserData.map((item2) =>
        item2.id === item.id ? { ...item2, status: updatedStatus } : item2
      )
    );
  };

  const Next = (item: UserDataItem) => {
    const updatedStatus =
      item.status === "Rad etilgan"
        ? "Yangi"
        : item.status === "Yangi"
        ? "Qabul qilingan"
        : item.status === "Qabul qilingan"
        ? "Jonatilgan"
        : "Yopilgan";

    setUserData((prevUserData) =>
      prevUserData.map((item2) =>
        item2.id === item.id ? { ...item2, status: updatedStatus } : item2
      )
    );

    setUserName(item);
    notify();
  };

  const notify = () => toast(`${userName.status} statusi o'zgartirildi`);

  const calculateSum = (status: string) => {
    return userData
      .filter((item) => item.status === status)
      .reduce(
        (total, item) =>
          total +
          item.orders.reduce(
            (sum, order) => sum + order.price * order.count,
            0
          ) +
          5000,
        0
      );
  };

  const OrdersSumNew = calculateSum("Yangi");
  const Accepted = calculateSum("Qabul qilingan");
  const Send = calculateSum("Jonatilgan");
  const Closed = calculateSum("Yopilgan");
  const Rejected = calculateSum("Rad etilgan");

  return (
    <div>
      {/* Button group */}
      <div
        className="flex items-center justify-between"
        style={{
          width: "591px",
          height: "48px",
          background: "#EDEFF3",
          borderRadius: "30px",
          padding: "5px",
          marginLeft: "50px",
        }}
      >
        <button
          className={isActive === 1 ? "activ" : "inActiv"}
          onClick={() => setIsActive(1)}
        >
          Yangi
        </button>
        <button
          className={isActive === 2 ? "activ" : "inActiv"}
          onClick={() => setIsActive(2)}
        >
          Qabul qilingan
        </button>
        <button
          className={isActive === 3 ? "activ" : "inActiv"}
          onClick={() => setIsActive(3)}
        >
          Jonatilgan
        </button>
        <button
          className={isActive === 4 ? "activ" : "inActiv"}
          onClick={() => setIsActive(4)}
        >
          Yopilgan
        </button>
      </div>

      <h1>hello</h1>
    </div>
  );
};

export default Saidbarscom;
