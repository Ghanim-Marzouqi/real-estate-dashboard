import Dashboard from "views/pages/Dashboard.js";
import Data from "views/pages/Data.js";
import Users from "views/pages/Users.js";

var adminRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/data",
    name: "Data",
    icon: "ni ni-bullet-list-67 text-red",
    component: Data,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "User Management",
    icon: "ni ni-single-02 text-blue",
    component: Users,
    layout: "/admin",
  },
];

const userRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/data",
    name: "Data",
    icon: "ni ni-bullet-list-67 text-red",
    component: Data,
    layout: "/admin",
  }
];

export { adminRoutes, userRoutes };
