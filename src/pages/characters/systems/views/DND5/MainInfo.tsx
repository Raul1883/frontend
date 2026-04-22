import FormInput from "../form/FormInput";

export default () => {
  return (
    <div className="border-2 p-2 h-fit">
      <FormInput name="name" className="text-2xl" />
      <FormInput name="class.name" label="Класс" />

      <FormInput
        name="class.level"
        type="number"
        className="w-10"
        label="Уровень"
      />
      <FormInput name="race" label="Раса" />
      <FormInput name="background" label="Предыстория" />
      <FormInput name="alignment" label="Мировозрение" />
    </div>
  );
};
