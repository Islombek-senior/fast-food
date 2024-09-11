import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Segmented,
  Select,
  Space,
  Typography,
} from "antd";
import { FiPlus } from "react-icons/fi";
import axios from "axios";
import { Box, Drawer } from "@mui/material"; // MUI import
import { GoClock } from "react-icons/go";
import { CiBookmark, CiDeliveryTruck } from "react-icons/ci";
import { FiUser, FiPhone } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";
import { HiMenuAlt4, HiOutlineMenuAlt3 } from "react-icons/hi";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import defaultMarkerIcon from "leaflet/dist/images/marker-icon.png"; // Rename import
import defaultMarkerShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
// Standart marker ikonkasini to'g'ri sozlash
import "leaflet/dist/leaflet.css";
import Buyurtma from "../bars/bars";

const markerIcon = "path/to/marker-icon.png"; // Adjust the path as needed
const markerShadow = "path/to/marker-shadow.png"; // Adjust the path as needed

const customIcon = L.icon({
  iconUrl: defaultMarkerIcon, // Use renamed import
  shadowUrl: defaultMarkerShadow, // Use renamed import
  iconSize: [20, 34], // Adjusted size
  iconAnchor: [10, 34], // Adjusted anchor
  popupAnchor: [0, -30], // Adjusted popup anchor
  shadowSize: [30, 30], // Adjusted shadow size
});

// Filiallar ma'lumotlari
interface Branch {
  position: [number, number];
  owner: string;
  phone: string;
  name: string;
}

const branches: Branch[] = [
  {
    position: [41.2995, 69.2401],
    owner: "Asror Soliyev",
    phone: "+998991234567",
    name: "Maxway Filial 1",
  },
  {
    position: [41.3111, 69.2797],
    owner: "Shavkat Karimov",
    phone: "+998991234568",
    name: "Maxway Filial 2",
  },
  {
    position: [41.3134, 69.2826],
    owner: "Ali Akbarov",
    phone: "+998991234569",
    name: "Maxway Filial 3",
  },
  {
    position: [41.326543, 69.228495],
    owner: "Ali Akbarov",
    phone: "+998991234569",
    name: "Maxway Filial 4",
  },
];

interface Product {
  id: number;
  mijoz: string;
  customNum: string;
  orderSum: number;
  opName: string;
  filial: string;
}

interface Products {
  id: number;
  img: string;
  name: string;
  category: string;
  filters: number;
  price: number;
  quantity: number;
  qoshimcha: string;
}

interface DrawerManagerProps {
  onDrawerOpen: () => void;
  drawerSize: "small" | "default" | "large";
}

// Define the props for DrawerManager
interface DrawerManagerProps {
  onDrawerOpen: () => void;
  drawerSize: "small" | "default" | "large";
}

// DrawerManager component
const DrawerManager: React.FC<DrawerManagerProps> = ({
  onDrawerOpen,
  drawerSize,
}) => {
  const [open, setOpen] = useState(false);

  // Call the onDrawerOpen function when the component mounts
  useEffect(() => {
    if (open) {
      onDrawerOpen();
    }
  }, [open, onDrawerOpen]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer
        open={open}
        onClose={handleClose}
        variant="persistent"
        anchor="right"
        sx={{ width: drawerSize !== "large" ? 1000 : 1050 }}
      >
        {/* Drawer content */}
        <Button onClick={handleClose}>Close Drawer</Button>
      </Drawer>
    </>
  );
};

export default DrawerManager;
