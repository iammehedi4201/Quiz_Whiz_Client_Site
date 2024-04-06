import { Button, Input } from "@material-tailwind/react";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useAddBlogMutation } from "../../redux/features/blog/blogApi";
import { addBlog } from "../../redux/features/blog/blogSlice";
import toast from "react-hot-toast";

const config = {
  readonly: false, // all options from https://xdsoft.net/jodit/doc/
  height: "500px",
  placeholder: "Start typing here...",
};

const AddBlogForm = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { moduleId } = useAppSelector((state) => state.module);
  const [createBlog] = useAddBlogMutation();
  const { blog } = useAppSelector((state) => state.blog);
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const blogData = {
      title: data.title,
      content: content,
      moduleId: moduleId,
    };
    dispatch(addBlog(blogData));
  };

  const handlePublishBlog = async () => {
    try {
      const response = await createBlog(blog).unwrap();
      console.log("response", response);
      toast.success(response.message);
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to publish blog");
    }
  };

  return (
    <div className="my-5 space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="w-full space-y-2">
          <label className="font-bold text-lg">Blog Title</label>
          <Input
            crossOrigin={""}
            label=""
            placeholder="Enter Your Blog Title"
            {...register("title")}
          />
        </div>
        <div className="space-y-2">
          <h1 className="font-bold text-lg">Blog Content</h1>
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>
        <div className="flex justify-center gap-5">
          <Button
            placeholder={""}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            size="lg"
            type="submit"
          >
            Add Blog
          </Button>
          <Button
            placeholder={""}
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            size="lg"
            onClick={handlePublishBlog}
          >
            Publish Blog
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddBlogForm;
