import FormInput from "../form/FormInput";
import FormTextArea from "../form/FormTextArea";

export default () => {
  //inventory: {
  //  weapon: string;
  //  armor: string;
  //  buff: string;
  //  questItems: string;
  //  other: string;
  //  currency: {
  //    cp: number;
  //    sp: number;
  //    gp: number;
  //    pp: number;
  //  };
  //};

  return (
    <div className="grid grid-cols-2 gap-4">
      <FormTextArea name="inventory.weapon" label="Оружие" />
      <FormTextArea name="inventory.armor" label="Доспехи" />
      <FormTextArea name="inventory.buff" label="Усиления" />
      <FormTextArea name="inventory.questItems" label="Сюжетное" />
      <FormTextArea name="inventory.other" label="Иное" />
      <div>
        <p>Монеты</p>
        <FormInput name="inventory.currency.cp" type="number" label="Медные" />
        <FormInput
          name="inventory.currency.sp"
          type="number"
          label="Серебряные"
        />
        <FormInput name="inventory.currency.gp" type="number" label="Золотые" />
        <FormInput
          name="inventory.currency.pp"
          type="number"
          label="Платиновые"
        />
      </div>
    </div>
  );
};
