// import React, { useEffect, useState } from "react";
// import { Button, Card, Col, Row, Segmented, Select, Typography } from "antd";
// import { FiPlus } from "react-icons/fi";
// import axios from "axios";
// import { Box, Drawer } from "@mui/material"; // MUI import
// import { GoClock } from "react-icons/go";
// import { CiBookmark, CiDeliveryTruck } from "react-icons/ci";
// import { FiUser, FiPhone } from "react-icons/fi";
// import { IoMdCheckmark } from "react-icons/io";
// import { HiMenuAlt4, HiOutlineMenuAlt3 } from "react-icons/hi";
// import "./css.css";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import defaultMarkerIcon from "leaflet/dist/images/marker-icon.png"; // Rename import
// import defaultMarkerShadow from "leaflet/dist/images/marker-shadow.png";
// import L from "leaflet";
// // Standart marker ikonkasini to'g'ri sozlash
// import "leaflet/dist/leaflet.css";
// import Buyurtma from "../bars/bars";

// const markerIcon = "path/to/marker-icon.png"; // Adjust the path as needed
// const markerShadow = "path/to/marker-shadow.png"; // Adjust the path as needed

// const customIcon = L.icon({
//   iconUrl: defaultMarkerIcon, // Use renamed import
//   shadowUrl: defaultMarkerShadow, // Use renamed import
//   iconSize: [20, 34], // Adjusted size
//   iconAnchor: [10, 34], // Adjusted anchor
//   popupAnchor: [0, -30], // Adjusted popup anchor
//   shadowSize: [30, 30], // Adjusted shadow size
// });

// // Filiallar ma'lumotlari
// interface Branch {
//   position: [number, number];
//   owner: string;
//   phone: string;
//   name: string;
// }

// const branches: Branch[] = [
//   {
//     position: [41.2995, 69.2401],
//     owner: "Asror Soliyev",
//     phone: "+998991234567",
//     name: "Maxway Filial 1",
//   },
//   {
//     position: [41.3111, 69.2797],
//     owner: "Shavkat Karimov",
//     phone: "+998991234568",
//     name: "Maxway Filial 2",
//   },
//   {
//     position: [41.3134, 69.2826],
//     owner: "Ali Akbarov",
//     phone: "+998991234569",
//     name: "Maxway Filial 3",
//   },
//   {
//     position: [41.326543, 69.228495],
//     owner: "Ali Akbarov",
//     phone: "+998991234569",
//     name: "Maxway Filial 4",
//   },
// ];

// interface Product {
//   id: number;
//   mijoz: string;
//   customNum: string;
//   orderSum: number;
//   opName: string;
//   filial: string;
// }

// interface Products {
//   id: number;
//   img: string;
//   name: string;
//   category: string;
//   filters: number;
//   price: number;
//   quantity: number;
//   qoshimcha: string;
// }

// function Buyurtmalar() {
//   const [activeButton, setActiveButton] = useState("Yangi");
//   const [data, setData] = useState<Product[]>([]);
//   const [maxsulotlar, setMaxsulotlar] = useState<Products[]>([]);
//   const [open, setOpen] = useState(false);
//   const [selectedSegment, setSelectedSegment] = React.useState(0);

//   ////////////////////////////////////////////////////
//   const [selectedProducts, setSelectedProducts] = useState<Products[]>([]);
//   console.log(selectedProducts);

//   const [selectedCustomer, setSelectedCustomer] = useState<Product | null>(
//     null
//   );
//   const [customerNumbers, setCustomerNumbers] = useState<string[]>([]); // Agar customNum faqat bitta string bo'lsa

//   // Select o'zgarishi bo'yicha mijozni yangilash

//   const handleSelectChange = (value: string) => {
//     const selected = data.find((item) => item.mijoz === value);
//     if (selected) {
//       setSelectedCustomer(selected);
//     } else {
//       setSelectedCustomer(null);
//     }
//   };

//   const handleSegmentChange = (index: any) => {
//     setSelectedSegment(index);
//   };
//   useEffect(() => {
//     axios
//       .get("https://e2ead815ad4a2894.mokky.dev/xisobot")
//       .then((res) => {
//         setData(res.data);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   }, []);

//   useEffect(() => {
//     axios
//       .get("https://e2ead815ad4a2894.mokky.dev/maxsulotlar")
//       .then((res) => {
//         setMaxsulotlar(res.data);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   }, []);

