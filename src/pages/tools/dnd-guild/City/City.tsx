import { useEffect, useState } from "react";
import BuildingCard, { type BuildingData } from "./BuildingCard";
import axios from "axios";
import MainLayout from "../../../../components/MainLayout";
import { Card, Typography } from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";

interface CityData {
  billsCount: number;
  buildings: BuildingData[];
}

export default () => {
  const [cityData, setData] = useState<CityData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/city/data.json")
      .then((response) => setData(response.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>загрузко!</div>;
  }

  if (error) {
    return <div>Ошибко!</div>;
  }

  return (
    <MainLayout>
      <Card>
        <Typography>
          <Title>Город</Title>
          <Paragraph>
            Гильдия — это целая система различных организаций, взаимодействующих
            между собой. Гильдия платит ратуше, чтобы получать больше заказов,
            спонсирует ближайший трактир, чтобы наёмники могли в нём обедать,
            строит свои кузницы и тренировочные залы, чтобы повышать
            квалификацию своих наёмников.
          </Paragraph>
          <Paragraph>
            Для улучшения здания, принадлежащего или спонсируемого гильдией
            необходимо потратить купчие. Купчие – это документы на право
            собственности земли – как внутри города, так и на территории
            княжества. На выкупленной земле открываются новые филиалы, склады и
            производства, которые и позволяют качественно повысить уровень
            обслуживания.
          </Paragraph>
          <Paragraph>
            На этой странице вы можете ознакомиться с текущим состоянием города
            и узнать о текущий возможностях зданий.
          </Paragraph>
          <Paragraph>
            Доступно купчих: {cityData ? cityData.billsCount : -1}
          </Paragraph>
        </Typography>
      </Card>

      <div className="w-[90%] mx-auto my-4 flex items-end justify-between  gap-4 flex-wrap">
        {!cityData ? (
          <div>Ошибка загрузки</div>
        ) : (
          cityData.buildings.map((x) => <BuildingCard data={x} />)
        )}
      </div>
    </MainLayout>
  );
};
