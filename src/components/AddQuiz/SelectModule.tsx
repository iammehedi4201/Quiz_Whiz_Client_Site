import { Option, Select, Spinner, Typography } from "@material-tailwind/react";
import { useGetModulesByTopicIdQuery } from "../../redux/features/module/moduleApi";
import { setSelectedModule } from "../../redux/features/module/moduleSlice";
import { setActiveStep } from "../../redux/features/stepper/stepperSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";

type TModule = {
  _id: string;
  title: string;
  topicId: string;
};

type TSelectOption = {
  value: string;
  label: string;
};

export function SelectModule() {
  const { topicId } = useAppSelector((state) => state.topic);
  const { moduleId } = useAppSelector((state) => state.module);
  const { data: modules, isLoading } = useGetModulesByTopicIdQuery(topicId);

  const dispatch = useAppDispatch();

  const moduleOptions = modules?.data?.map((module: TModule) => ({
    value: module._id,
    label: module.title,
  }));

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <Spinner className="h-16 w-16 text-gray-900/50" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-[70vh] flex flex-col justify-center items-center shadow-md my-10">
      <Typography
        placeholder={""}
        variant="h4"
        color="blue-gray"
        className="text-center"
      >
        Select{" "}
        <span className="bg-blue-500 text-white p-1 rounded">Module</span>
      </Typography>
      <div className="w-full sm:w-1/2 p-5 my-5 ">
        <Select
          placeholder={""}
          label="Select Module"
          color="light-blue"
          size="lg"
          value={moduleId}
          onChange={(value) => {
            const moduleTitle = moduleOptions?.find(
              (option: TSelectOption) => option.value === value
            )?.label;
            dispatch(setSelectedModule({ moduleId: value, moduleTitle }));
            dispatch(setActiveStep(2));
          }}
        >
          {moduleOptions.length > 0 ? (
            moduleOptions?.map((option: TSelectOption) => (
              <Option
                key={option.value}
                value={option.value}
                color="light-blue"
              >
                {option.label}
              </Option>
            ))
          ) : (
            <Option disabled value="0">
              No Module Found
            </Option>
          )}
        </Select>
      </div>
    </div>
  );
}