//   const handleButtonClick = (buttonName: string) => {
//     setActiveButton(buttonName);
//   };

//   const totalSum = selectedProducts.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const [totalSum1, setTotalSum1] = useState<number>(0);
//   const productNames = selectedProducts.map((item) => item.name).join(""); // Mahsulot nomlarini vergul bilan ajratish

//   const showLargeDrawer = () => {
//     setOpen(true);
//   };

//   const onClose = () => {
//     setOpen(false);
//     console.log("ffd");
//   };

//   const handleChange = (value: string) => {
//     console.log(`selected ${value}`);
//   };

//   const mapContainerStyle = {
//     width: "100%",
//     height: "400px",
//   };

//   const handleAddProduct = (product: Product) => {
//     axios
//       .post("https://e2ead815ad4a2894.mokky.dev/xisobot", product)
//       .then((res) => {
//         setData((prevData) => [...prevData, product]); // Correct way to update the state
//         setOpen(false);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   // Define the type for orders
//   type OrderType = {
//     id: number;
//     status: "yangi" | "qabul qilingan" | "jo'natilgan" | "yopilgan";
//     // other fields
//   };

//   // Initialize state with useState
//   const [orders, setOrders] = useState<OrderType[]>([]);

//   // Function to handle status change
//   const handleStatusChange = (orderId: number) => {
//     setOrders((prevOrders: OrderType[]) =>
//       prevOrders.map((order: OrderType) => {
//         if (order.id === orderId) {
//           let newStatus = order.status;
//           if (order.status === "yangi") {
//             newStatus = "qabul qilingan";
//           } else if (order.status === "qabul qilingan") {
//             newStatus = "jo'natilgan";
//           } else if (order.status === "jo'natilgan") {
//             newStatus = "yopilgan";
//           }
//           return { ...order, status: newStatus };
//         }
//         return order;
//       })
//     );
//   };

//   // const addProductToSelection = (product: Product) => {
//   //   setSelectedProducts((prevSelectedProducts) => {
//   //     // Mahsulot mavjudmi tekshirish
//   //     const existingProduct = prevSelectedProducts.find(
//   //       (p) => p.id === product.id
//   //     );
//   //     if (existingProduct) {
//   //       // Agar mavjud bo'lsa, miqdorini oshirish
//   //       return prevSelectedProducts.map((p) =>
//   //         p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
//   //       );
//   //     } else {
//   //       // Agar mavjud bo'lmasa, yangi mahsulot qo'shish
//   //       return [...prevSelectedProducts, { ...product, quantity: 1 }];
//   //     }
//   //   });
//   // };

//   React.useEffect(() => {
//     const newTotalSum = selectedProducts.reduce(
//       (sum, product) => sum + product.price * product.quantity,
//       0
//     );
//     setTotalSum1(newTotalSum);
//   }, [selectedProducts]);

//   // const handleAddProduct = (product: Product) => {
//   //   addProductToSelection(product);
//   // };

//   const center = {
//     lat: 37.7749,
//     lng: -122.4194,
//   };
//   const [selectedItems, setSelectedItems] = useState<string[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState("Burger");

