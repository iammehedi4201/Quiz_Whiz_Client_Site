import { AddQuizFrom } from "../../../components/AddQuiz/AddQuizFrom";
import { SelectModule } from "../../../components/AddQuiz/SelectModule";
import SelectTopic from "../../../components/AddQuiz/SelectTopic";
import { DefaultStepper } from "../../../components/AddQuiz/Stepper";

const AddQuiz = () => {
  const steps = [
    {
      name: "Select Topic",
      value: 0,
      component: <SelectTopic />,
    },
    {
      name: "Select Module",
      value: 1,
      component: <SelectModule />,
    },
    {
      name: "Add Quiz",
      value: 2,
      component: (
        <div className="min-h-screen w-full">
          <AddQuizFrom />
        </div>
      ),
    },
  ];

  return (
    <div className="sm:py-10 sm:px-10 my-6">
      <DefaultStepper steps={steps} />
    </div>
  );
};

export default AddQuiz;
