import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";
import {
  addQuiz,
  resetQuizForm,
  resetQuizPublish,
  setQuizOptions,
} from "../../redux/features/quiz/quizSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useAddQuizMutation } from "../../redux/features/quiz/quizApi";

export function AddQuizFrom() {
  const dispatch = useAppDispatch();
  const { options, quiz } = useAppSelector((state) => state.quiz);
  const [createQuiz] = useAddQuizMutation();

  const { moduleTitle, moduleId } = useAppSelector((state) => state.module);
  const { register, handleSubmit, control, reset } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const qestionData = {
        moduleId,
        question: data?.question,
        options,
        correctAnswerIndex: Number(options.indexOf(data?.correctAnswer)),
        marks: 1,
      };
      dispatch(addQuiz(qestionData));
      //: reset form
      reset();
      dispatch(resetQuizForm());
    } catch (error) {
      toast.error("Failed to add question");
    }
  };

  const handlePublish = async () => {
    try {
      const response = await createQuiz(quiz).unwrap();
      console.log("response", response);
      toast.success(response.message);
      dispatch(resetQuizPublish());
    } catch (error) {
      toast.error("Failed to publish quiz");
    }
  };

  return (
    <Card
      placeholder={""}
      color="transparent"
      shadow={false}
      className="h-full"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 w-full ">
        <Typography
          placeholder={""}
          variant="h4"
          color="blue-gray"
          className="text-center my-2"
        >
          Module :{" "}
          <span className="bg-blue-500 text-white p-1 rounded">
            {moduleTitle}
          </span>
        </Typography>
        <Typography
          placeholder={""}
          color="gray"
          className="mt-1 font-semibold text-center my-2"
        >
          Add your quiz questions and options here
        </Typography>
        <Card
          placeholder={""}
          className="mb-1 flex flex-col gap-6 p-5 shadow-md shadow-blue-gray-400 rounded-sm"
          color="transparent"
          shadow={false}
        >
          <div>
            <Typography
              placeholder={""}
              variant="h6"
              color="blue-gray"
              className="mb-3"
            >
              Question
            </Typography>
            <Input
              {...register("question")}
              crossOrigin={false}
              size="lg"
              placeholder="Enter your question here"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 py-3">
            {/* options input  */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <Typography
                  placeholder={""}
                  variant="h6"
                  color="blue-gray"
                  className="mb-3"
                >
                  {`Option ${i + 1}`}
                </Typography>
                <Input
                  onBlur={(e) => {
                    dispatch(setQuizOptions(e.target.value));
                  }}
                  crossOrigin={false}
                  size="lg"
                  placeholder={`${i === 4 ? "Correct Answer" : "Enter Option"}`}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
            ))}
            {/* Correct Answer SELECTION */}
            <div>
              <Typography
                placeholder={""}
                variant="h6"
                color="blue-gray"
                className="mb-3"
              >
                Correct Answer
              </Typography>
              <Controller
                name="correctAnswer"
                control={control}
                render={({ field }) => (
                  <Select
                    placeholder=""
                    label="Select Correct Answer"
                    {...field}
                  >
                    {options.map((option, index) => (
                      <Option key={index} value={option} color="light-blue">
                        {option}
                      </Option>
                    ))}
                  </Select>
                )}
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-between gap-4">
          <Button
            type="submit"
            placeholder={""}
            className="mt-6"
            color="blue"
            size="lg"
            fullWidth
          >
            Add Question
          </Button>
          <Button
            placeholder={""}
            className="mt-6"
            color="blue"
            size="lg"
            fullWidth
            onClick={handlePublish}
          >
            Publish Quiz
          </Button>
        </div>
      </form>
    </Card>
  );
}