//   const handleCategoryChange = (category: any) => {
//     setSelectedCategory(category);
//   };

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get(
//         "https://e2ead815ad4a2894.mokky.dev/maxsulotlar"
//       );
//       const productsWithQuantity = response.data.map((product: Products) => ({
//         ...product,
//         quantity: 0, // Har bir mahsulot uchun miqdorni 0 qilib qo'yamiz
//       }));
//       setMaxsulotlar(productsWithQuantity);
//     } catch (error) {
//       console.error("Mahsulotlarni yuklashda xatolik:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Miqdorni oshirish funksiyasi
//   const handleIncrement = (productId: number) => {
//     setMaxsulotlar(
//       maxsulotlar.map((product) =>
//         product.id === productId
//           ? { ...product, quantity: product.quantity + 1 }
//           : product
//       )
//     );
//   };

//   // Miqdorni kamaytirish funksiyasi
//   const handleDecrement = (productId: number) => {
//     setMaxsulotlar(
//       maxsulotlar.map((product) =>
//         product.id === productId && product.quantity > 0
//           ? { ...product, quantity: product.quantity - 1 }
//           : product
//       )
//     );
//   };

//   // Tanlangan mahsulotlarni yangilash
//   const updateSelectedProducts = () => {
//     const selected = maxsulotlar.filter((product) => product.quantity > 0);
//     setSelectedProducts(selected);
//   };

//   // Har bir o'zgarishdan keyin tanlangan mahsulotlar ro'yxatini yangilash
//   useEffect(() => {
//     updateSelectedProducts();
//   }, [maxsulotlar]);

//   //////////

//   const renderProducts = () => {
//     switch (selectedCategory) {
//       case "Burger":
//         return maxsulotlar
//           .filter((product) => product.category === "Burger")
//           .map((it) => (
//             <div
//               key={it.id}
//               style={{
//                 width: "290px",
//                 borderRadius: "10px",
//                 marginTop: "20px",
//               }}
//               className=" shadow-lg"
//             >
//               <img
//                 src={it.img}
//                 alt="dfsa"
//                 className="w-full h-36"
//                 style={{
//                   objectFit: "cover",
//                   borderTopLeftRadius: "10px",
//                   borderTopRightRadius: "10px",
//                 }}
//               />
//               <div className="p-3 pb-5">
//                 <p style={{ fontSize: "25px", paddingTop: "3px" }}>{it.name}</p>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     cursor: "pointer",
//                   }}
//                 >
//                   <p>{it.price.toLocaleString("en-Us")} UZS</p>
//                   <div
//                     style={{
//                       border: "1px solid #EDEFF3",
//                       borderRadius: "10px",
//                       padding: "5px",
//                       width: "100px",
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       cursor: "pointer",
//                     }}
//                   >
//                     <Button
//                       onClick={() => handleDecrement(it.id)}
//                       style={{ border: "none", background: "white" }}
//                     >
//                       -
//                     </Button>
//                     <span>{it.quantity}</span>
//                     <Button
//                       onClick={() => handleIncrement(it.id)}
//                       style={{ border: "none", background: "white" }}
//                     >
//                       +
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ));

//       case "Lavash":
//         return maxsulotlar
//           .filter((product) => product.category === "Lavash")
//           .map((it) => (
//             <div
//               key={it.id}
//               style={{
//                 width: "290px",
//                 borderRadius: "10px",
//                 marginTop: "20px",
//               }}
//               className=" shadow-lg"
//             >
//               <img
//                 src={it.img}
//                 alt="dfsa"
//                 className="w-full h-36"
//                 style={{
//                   objectFit: "cover",
//                   borderTopLeftRadius: "10px",
//                   borderTopRightRadius: "10px",
//                 }}
//               />
//               <div className="p-3 pb-5">
//                 <p style={{ fontSize: "25px", paddingTop: "3px" }}>{it.name}</p>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     cursor: "pointer",
//                   }}
//                 >
//                   <p>{it.price.toLocaleString("en-Us")} UZS</p>
//                   <div
//                     style={{
//                       border: "1px solid #EDEFF3",
//                       borderRadius: "10px",
//                       padding: "5px",
//                       width: "100px",
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       cursor: "pointer",
//                     }}
//                   >
//                     <Button
//                       onClick={() => handleDecrement(it.id)}
//                       style={{ border: "none", background: "white" }}
//                     >
//                       -
//                     </Button>
//                     <span>{it.quantity}</span>
//                     <Button
//                       onClick={() => handleIncrement(it.id)}
//                       style={{ border: "none", background: "white" }}
//                     >
//                       +
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ));

//       case "Garnish":
//         return maxsulotlar
//           .filter((product) => product.category === "Garnish")
//           .map((it) => (
//             <div
//               key={it.id}
//               style={{
//                 width: "290px",
//                 borderRadius: "10px",
//                 marginTop: "20px",
//               }}
//               className=" shadow-lg"
//             >
//               <img
//                 src={it.img}
//                 alt="dfsa"
//                 className="w-full h-36"
//                 style={{
//                   objectFit: "cover",
//                   borderTopLeftRadius: "10px",
//                   borderTopRightRadius: "10px",
//                 }}
//               />
//               <div className="p-3 pb-5">
//                 <p style={{ fontSize: "25px", paddingTop: "3px" }}>{it.name}</p>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     cursor: "pointer",
//                   }}
//                 >
//                   <p>{it.price.toLocaleString("en-Us")} UZS</p>
//                   <div
//                     style={{
//                       border: "1px solid #EDEFF3",
//                       borderRadius: "10px",
//                       padding: "5px",
//                       width: "100px",
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       cursor: "pointer",
//                     }}
//                   >
//                     <Button
//                       onClick={() => handleDecrement(it.id)}
//                       style={{ border: "none", background: "white" }}
//                     >
//                       -
//                     </Button>
//                     <span>{it.quantity}</span>
//                     <Button
//                       onClick={() => handleIncrement(it.id)}
//                       style={{ border: "none", background: "white" }}
//                     >
//                       +
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ));

