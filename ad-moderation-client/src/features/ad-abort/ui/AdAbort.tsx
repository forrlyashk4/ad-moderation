import type { UseMutateFunction } from "@tanstack/react-query";
import { Button, Form, Input, Modal, Radio } from "antd";
import type {
  POSTAdActionRequest,
  POSTAdActionResponse,
} from "../../../entities/ad/api";
import { useState } from "react";

export default function AdAbort({
  id,
  title,
  mutateFn,
  actionName,
}: {
  id: number;
  title: string;
  mutateFn: UseMutateFunction<POSTAdActionResponse, Error, POSTAdActionRequest>;
  actionName: "reject" | "request-changes";
}) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      mutateFn({
        id,
        action: actionName,
        body: { reason: values.reason, comment: values.comment },
      });
      setOpen(false);
      form.resetFields();
    } catch {
      // todo: ответить что-то, если валидация не проходит
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="filled"
        color={actionName === "reject" ? "danger" : "orange"}
        size="large"
      >
        {title}
      </Button>
      <Modal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={open}
        onOk={onSubmit}
        onCancel={() => setOpen(false)}
        okText="Отправить"
        cancelText="Отмена"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="reason"
            label="Выберите причину"
            rules={[{ required: true, message: "Выберите одну причину" }]}
          >
            <Radio.Group vertical>
              <Radio value="Запрещенный товар">Запрещенный товар</Radio>
              <Radio value="Неверная категория">Неверная категория</Radio>
              <Radio value="Некорректное описание">Некорректное описание</Radio>
              <Radio value="Проблемы с фото">Проблемы с фото</Radio>
              <Radio value="Подозрение на мошенничество">
                Подозрение на мошенничество
              </Radio>
              <Radio value="Другое">Другое</Radio>
              {/* todo: рендер вот этого списка нужно как-то сделать без хардкода названий причин */}
            </Radio.Group>
          </Form.Item>

          <Form.Item name="comment" label="Комментарий">
            <Input.TextArea
              rows={3}
              placeholder="Комментарий (необязательно)"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
