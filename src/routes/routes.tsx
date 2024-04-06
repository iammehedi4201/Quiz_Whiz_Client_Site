import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashboardLayout from "../components/ui/layout/DashboardLayout/DashboardLayout";
import Home from "../pages/Home/Home";
import { LoginFrom } from "../pages/Login/LoginFrom";
import AddQuiz from "../pages/Admin/AddQuiz/AddQuiz";
import Quiz from "../pages/Quiz/Quiz";
import AddBlog from "../pages/Admin/AddQuiz/AddBlog";
import { Blog } from "../pages/Blog/Blog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "quiz/:topicId",
        element: <Quiz />,
      },
      {
        path: "blog/:moduleId",
        element: <Blog />,
      },
    ],
  },
  {
    path: "/adminDashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "addQuiz",
        element: <AddQuiz />,
      },
      {
        path: "addBlog",
        element: <AddBlog />,
      },
    ],
  },
  {
    path: "/adminLogin",
    element: <LoginFrom />,
  },
]);

export default router;
