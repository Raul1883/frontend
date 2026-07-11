import { Card, Divider, Space, Typography } from "antd";
import { Link } from "react-router-dom";

export interface menuItem {
  title: string;
  path: string;
  description: string;
}

export interface menuProps {
  title?: string;
  menuItems: menuItem[];
}



export default (props: menuProps) => {
  return (
    <div>
      <div className=" p-8 ">

        {props.title && (
          <Divider>
            <Typography.Title>{props.title}</Typography.Title>
          </Divider>
        )}


        <Space size="large" className="w-full" wrap>
          {props.menuItems.map((item) => (
            <Card
              title={item.title}
              extra={<Link to={item.path}>Перейти</Link>}
              style={{ width: 300 }}
            >
              {item.description}
            </Card>
          ))}
        </Space>
      </div>
    </div>
  );
};
