import {
  Button,
  Input,
  Modal,
  Popover,
  Space,
  Typography,
  List,
  Flex,
} from "antd";
import useApp from "antd/es/app/useApp";
import dice from "/src/assets/dice-one.svg";
import { useState } from "react";

const { Text } = Typography;

export default () => {
  const { message } = useApp();
  const [d, setD] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);

  const addToHistory = (value: string) => {
    setHistory((prev) => [...prev, value]);
  };

  const roll = (d: number) => {
    const value = `d${d}: ${Math.floor(Math.random() * d) + 1}`;
    message.info(value);
    addToHistory(value);
  };

  const rollDNotation = (notation: string) => {
    const trimmed = notation.trim();
    if (!trimmed) {
      message.error("Введите нотацию, например 1d4");
      return;
    }

    const parts = trimmed.split("d");
    if (parts.length !== 2) {
      message.error("Некорректный формат. Используйте нотацию вида 2d6");
      return;
    }

    const countStr = parts[0];
    const dStr = parts[1];
    const count = parseInt(countStr, 10);
    const dVal = parseInt(dStr, 10);

    if (isNaN(count) || isNaN(dVal) || count <= 0 || dVal <= 0) {
      message.error(
        "Количество и количество граней должны быть положительными числами",
      );
      return;
    }

    const results: number[] = [];
    let sum = 0;
    for (let i = 0; i < count; i++) {
      const val = Math.floor(Math.random() * dVal) + 1;
      results.push(val);
      sum += val;
    }

    let value: string;
    if (count === 1) {
      value = `${count}d${dVal}: ${results[0]}`;
    } else {
      value = `${count}d${dVal}: [${results.join(", ")}] (сумма: ${sum})`;
    }
    message.info(value);
    addToHistory(value);
    setD(""); // очистка поля после броска
  };

  const clearHistory = () => {
    setHistory([]);
    message.success("История очищена");
  };

  return (
    <div>
      <Popover
        content={
          <Space vertical>
            <div>
              <Button onClick={() => roll(4)}>d4</Button>
              <Button onClick={() => roll(6)}>d6</Button>
              <Button onClick={() => roll(8)}>d8</Button>
              <Button onClick={() => roll(10)}>d10</Button>
              <Button onClick={() => roll(12)}>d12</Button>
              <Button onClick={() => roll(20)}>d20</Button>
              <Button onClick={() => setModal(true)}>История</Button>
            </div>

            <Space.Compact style={{ width: "100%" }}>
              <Input
                placeholder="Свой вариант в нотации 1d4"
                value={d}
                onChange={(e) => setD(e.target.value)}
                onPressEnter={() => rollDNotation(d)}
              />
              <Button
                onClick={() => rollDNotation(d)}
                icon={<img src={dice} alt="dice" />}
              />
            </Space.Compact>
          </Space>
        }
      >
        <Button>Кубики</Button>
      </Popover>

      <Modal
        open={modal}
        onCancel={() => setModal(false)}
        footer={
          <Flex justify="space-between">
            <Button onClick={clearHistory} danger>
              Очистить историю
            </Button>
            <Button type="primary" onClick={() => setModal(false)}>
              Закрыть
            </Button>
          </Flex>
        }
        title="История бросков"
        width={500}
      >
        {history.length === 0 ? (
          <Text type="secondary">Пока нет ни одного броска</Text>
        ) : (
          <List
            size="small"
            dataSource={history}
            renderItem={(item, index) => (
              <List.Item>
                <Text>
                  {index + 1}. {item}
                </Text>
              </List.Item>
            )}
            style={{ maxHeight: 400, overflow: "auto" }}
          />
        )}
      </Modal>
    </div>
  );
};
