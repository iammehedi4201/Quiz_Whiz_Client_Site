import { Spinner } from "@material-tailwind/react";
import { useGetTopicsQuery } from "../../redux/features/topic/topicApi";
import { TopicCardProps } from "../../types/TopicType";
import { TopicCard } from "./TopicCard";

const Topics = () => {
  const { data: topicsData, isLoading } = useGetTopicsQuery(undefined);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <Spinner className="h-16 w-16 text-gray-900/50" />
      </div>
    );
  }

  return (
    <div id="topic-section" className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
            >
              <defs>
                <pattern
                  id="ea469ae8-e6ec-4aca-8875-fc402da4d16e"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#ea469ae8-e6ec-4aca-8875-fc402da4d16e)"
                width="52"
                height="24"
              />
            </svg>
            <span className="relative">Quiz</span>
          </span>{" "}
          Topics
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          Select your Quiz topic from here
        </p>
      </div>
      <div className="grid gap-8 row-gap-10 lg:grid-cols-2">
        {topicsData?.data?.map((topic: TopicCardProps) => (
          <TopicCard key={topic._id} {...topic}></TopicCard>
        ))}
      </div>
    </div>
  );
};

export default Topics;