//       case "Salad":
//         return maxsulotlar
//           .filter((product) => product.category === "Salad")
//           .map((it) => (
//             <div
//               key={it.id}
//               style={{
//                 width: "290px",
//                 borderRadius: "10px",
//                 marginTop: "20px",
//               }}
//               className=" shadow-lg"
//             >
//               <img
//                 src={it.img}
//                 alt="dfsa"
//                 className="w-full h-36"
//                 style={{
//                   objectFit: "cover",
//                   borderTopLeftRadius: "10px",
//                   borderTopRightRadius: "10px",
//                 }}
//               />
//               <div className="p-3 pb-5">
//                 <p style={{ fontSize: "25px", paddingTop: "3px" }}>{it.name}</p>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     cursor: "pointer",
//                   }}
//                 >
//                   <p>{it.price.toLocaleString("en-Us")} UZS</p>
//                   <div
//                     style={{
//                       border: "1px solid #EDEFF3",
//                       borderRadius: "10px",
//                       padding: "5px",
//                       width: "100px",
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       cursor: "pointer",
//                     }}
//                   >
//                     <Button
//                       onClick={() => handleDecrement(it.id)}
//                       style={{ border: "none", background: "white" }}
//                     >
//                       -
//                     </Button>
//                     <span>{it.quantity}</span>
//                     <Button
//                       onClick={() => handleIncrement(it.id)}
//                       style={{ border: "none", background: "white" }}
//                     >
//                       +
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ));

//       case "Drink":
//         return maxsulotlar
//           .filter((product) => product.category === "Drink")
//           .map((it) => (
//             <div
//               key={it.id}
//               style={{
//                 width: "290px",
//                 borderRadius: "10px",
//                 marginTop: "20px",
//               }}
//               className=" shadow-lg"
//             >
//               <img
//                 src={it.img}
//                 alt="dfsa"
//                 className="w-full h-36"
//                 style={{
//                   objectFit: "cover",
//                   borderTopLeftRadius: "10px",
//                   borderTopRightRadius: "10px",
//                 }}
//               />
//               <div className="p-3 pb-5">
//                 <p style={{ fontSize: "25px", paddingTop: "3px" }}>{it.name}</p>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     cursor: "pointer",
//                   }}
//                 >
//                   <p>{it.price.toLocaleString("en-Us")} UZS</p>
//                   <div
//                     style={{
//                       border: "1px solid #EDEFF3",
//                       borderRadius: "10px",
//                       padding: "5px",
//                       width: "100px",
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       cursor: "pointer",
//                     }}
//                   >
//                     <Button
//                       onClick={() => handleDecrement(it.id)}
//                       style={{ border: "none", background: "white" }}
//                     >
//                       -
//                     </Button>
//                     <span>{it.quantity}</span>
//                     <Button
//                       onClick={() => handleIncrement(it.id)}
//                       style={{ border: "none", background: "white" }}
//                     >
//                       +
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ));

