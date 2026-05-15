import Header from "../components/Header";
import SelectSection from "../components/SelectSection";
import SessionsList from "../components/SessionsList";

export default () => {
  return (
    <div className="">
      <Header />
      <div className="flex border-b-4">
        <div className=" border-r-4 w-[50%] p-10 pb-4 text-5xl font-extrabold flex flex-col">
          <span>Найди</span>
          <span>свою игру</span>
          <p className="w-[50%] text-sm font-medium pt-10">
            Исследуй открытые игры по d&d, vtm, coc и многим другим системам и
            занимай своё место за столом.
          </p>
        </div>
        <div className="w-[50%]">
          <div className="pt-4 px-2 flex justify-between">
            <SelectSection
              title="Жанр"
              default={{ id: 0, text: "Все жанры" }}
              path="/genre"
            />
            <SelectSection
              title="Система"
              default={{ id: 0, text: "Все системы" }}
              path="/system"
            />
            <SelectSection
              title="Компания"
              default={{ id: 0, text: "Все компании" }}
              path="/company_short"
            />
          </div>
        </div>
      </div>
        <SessionsList master={false}/>
    </div>
  );
};
