import { Spinner, Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { QuestionCard } from "../../components/Quiz/QuestionCard";
import Container from "../../components/ui/layout/Mainlayout/Container";
import { useGetQuizByModuleIdQuery } from "../../redux/features/quiz/quizApi";
import { useAppSelector } from "../../redux/hook";

type Tquiz = {
  _id: string;
  moduleId: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  marks: number;
};

const Quiz = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const { questionCurrentIndex, remainingTime } = useAppSelector(
    (state) => state.quiz
  );
  const { data: quizData, isLoading } = useGetQuizByModuleIdQuery(topicId!);

  //!Loading state
  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <Spinner className="h-16 w-16 text-gray-900/50" />
      </div>
    );
  }

  // Convert the remaining time from seconds to minutes and seconds
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <Container>
      <div className="w-full flex justify-end">
        <Typography
          placeholder={""}
          className="w-24 text-center text-2xl mr-20 bg-blue-100 rounded-md  p-2 font-sans font-semibold text-gray"
        >
          {minutes}:{seconds < 10 ? "0" : ""}
          {seconds}
        </Typography>
      </div>
      <div className="max-w-7xl mx-auto px-12 py-4">
        <div>
          {quizData?.data?.map(
            (queston: Tquiz, index: number) =>
              questionCurrentIndex === index && (
                <QuestionCard
                  key={index}
                  questionData={queston}
                  questionNumber={index}
                  quizLength={quizData?.data?.length}
                />
              )
          )}
        </div>
      </div>
    </Container>
  );
};

export default Quiz;