//       case "Sauce":
//         return maxsulotlar
//           .filter((product) => product.category === "Sauce")
//           .map((it) => (
//             <div
//               key={it.id}
//               style={{
//                 width: "290px",
//                 borderRadius: "10px",
//                 marginTop: "20px",
//               }}
//               className=" shadow-lg"
//             >
//               <img
//                 src={it.img}
//                 alt="dfsa"
//                 className="w-full h-36"
//                 style={{
//                   objectFit: "cover",
//                   borderTopLeftRadius: "10px",
//                   borderTopRightRadius: "10px",
//                 }}
//               />
//               <div className="p-3 pb-5">
//                 <p style={{ fontSize: "25px", paddingTop: "3px" }}>{it.name}</p>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     cursor: "pointer",
//                   }}
//                 >
//                   <p>{it.price.toLocaleString("en-Us")} UZS</p>
//                   <div
//                     style={{
//                       border: "1px solid #EDEFF3",
//                       borderRadius: "10px",
//                       padding: "5px",
//                       width: "100px",
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       cursor: "pointer",
//                     }}
//                   >
//                     <Button
//                       onClick={() => handleDecrement(it.id)}
//                       style={{ border: "none", background: "white" }}
//                     >
//                       -
//                     </Button>
//                     <span>{it.quantity}</span>
//                     <Button
//                       onClick={() => handleIncrement(it.id)}
//                       style={{ border: "none", background: "white" }}
//                     >
//                       +
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ));

//       default:
//         return <div>Mahsulotlar ro'yxati</div>;
//     }
//   };

//   return (
//     <div>
//       <div className="bg-white flex items-center">
//         <div
//           style={{
//             borderRight: "1px solid #EDEFF3",
//             borderLeft: "1px solid #EDEFF3",
//             padding: "20px",
//             paddingLeft: "50px",
//             width: "270px",
//           }}
//           className="flex items-center gap-5"
//         >
//           <Button
//             onClick={showLargeDrawer}
//             style={{
//               borderRadius: "50%",
//               backgroundColor: "#20D472",
//               color: "white",
//               width: "40px",
//               height: "40px",
//               paddingLeft: "2px",
//             }}
//             icon={<FiPlus style={{ fontSize: "30px" }} />}
//           />
//           <h2
//             style={{
//               fontWeight: "bold",
//             }}
//           >
//             Yangi buyurtma
//             <br />
//             qo’shish
//           </h2>
//         </div>

//         <Buyurtma />

//         <div
//           style={{
//             borderLeft: "1px solid #EDEFF3",
//             width: "100px",
//             marginLeft: "230px",
//           }}
//           className="flex items-center gap-5"
//         >
//           <div
//             className=" flex items-center justify-between gap-3"
//             style={{
//               width: "120px",
//               height: "45px",
//               background: "#EDEFF3",
//               paddingRight: "10px",
//               borderRadius: "30px",
//               padding: "7px",
//               marginLeft: "10px",
//             }}
//           >
//             <Button className="iconActiv">
//               <HiMenuAlt4 />
//             </Button>
//             <Button>
//               <HiOutlineMenuAlt3 />
//             </Button>
//           </div>
//         </div>
//       </div>

