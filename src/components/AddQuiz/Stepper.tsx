import { Step, Stepper } from "@material-tailwind/react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setActiveStep } from "../../redux/features/stepper/stepperSlice";

type TStepperProps = {
  steps: {
    name: string;
    value: number;
    component: React.ReactNode;
  }[];
};
export function DefaultStepper({ steps }: TStepperProps) {
  const { activeStep } = useAppSelector((state) => state.stepper);
  const dispatch = useAppDispatch();
  return (
    <div className="w-full sm:py-4 sm:px-4">
      <Stepper placeholder={""} activeStep={activeStep} className="w-full">
        {steps?.map((step, index) => (
          <Step
            placeholder={""}
            key={index}
            onClick={() => dispatch(setActiveStep(step?.value))}
            className="cursor-pointer w-fit px-4 py-4 text-white rounded-md h-fit m-2 text-center  hover:bg-blue-600"
            style={{
              backgroundColor:
                activeStep === step?.value ? "#1a76c0" : "#2196f3",
            }}
          >
            {step?.name}
          </Step>
        ))}
      </Stepper>
      <div>{steps[activeStep]?.component}</div>
    </div>
  );
}
