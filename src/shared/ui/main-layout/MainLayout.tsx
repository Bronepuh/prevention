import React, { useState } from "react";
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
  MenuOutlined, // Иконка гамбургера
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Layout,
  Menu,
  theme,
  Button,
  Dropdown,
  Image,
  Flex,
  Typography,
  Drawer,
} from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./main-layput.module.scss";
import { useMediaQuery } from "@shared/hooks/useMediaQuery";
import ConsultationForm from "../consultation-form/ConsultationForm";

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography; // Импортируем Text из Typography

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Главная", "1", <PieChartOutlined />),
  getItem("Контакты", "2", <DesktopOutlined />),
  getItem("О компании", "sub1", <UserOutlined />, [
    getItem("О нас", "3"),
    getItem("Докуметы компании", "4"),
    getItem("Вопросы", "5"),
  ]),
  // getItem("Team", "sub2", <TeamOutlined />, [
  //   getItem("Team 1", "6"),
  //   getItem("Team 2", "8"),
  // ]),
  // getItem("Files", "9", <FileOutlined />),
];

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Используем хук useMediaQuery для определения ширины экрана
  const isMobile = useMediaQuery("(max-width: 550px)");

  // Состояние для управления видимостью выпадающего меню
  const [menuOpen, setMenuOpen] = useState(false);

  // Состояние для управления видимостью Drawer
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Обработчик для открытия/закрытия меню
  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  // Обработчик кликов по пунктам меню
  const handleMenuItemClick: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "1": // Главная
        navigate("/");
        break;
      case "2":
        navigate("/contacts");
        break;
      case "3":
        navigate("/about");
        break;
      case "4":
        navigate("/about/docs");
        break;
      case "5":
        navigate("/about/faq");
        break;
      // case "6": // Team 1
      //   navigate("/team/1");
      //   break;
      // case "8": // Team 2
      //   navigate("/team/2");
      //   break;
      // case "9": // Files
      //   navigate("/files");
      //   break;
      default:
        break;
    }
    setMenuOpen(false); // Закрываем выпадающее меню после выбора пункта
  };

  // Обработчик для открытия Drawer
  const showDrawer = () => {
    setDrawerVisible(true);
  };

  // Обработчик для закрытия Drawer
  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {isMobile ? (
        // Отображаем Header с гамбургер-меню на мобильных устройствах
        <Header
          style={{ display: "flex", alignItems: "center", padding: "0 16px" }}
        >
          <Flex className={styles.demoLogoVertical}>
            <Image src="./logo_prev_1.png" style={{ width: 40 }} />
          </Flex>
          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Dropdown
              menu={{ items, onClick: handleMenuItemClick }} // Передаем обработчик клика
              open={menuOpen} // Используем новый проп `open`
              onOpenChange={(open) => setMenuOpen(open)} // Используем новый проп `onOpenChange`
              placement="bottomRight"
              trigger={["click"]}
            >
              <Button
                type="text"
                icon={
                  <MenuOutlined style={{ color: "#fff", fontSize: "18px" }} />
                }
                onClick={handleMenuClick}
              />
            </Dropdown>
          </div>
        </Header>
      ) : (
        // Отображаем Sider на десктопах
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Flex className={styles.demoLogoVertical}>
            <Image
              style={{
                width: "100%",
              }}
              src="./logo_prev_1.png"
            />
          </Flex>
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            onClick={handleMenuItemClick} // Передаем обработчик клика
            style={{
              padding: "0 5px",
            }}
          />
        </Sider>
      )}
      <Layout>
        {/* Хедер с номером телефона */}
        <Header
          style={{
            background: colorBgContainer,
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text strong className={styles.tel}>
            +7 (993) 977-79-57
          </Text>
          <Button onClick={showDrawer}>Оплатить</Button>{" "}
          {/* Открываем Drawer */}
        </Header>
        <Content style={{ margin: "16px" }}>
          <div
            style={{
              padding: 0,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          "ООО Превенция" ©2025 Created by Bronepuh
        </Footer>
      </Layout>

      {/* Drawer с формой */}
      <Drawer
        // title="Консультация"
        placement="right"
        onClose={onCloseDrawer}
        open={drawerVisible}
        width={400} // Ширина Drawer
      >
        <ConsultationForm onCloseDrawer={onCloseDrawer} />
      </Drawer>
    </Layout>
  );
};

export default MainLayout;
