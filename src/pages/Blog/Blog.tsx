import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Spinner,
} from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useGetBlogByModuleIdQuery } from "../../redux/features/blog/blogApi";

type TBlog = {
  title: string;
  content: string;
  moduleId: string;
};

export function Blog() {
  const [open, setOpen] = React.useState(1);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  const { moduleId } = useParams();
  console.log(moduleId);

  const { data: blogs, isLoading } = useGetBlogByModuleIdQuery(moduleId);

  console.log(blogs?.data);

  //!Loading state
  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <Spinner className="h-16 w-16 text-gray-900/50" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-12 py-4">
      {blogs?.data?.map((blog: TBlog) => (
        <Accordion
          placeholder={""}
          open={open === 1}
          className="mb-2 rounded-lg border border-blue-gray-100 px-4"
        >
          <AccordionHeader
            placeholder={""}
            onClick={() => handleOpen(1)}
            className={`border-b-0 transition-colors text-3xl ${
              open === 1 ? "text-blue-500 hover:!text-blue-700" : ""
            }`}
          >
            {blog.title}
          </AccordionHeader>
          <AccordionBody className="pt-0 text-base font-normal">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </AccordionBody>
        </Accordion>
      ))}
    </div>
  );
}
