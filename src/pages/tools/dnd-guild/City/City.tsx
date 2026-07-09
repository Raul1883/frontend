import { useEffect, useState } from "react";
import Header from "../../../../components/Header";
import BuildingCard, { type buildingData } from "./BuildingCard";
import axios from "axios";

interface CityData {
  billsCount: number;
  buildings: buildingData[];
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
    <div className="bg-gray-200 flex flex-col min-h-screen">
      <Header />
      <div className="w-[80%] mx-auto mt-4 p-6 bg-white rounded-md">
        <h1 className="text-3xl font-bold mb-4">Город</h1>
        <p className="mb-2">
          Гильдия — это целая система различных организаций, взаимодействующих
          между собой. Гильдия платит ратуше, чтобы получать больше заказов,
          спонсирует ближайший трактир, чтобы наёмники могли в нём обедать,
          строит свои кузницы и тренировочные залы, чтобы повышать квалификацию
          своих наёмников.
        </p>
        <p className="mb-2">
          Для улучшения здания, принадлежащего или спонсируемого гильдией
          необходимо потратить купчие. Купчие – это документы на право
          собственности земли – как внутри города, так и на территории
          княжества. На выкупленной земле открываются новые филиалы, склады и
          производства, которые и позволяют качественно повысить уровень
          обслуживания.
        </p>
        <p className="mb-2">
          На этой странице вы можете ознакомиться с текущим состоянием города и
          узнать о текущий возможностях зданий.
        </p>
        <p className="font-bold">
          Доступно купчих: {cityData ? cityData.billsCount : -1}
        </p>
      </div>

      <div className="w-[90%] mx-auto my-4 flex items-end justify-between  gap-4 flex-wrap">
        {!cityData ? (
          <div>Ошибка загрузки</div>
        ) : (
          cityData.buildings.map((x) => <BuildingCard data={x} />)
        )}
      </div>
    </div>
  );
};
