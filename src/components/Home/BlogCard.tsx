import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  DialogBody,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import { useGetModulesByTopicIdQuery } from "../../redux/features/module/moduleApi";
import { TopicCardProps } from "../../types/TopicType";

const BlogCard = ({ _id, title }: TopicCardProps) => {
  return (
    <Card placeholder={""} className="mt-6 w-96">
      <CardBody placeholder={""}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mb-4 h-12 w-12 text-gray-900 mx-auto"
        >
          <path
            fillRule="evenodd"
            d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
            clipRule="evenodd"
          />
          <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
        </svg>
        <Typography
          placeholder={""}
          variant="h5"
          color="blue-gray"
          className="mb-2 text-center"
        >
          {title}
        </Typography>
      </CardBody>
      <CardFooter placeholder={""} className="pt-0 mx-auto">
        <DialogDefault topicId={_id} />
      </CardFooter>
    </Card>
  );
};

export default BlogCard;

//! Modal code
export function DialogDefault({ topicId }: { topicId: string }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const { data: Topics, isLoading } = useGetModulesByTopicIdQuery(topicId);
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Button placeholder={""} onClick={handleOpen} className="bg-blue-500">
        Read Blog
      </Button>
      <Dialog placeholder={""} open={open} handler={handleOpen}>
        <DialogHeader placeholder={""} className="flex justify-center">
          Please Select Topic For Reading Blog
        </DialogHeader>
        <DialogBody placeholder={""}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {Topics?.data.length > 0 ? (
              Topics?.data?.map(
                (topic: { title: string; _id: string; topicId: string }) => (
                  <div key={topic._id} className="p-4 text-black rounded-md">
                    <main className="w-full ">
                      <div className="space-y-6 bg-gray-100 p-6 shadow-md ">
                        <header className="text-center text-lg font-extrabold text-gray-600">
                          {new Date().toLocaleDateString()}
                        </header>
                        <div>
                          <p className="text-center text-lg font-extrabold text-gray-900">
                            {topic.title}
                          </p>
                          <p className="text-center text-lg  font-extrabold text-blue-300">
                            15 min
                          </p>
                        </div>
                        <footer className="mb-10 flex justify-center">
                          <Link
                            to={`/blog/${topic._id}`}
                            className="flex items-baseline gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-xl font-bold text-white hover:bg-blue-700"
                          >
                            <span>Read Blog</span>
                          </Link>
                        </footer>
                      </div>
                    </main>
                  </div>
                )
              )
            ) : (
              <div>No Blog Option created Yet </div>
            )}
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