//       <Row>
//         <Col span={23}>
//           {data.map((item) => (
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 marginTop: "2px",
//               }}
//               key={item.id}
//             >
//               {/* Card component implementation */}
//               <Box
//                 sx={{
//                   border: "1px solid EDEFF3",
//                   padding: "20px",
//                   background: "white",
//                   height: "200px",
//                   marginTop: "20px",
//                   marginLeft: "30px",
//                   borderRadius: "10px",
//                   borderBottomRightRadius: "0px",
//                   borderTopRightRadius: "0px",
//                   borderRight: "2px solid #EDEFF3",
//                   width: "370px",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     width: "160px",
//                     borderBottom: "1px solid #dfdede",
//                     textAlign: "center",
//                     paddingBottom: "30px",
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: "100px",
//                       padding: "10px",
//                       background: "#20D472",
//                       textAlign: "center",
//                       borderRadius: "50px",
//                       color: "white",
//                       fontSize: "16px",
//                     }}
//                   >
//                     <p>8549</p>
//                   </div>
//                   <div
//                     style={{
//                       width: "45px",
//                       height: "45px",
//                       padding: "10px",
//                       borderRadius: "50%",
//                       fontSize: "16px",
//                       textAlign: "center",
//                       backgroundColor: "#EDEFF3",
//                     }}
//                   >
//                     <CiBookmark
//                       style={{ fontSize: "25px", fontWeight: "bolder" }}
//                     />
//                   </div>
//                 </div>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "flex-start",
//                     gap: "20px",
//                     alignItems: "center",
//                     paddingTop: "20px",
//                   }}
//                 >
//                   <GoClock style={{ fontSize: "20px" }} />
//                   <p style={{ fontSize: "20px" }}>00:24</p>
//                 </div>
//               </Box>
//               <Box
//                 sx={{
//                   border: "1px solid EDEFF3",
//                   padding: "20px",
//                   background: "white",
//                   height: "200px",
//                   marginTop: "20px",
//                   borderRight: "2px solid #EDEFF3",
//                   width: "370px",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "flex-start",
//                     gap: "15px",
//                     alignItems: "baseline",
//                   }}
//                 >
//                   <FiUser style={{ fontSize: "20px", color: "#8D9BA8" }} />
//                   <p style={{ fontSize: "20px" }}>{item.mijoz}</p>
//                 </div>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     gap: "15px",
//                     alignItems: "center",
//                     marginTop: "20px",
//                     paddingTop: "20px",
//                     marginRight: "65px",
//                   }}
//                 >
//                   <FiPhone style={{ fontSize: "20px", color: "#8D9BA8" }} />
//                   <p style={{ fontSize: "15px" }}>{item.customNum}</p>
//                 </div>
//               </Box>
//               <Box
//                 sx={{
//                   border: "1px solid EDEFF3",
//                   padding: "20px",
//                   background: "white",
//                   borderRight: "2px solid #EDEFF3",
//                   width: "370px",
//                   height: "200px",
//                   marginTop: "20px",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "flex-start",
//                     gap: "30px",
//                   }}
//                 >
//                   <div>
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         gap: 10,
//                       }}
//                     >
//                       <CiBookmark style={{ color: "grey", fontSize: "20px" }} />
//                       <p style={{ fontSize: "17px" }}>35,400 UZS</p>
//                     </div>
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         gap: 10,
//                       }}
//                     >
//                       <CiDeliveryTruck
//                         style={{ color: "grey", fontSize: "20px" }}
//                       />
//                       <p style={{ fontSize: "17px" }}>5,000 UZS</p>
//                     </div>
//                   </div>
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       gap: "10px",
//                     }}
//                   >
//                     <span
//                       style={{
//                         background: "#14E5E4",
//                         borderRadius: "50%",
//                         padding: "6px",
//                       }}
//                     ></span>
//                     <p style={{ fontSize: "15px" }}>Payme</p>
//                   </div>
//                 </div>
//                 <div
//                   style={{
//                     marginTop: "20px",
//                     marginLeft: "18px",
//                     paddingTop: "20px",
//                   }}
//                 >
//                   <p style={{ fontSize: "11px", color: "#8D9BA8" }}>
//                     Umumiy summa
//                   </p>
//                   <p style={{ fontSize: "23px", color: "black" }}>
//                     {item.orderSum} UZS
//                   </p>
//                 </div>
//               </Box>
//               <Box
//                 sx={{
//                   border: "1px solid EDEFF3",
//                   borderRadius: "10px",
//                   padding: "20px",
//                   background: "white",
//                   width: "370px",
//                   height: "200px",
//                   marginTop: "20px",
//                   borderBottomLeftRadius: "0px",
//                   borderTopLeftRadius: "0px",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     gap: "55px",
//                   }}
//                 >
//                   <div>
//                     <p style={{ color: "#8D9BA8" }}>Operator:</p>
//                     <p
//                       style={{
//                         fontSize: "16px",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       {item.opName}
//                     </p>
//                   </div>
//                   <div
//                     style={{
//                       marginRight: "-40px",
//                     }}
//                   >
//                     <Button
//                       style={{
//                         borderRadius: "50%",
//                         width: "45px",
//                         height: "45px",
//                       }}
//                     >
//                       X
//                     </Button>
//                   </div>
//                 </div>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     gap: "55px",
//                     marginTop: "25px",
//                   }}
//                 >
//                   <div>
//                     <p style={{ color: "#8D9BA8" }}>Filial:</p>
//                     <p
//                       style={{
//                         fontSize: "16px",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       {item.filial}
//                     </p>
//                   </div>
//                   <div
//                     style={{
//                       marginRight: "-40px",
//                     }}
//                   >
//                     <Button
//                       style={{
//                         borderRadius: "50%",
//                         width: "45px",
//                         height: "45px",
//                       }}
//                       onClick={() => handleStatusChange(item.id)}
//                     >
//                       <IoMdCheckmark />
//                     </Button>
//                   </div>
//                 </div>
//               </Box>
//             </Box>
//           ))}
//         </Col>
//       </Row>

