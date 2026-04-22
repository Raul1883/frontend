import FormTextArea from "../form/FormTextArea";

export default () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <FormTextArea name="proficiencies" label="Владения" />
        <FormTextArea name="features" label="Черты" />
        <FormTextArea name="story" label="Предыстория" />
        <FormTextArea name="characters" label="Персонажи" />
        <FormTextArea name="locations" label="Локации" />
        <FormTextArea name="tasks" label="Текущие задачи" />
      </div>
    </div>
  );
};


