import React, { useState, useMemo } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
    UnorderedListOutlined,
    LogoutOutlined,
    UserOutlined,
    SolutionOutlined,
    TruckOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Layout, Menu, message } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const LayoutAdmin = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const currentPath = location.pathname;

    const menuItems = useMemo(
        () => [
            {
                key: "/sale-staff",
                icon: <HomeOutlined />,
                label: <Link to="/sale-staff">Home</Link>,
            },
            {
                key: "/customer-request",
                icon: <UnorderedListOutlined />,
                label: <Link to="/customer-request">Customer Request</Link>,
            },
            {
                key: "/consulting-staff",
                icon: <SolutionOutlined />,
                label: <Link to="/consulting-staff">Consulting-staff</Link>,
            },
            {
                key: "/delivery-staff",
                icon: <TruckOutlined />,
                label: <Link to="/delivery-staff">Delivery-staff</Link>,
            },
            {
                key: "logout",
                icon: <LogoutOutlined />,
                label: "Log Out",
                style: { marginTop: "auto" },
                onClick: () => {
                    message.success("Logged out successfully");
                },
            },
        ],
        []
    );

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="avatar-container">
                    <Avatar size={64} icon={<UserOutlined />} />
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[currentPath]} // Đặt selectedKeys dựa theo route hiện tại
                    items={menuItems}
                />
            </Sider>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className="toggle-button border-none rounded-none rounded-tr-md rounded-br-xl bg-gray-300"
            />
            <Content className="content">{children}</Content>
        </Layout>
    );
};

export default LayoutAdmin;