//       {/* Drawer implementation */}
//       <Drawer
//         anchor="right"
//         open={open}
//         onClose={onClose}
//         PaperProps={{
//           sx: {
//             width: 1170,
//           },
//         }}
//       >
//         <Box
//           sx={{
//             padding: "25px",
//           }}
//         >
//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <Button
//               onClick={onClose}
//               style={{ minWidth: "auto", marginRight: "450px" }}
//             >
//               X
//             </Button>
//           </div>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "baseline",
//             }}
//           >
//             <p style={{ marginBottom: "20px" }}>Yangi buyurtma qo’shish</p>
//             <p style={{ marginBottom: "20px" }}>Buyurtma ro’yxati</p>
//           </div>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "baseline",
//             }}
//           >
//             <div style={{ width: "55%" }}>
//               <Box
//                 sx={{
//                   bgcolor: "transparent",
//                   p: "3px",
//                   gap: "5px",
//                   borderRadius: "40px",
//                   backgroundColor: "#EDEFF3",
//                   whiteSpace: "nowrap", // Elementlarni bir qatorda saqlash
//                   "&::-webkit-scrollbar": {
//                     height: "6px", // Scrollning balandligi
//                   },
//                   "&::-webkit-scrollbar-thumb": {
//                     backgroundColor: "#b0b0b0", // Scroll rangini sozlash
//                     borderRadius: "10px", // Scrollning radiusini sozlash
//                   },
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: "flex", // Flexni gorizontal qilish
//                     width: "100%", // Kenglikni avtomatik saqlash
//                     justifyContent: "space-between",
//                     overflowX: "auto", // Scrollni o'rnatish
//                     scrollbarWidth: "none",
//                     "& button": {
//                       flex: "0 0 auto", // Kenglikni avto saqlash, faqat kerakli joyni olish
//                       p: "10px",
//                       m: "5px",
//                       borderRadius: "xl",
//                       backgroundColor:
//                         selectedSegment === 0
//                           ? "background.surface"
//                           : "inherit",
//                       boxShadow: selectedSegment === 0 ? "sm" : "none",
//                       "&:hover": {
//                         boxShadow: "sm",
//                       },
//                     },
//                   }}
//                 >
//                   <Button
//                     onClick={() => setSelectedCategory("Burger")}
//                     style={{
//                       padding: "19px",
//                       borderRadius: "20px",
//                       border: "none",
//                     }}
//                   >
//                     Burger
//                   </Button>
//                   <Button
//                     onClick={() => setSelectedCategory("Lavash")}
//                     style={{
//                       padding: "19px",
//                       borderRadius: "20px",
//                       border: "none",
//                     }}
//                   >
//                     Lavash
//                   </Button>
//                   <Button
//                     onClick={() => setSelectedCategory("Garnish")}
//                     style={{
//                       padding: "19px",
//                       borderRadius: "20px",
//                       border: "none",
//                     }}
//                   >
//                     Garnish
//                   </Button>
//                   <Button
//                     onClick={() => setSelectedCategory("Salad")}
//                     style={{
//                       padding: "19px",
//                       borderRadius: "20px",
//                       border: "none",
//                     }}
//                   >
//                     Salad
//                   </Button>
//                   <Button
//                     onClick={() => setSelectedCategory("Drink")}
//                     style={{
//                       padding: "19px",
//                       borderRadius: "20px",
//                       border: "none",
//                     }}
//                   >
//                     Drink
//                   </Button>
//                   <Button
//                     onClick={() => setSelectedCategory("Sauce")}
//                     style={{
//                       padding: "19px",
//                       borderRadius: "20px",
//                       border: "none",
//                     }}
//                   >
//                     Sauce
//                   </Button>
//                 </Box>
//               </Box>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-around",
//                   alignItems: "center",
//                   flexWrap: "wrap",
//                 }}
//               >
//                 {renderProducts()}
//               </div>
//             </div>
//             <div style={{ width: "37%" }}>
//               <Card>
//                 <div>
//                   <h1 style={{ marginBottom: "20px" }}>Tanlagan maxsulotlar</h1>
//                   <div
//                     style={{
//                       marginBottom: "10px",
//                     }}
//                   >
//                     {selectedProducts.map((item, index) => (
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           alignItems: "center",
//                           textAlign: "start",
//                           marginBottom: "5px",
//                         }}
//                       >
//                         <p key={index} style={{ fontSize: "15px" }}>
//                           {item.name}
//                         </p>
//                         <p>
//                           {item.quantity} * {item.price.toLocaleString("en-Us")}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                   <div
//                     style={{
//                       background: "#EDEFF3",
//                       width: "215px",
//                       padding: "10px",
//                       borderRadius: "10px",
//                       marginTop: "20px",
//                     }}
//                   >
//                     <p style={{ color: "#8D9BA8" }}>Umumiy summa</p>
//                     <p style={{ fontSize: "20px", fontWeight: "bold" }}>
//                       {totalSum.toLocaleString("en-US")} UZS
//                     </p>
//                   </div>
//                 </div>
//               </Card>

