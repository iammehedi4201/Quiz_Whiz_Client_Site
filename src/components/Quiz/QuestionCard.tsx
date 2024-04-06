/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useCheckQuizAnswerMutation } from "../../redux/features/quiz/quizApi";
import {
  setIsSubmitted,
  setQuestionCurrentIndex,
  setRemainingTime,
  setSubmitedAnswer,
} from "../../redux/features/quiz/quizSlice";
import { useAppSelector } from "../../redux/hook";
import useTimer from "../../hooks/useTimer";

type Tquiz = {
  _id: string;
  moduleId: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  marks: number;
};

export function QuestionCard({
  questionData,
  questionNumber,
  quizLength,
}: {
  questionData: Tquiz;
  questionNumber: number;
  quizLength: number;
}) {
  const { _id, question, options, moduleId, correctAnswerIndex } = questionData;
  const dispatch = useDispatch();

  //: Selectors to get the quiz state from the store
  const { submitedAnswer, isSubmitted, questionCurrentIndex, remainingTime } =
    useAppSelector((state) => state.quiz);
  //: State to store the selected option
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  //: Mutation to check the answer
  const [checkAnswer] = useCheckQuizAnswerMutation();

  //: Function to handle the submission of the answer
  const handleCheckAnswer = async () => {
    console.log("Hanlded Check Answer called");

    const response = await checkAnswer({
      moduleId: moduleId,
      submitedAnswer: submitedAnswer,
    }).unwrap();
    //: set submitted to true if the response is true
    if (response) {
      dispatch(setIsSubmitted(true));
      dispatch(setRemainingTime(0));
    }
  };

  //: Function to determine the color of each option after submitting the answer
  const getOptionColor = (index: number, isSubmitted: boolean) => {
    //: If the answer is not submitted, return an empty string
    if (!isSubmitted) return "";

    //: get the selected option index from the submitedAnswer array
    const selectedOptionIndex = submitedAnswer.find(
      (item) => item.questionId === _id
    )?.selectedOptionIndex;

    //: Check if the selected option is correct
    const isOptionCorrect = correctAnswerIndex === index;

    if (selectedOptionIndex !== undefined) {
      if (index === selectedOptionIndex) {
        //: Highlight selected option in red if it's incorrect
        if (!isOptionCorrect) return "bg-red-200";

        //: Highlight correct answer in green for incorrect answer questions
        // if (selectedOptionIndex !== correctAnswerIndex) return "bg-green-200";
      }

      //: Highlight correct answer in green for incorrect answer questions
      if (isOptionCorrect) return "bg-green-200";
    }
    //: Default color
    return "";
  };

  //: User Timer to show the remaining time
  useTimer(remainingTime, () => {
    if (remainingTime <= 1) {
      handleCheckAnswer();
      dispatch(setRemainingTime(0));
    } else {
      dispatch(setRemainingTime(remainingTime - 1));
    }
  });

  return (
    <div className="min-h-[80vh] flex items-center">
      <Card placeholder={""} className="mt-6 w-full">
        <CardBody placeholder={""}>
          <Typography
            placeholder={""}
            variant="h5"
            color="blue-gray"
            className="mb-2"
          >
            Question : {questionNumber + 1}
          </Typography>
          <Typography placeholder={""} className="font-bold">
            {question}
          </Typography>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 my-4">
            {options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 cursor-pointer shadow-md p-3 rounded-md  hover:shadow-lg transition duration-300 ease-in-out ${getOptionColor(
                  index,
                  isSubmitted
                )}`}
              >
                <Checkbox
                  crossOrigin={""}
                  value={option}
                  label={option}
                  checked={
                    submitedAnswer.find((item) => item.questionId === _id)
                      ?.selectedOptionIndex === index
                  }
                  //! if selectedOption is not null and selectedOption is not equal to index then disable the checkbox
                  disabled={selectedOption !== null && selectedOption !== index}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setSelectedOption(isChecked ? index : null);
                    dispatch(
                      setSubmitedAnswer({
                        questionId: _id,
                        selectedOptionIndex: index,
                        checked: isChecked,
                      })
                    );
                  }}
                />
              </div>
            ))}
          </div>
        </CardBody>
        <CardFooter placeholder={""} className="flex justify-end gap-5">
          {questionNumber > 0 && (
            <Button
              placeholder={""}
              color="blue"
              onClick={() => {
                dispatch(setQuestionCurrentIndex(questionNumber - 1));
              }}
            >
              Previous
            </Button>
          )}

          {(Number(questionCurrentIndex) < quizLength - 1 && (
            <Button
              placeholder={""}
              color="blue"
              onClick={() => {
                dispatch(setQuestionCurrentIndex(questionNumber + 1));
              }}
            >
              Next
            </Button>
          )) || (
            <Button
              disabled={remainingTime === 0}
              placeholder={""}
              color="blue"
              onClick={handleCheckAnswer}
            >
              Submit
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
