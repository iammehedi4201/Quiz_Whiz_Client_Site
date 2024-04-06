import { Option, Select, Spinner, Typography } from "@material-tailwind/react";
import { useGetTopicsQuery } from "../../redux/features/topic/topicApi";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setActiveStep } from "../../redux/features/stepper/stepperSlice";
import { setSelectedTopic } from "../../redux/features/topic/topicSlice";

type TTopic = {
  _id: string;
  title: string;
};

type TTopicOption = {
  value: string;
  label: string;
};

const SelectTopic = () => {
  const { data, isLoading } = useGetTopicsQuery("");
  const { topicId } = useAppSelector((state) => state.topic);
  console.log("topicId", topicId);
  
  const dispatch = useAppDispatch();

  const topicOptions = data?.data?.map((topic: TTopic) => ({
    value: topic._id,
    label: topic.title,
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
        Select <span className="bg-blue-500 text-white p-1 rounded">Topic</span>
      </Typography>
      <div className="w-full sm:w-1/2 p-5 my-5 ">
        <Select
          placeholder={""}
          label="Select Topic"
          color="light-blue"
          size="lg"
          value={topicId}
          onChange={(value) => {
            dispatch(setSelectedTopic({ topicId: value }));
            dispatch(setActiveStep(1));
          }}
        >
          {topicOptions?.map((option: TTopicOption) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default SelectTopic;