//               <div style={{ paddingBottom: "15px" }} className="index">
//                 <p style={{ marginTop: "20px", marginBottom: "10px" }}>
//                   Mijoz ismi
//                 </p>

//                 <Select
//                   showSearch
//                   placeholder="Mijozni tanlang"
//                   onChange={handleSelectChange}
//                   filterOption={(input, option) =>
//                     (option?.label ?? "")
//                       .toLowerCase()
//                       .includes(input.toLowerCase())
//                   }
//                   dropdownStyle={{ zIndex: 10000 }} // z-index qiymati yuqori qilib qo'yildi
//                   options={data.map((item) => ({
//                     value: item.mijoz,
//                     label: item.mijoz,
//                   }))}
//                 />
//               </div>
//               <div style={{ marginTop: "10px" }}>
//                 <h1 style={{ marginBottom: "10px" }}>Telefon raqam</h1>
//                 <Card>
//                   {selectedCustomer && (
//                     <>
//                       <h3>{selectedCustomer.customNum}</h3>

//                       {customerNumbers.map((numbers: any, index: any) => (
//                         <Card style={{ padding: "20px" }}>
//                           <p key={index}>{numbers}</p>
//                         </Card>
//                       ))}
//                     </>
//                   )}
//                 </Card>
//               </div>
//               <div style={{ marginTop: "20px" }}>
//                 <p style={{ marginBottom: "10px" }}>Manzil</p>
//                 <Card>
//                   <p>Yunusobod t., Bog’ishamol 12, 34</p>
//                 </Card>
//               </div>
//               <div style={{ marginTop: "20px" }}>
//                 <Card>
//                   <MapContainer
//                     center={[41.2995, 69.2401]}
//                     zoom={14}
//                     style={{ height: "300px", width: "100%" }}
//                   >
//                     <TileLayer
//                       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     />
//                     {branches.map((branch, idx) => (
//                       <Marker
//                         key={idx}
//                         position={branch.position}
//                         icon={customIcon}
//                       >
//                         <Popup>
//                           <strong>{branch.name}</strong>
//                           <br />
//                           Egasi: {branch.owner}
//                           <br />
//                           Tel: {branch.phone}
//                         </Popup>
//                       </Marker>
//                     ))}
//                   </MapContainer>
//                 </Card>
//               </div>
//               <div>
//                 <Button
//                   onClick={() => handleAddProduct}
//                   style={{
//                     padding: "20px",
//                     borderRadius: "5px",
//                     background: "#20D472",
//                     marginTop: "20px",
//                     color: "white",
//                     width: "40%",
//                     border: "none",
//                   }}
//                 >
//                   Saqlash
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </Box>
//       </Drawer>
//     </div>
//   );
// }
// export default Buyurtmalar;

import React, { useState } from "react";
import DrawerManager from "../bars/drawer"; // To'g'ri yo'lni tekshiring

const Buyurtmalar2: React.FC = () => {
  const [drawerSize, setDrawerSize] = useState<"small" | "default" | "large">(
    "default"
  );

  // Drawer ochilish uchun funksiya
  const handleDrawerOpen = () => {
    console.log("Drawer opened");
  };

  // Drawer o'lchamini o'zgartirish uchun funksiyani qo'shish
  const openDrawer = () => {
    setDrawerSize("large");
  };

  return (
    <div>
      {/* <DrawerManager onDrawerOpen={handleDrawerOpen} drawerSize={drawerSize} />
      <button onClick={openDrawer}>Set Drawer Size to Large</button> */}
    </div>
  );
};

export default Buyurtmalar2;
