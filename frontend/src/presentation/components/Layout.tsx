import React from "react";
import { Layout as AntLayout } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import PeerPrepLogo from "../../assets/images/PeerPrepLogo.png";
import MatchingFloatingButton from "./buttons/MatchingFloatingButton";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Content, Header } = AntLayout;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate("/");
    };

    return (
        <AntLayout className={styles.layout}>
            <Header className={styles.header}>
                <img src={PeerPrepLogo} alt="PeerPrep Logo" width="7%" />
                {location.pathname !== "/" && (
                    <ArrowLeftOutlined onClick={handleBackClick} className={styles.backButton} />
                )}
            </Header>
            <Content className={styles.content}>
                {children}
                <MatchingFloatingButton />
            </Content>
        </AntLayout>
    );
};

export default Layout;
