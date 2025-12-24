import { FloatButton, Form, Input, Modal, Radio } from "antd";
import { useState } from "react";
import style from "./AdAbort.module.css";

export default function AdAbortFloat({
  icon,
  insetInlineEnd,
  actionName,
  handleAdAction,
  selectedIds,
}: {
  icon: React.ReactNode;
  insetInlineEnd: number;
  actionName: "approve" | "reject" | "request-changes";
  handleAdAction: (
    selectedIds: number[],
    actionName: "approve" | "reject" | "request-changes",
    reason:
      | "Запрещенный товар"
      | "Неверная категория"
      | "Некорректное описание"
      | "Проблемы с фото"
      | "Подозрение на мошенничество"
      | "Другое",
    comment?: string | undefined
  ) => Promise<void>;
  selectedIds: number[];
}) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const onSubmit = async () => {
    const values = await form.validateFields();
    handleAdAction(selectedIds, actionName, values.reason, values.comment);
    setOpen(false);
    form.resetFields();
  };

  return (
    <>
      <FloatButton
        onClick={() => setOpen(true)}
        icon={icon}
        className={style[`adAbortFloat--${insetInlineEnd}`]}
      />
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
