import { lazy } from "react";

// project import
import Loadable from "../Components/PageLoading/Loadable";
import AdminLayout from "../Layouts/AdminLayout/AdminLayout";

// render -

const AdminDashboard = Loadable(
  lazy(() => import("../Pages/AdminDashboard/AdminHomePage/AdminDashboard"))
);
const UsersPage2 = Loadable(
  lazy(() => import("../Pages/AdminDashboard/UsersPage/UsersPage2"))
);
const TesterPage = Loadable(
  lazy(() => import("../Pages/AdminDashboard/TesterPage/TesterPage"))
);
const EvaluationPage = Loadable(
  lazy(() => import("../Pages/AdminDashboard/EvaluationPage/EvaluationPage"))
);
const BadgesPage = Loadable(
  lazy(() => import("../Pages/AdminDashboard/BadgesPage/BadgesPage"))
);
const Categories = Loadable(
  lazy(() => import("../Pages/AdminDashboard/Categories/Categories"))
);
const FeedBacksPage = Loadable(
  lazy(() => import("../Pages/AdminDashboard/FeedBacksPage"))
);
// ==============================|| AUTH ROUTING ||============================== //

const AdminRoutes = {
  path: "/",
  element: <AdminLayout />,
  children: [
    {
      path: "adminDashboard",
      element: <AdminDashboard />,
    },
    {
      path: "users",
      element: <UsersPage2 />,
    },
    {
      path: "testers",
      element: <TesterPage />,
    },
    {
      path: "categories",
      element: <Categories />,
    },
    {
      path: "badges",
      element: <BadgesPage />,
    },
    {
      path: "evaluation",
      element: <EvaluationPage />,
    },
    {
      path: "FeedBacks",
      element: <FeedBacksPage />,
    },
  ],
};

export default AdminRoutes;
