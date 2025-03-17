import React from "react";
import { Row, Col, Typography, Divider } from "antd";
import { YMaps, Map, Placemark } from "react-yandex-maps";

const { Title, Text } = Typography;

const ContactsPage: React.FC = () => {
  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Контакты</Title>
      <Divider />
      <Row gutter={[24, 24]}>
        {/* Блок с контактной информацией */}
        <Col xs={24} md={12}>
          <Title level={4}>Адрес</Title>
          <Text>420044, Казань, пр. Ямашева, д. 36д, офис 15</Text>
          <Divider />
          <Title level={4}>Телефон</Title>
          <Text>8 (843) 210-18-70</Text>
          <Divider />
          <Title level={4}>E-mail</Title>
          <Text>info@5kapitalov.ru</Text>
          <Divider />
          <Title level={4}>Время работы</Title>
          <Text>пн - пт: 9:00 - 18:00</Text>
        </Col>

        {/* Блок с картой */}
        <Col xs={24} md={12}>
          <YMaps>
            <Map
              defaultState={{ center: [55.796127, 49.106414], zoom: 15 }}
              width="100%"
              height="400px"
            >
              <Placemark geometry={[55.796127, 49.106414]} />
            </Map>
          </YMaps>
        </Col>
      </Row>
    </div>
  );
};

export default ContactsPage;
