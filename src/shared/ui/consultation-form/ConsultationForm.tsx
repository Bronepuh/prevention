import { useState } from "react";
import { Form, Input, Button, Typography, notification } from "antd";
import emailjs from "emailjs-com";

const { Text } = Typography;
const { TextArea } = Input;

type FormProps = {
  onCloseDrawer: () => void;
};

const ConsultationForm = ({ onCloseDrawer }: FormProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Используем notification.useNotification()
  const [api, contextHolder] = notification.useNotification();

  // Обработчик отправки формы
  const onFinish = (values: any) => {
    const { name, phone, message: userMessage } = values;

    // Объединяем телефон и сообщение в одну переменную
    const combinedMessage = `Телефон: ${phone}\n\nСообщение:\n${userMessage}`;

    // Параметры для EmailJS
    const templateParams = {
      to_email: "darckday2007@mail.ru", // Email получателя
      from_name: name, // Имя отправителя
      message: combinedMessage, // Сообщение с телефоном
      time: new Date().toLocaleString("ru-RU", {
        // Время отправки
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setLoading(true); // Включаем лоадер

    // Отправка письма через EmailJS
    emailjs
      .send(
        "service_n145s5a", // Замените на ваш Service ID
        "template_4r8hvi1", // Замените на ваш Template ID
        templateParams,
        "PQjRN2y_6UH_EUBCM" // Замените на ваш User ID
      )
      .then(
        (response) => {
          console.log("Письмо успешно отправлено!", response);

          // Уведомление об успешной отправке
          api.success({
            message: "Заявка успешно отправлена!",
            description: "Мы свяжемся с вами в ближайшее время.",
            placement: "topRight", // Уведомление в правом верхнем углу
          });

          form.resetFields(); // Очистить форму
          onCloseDrawer(); // Закрыть Drawer
        },
        (error) => {
          console.error("Ошибка при отправке письма:", error);

          // Уведомление об ошибке
          api.error({
            message: "Ошибка при отправке заявки",
            description:
              "Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.",
            placement: "topRight", // Уведомление в правом верхнем углу
          });
        }
      )
      .finally(() => {
        setLoading(false); // Выключаем лоадер в любом случае
      });
  };

  return (
    <>
      {/* Контекст для уведомлений */}
      {contextHolder}

      {/* Форма */}
      <Form form={form} onFinish={onFinish} layout="vertical">
        {/* Заголовок формы */}
        <Text
          strong
          style={{ fontSize: "18px", display: "block", marginBottom: "16px" }}
        >
          Консультация
        </Text>
        <Text style={{ display: "block", marginBottom: "24px" }}>
          Наши специалисты помогут вам решить любой вопрос. Просто позвоните или
          оставьте заявку.
        </Text>

        {/* Поле для имени */}
        <Form.Item
          label="Ваше имя"
          name="name"
          rules={[{ required: true, message: "Пожалуйста, введите ваше имя" }]}
        >
          <Input placeholder="Введите ваше имя" />
        </Form.Item>

        {/* Поле для телефона */}
        <Form.Item
          label="Телефон"
          name="phone"
          rules={[
            { required: true, message: "Пожалуйста, введите ваш телефон" },
            {
              pattern: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
              message: "Введите телефон в формате +7 (XXX) XXX-XX-XX",
            },
          ]}
        >
          <Input placeholder="+7 (___) ___ - __ - __" />
        </Form.Item>

        {/* Поле для сообщения */}
        <Form.Item
          label="Сообщение"
          name="message"
          rules={[
            { required: true, message: "Пожалуйста, введите ваше сообщение" },
          ]}
        >
          <TextArea
            placeholder="Введите ваше сообщение"
            rows={4}
            style={{ resize: "none" }}
          />
        </Form.Item>

        {/* Текст с согласием */}
        <Text
          type="secondary"
          style={{ display: "block", marginBottom: "24px" }}
        >
          Нажимая кнопку «Отправить», вы даете согласие на обработку ваших
          персональных данных.
        </Text>

        {/* Кнопка отправки */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading} // Добавляем лоадер
            disabled={loading} // Задизабливаем кнопку
          >
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ConsultationForm;
