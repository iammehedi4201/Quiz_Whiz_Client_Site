import {
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import {
  Bars2Icon,
  CubeTransparentIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  MobileNav,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      {/* profile menu */}
      <MenuHandler>
        <Button
          placeholder={""}
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            placeholder={""}
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList placeholder={""} className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              placeholder={""}
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                placeholder={""}
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

// nav list component
const navListItems = [
  {
    label: "Home",
    icon: HomeIcon,
    route: "/",
  },
  {
    label: "Topics",
    icon: CubeTransparentIcon,
    route: "topic-section",
  },
  {
    label: "Blog",
    icon: ChatBubbleLeftRightIcon,
    route: "blog-section",
  },
];

function NavList() {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon, route }) => (
        <Typography
          placeholder={""}
          key={label}
          as="a"
          href="#"
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500"
        >
          {route === "/" ? (
            <NavLink to={route} className="text-black">
              {label}
            </NavLink>
          ) : (
            <Link
              activeClass="active"
              to={route}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              <MenuItem
                placeholder={""}
                className="flex items-center gap-2 lg:rounded-full text-black"
              >
                {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
                <span className="text-black"> {label}</span>
              </MenuItem>
            </Link>
          )}
        </Typography>
      ))}
      <Button placeholder={""} size="sm" variant="text">
        <span className="text-black">Log In</span>
      </Button>
      <ProfileMenu />
    </ul>
  );
}

export function MainNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <div className="w-full block  backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80 border border-white/80 bg-white text-white mx-auto p-2 lg:pl-6">
      <Navbar
        placeholder={""}
        className="mx-auto p-2 lg:pl-6"
        color="white"
        style={{
          boxShadow: "none",
        }}
      >
        <div className="relative mx-auto flex items-center justify-between text-black">
          <Typography
            placeholder={""}
            as="a"
            href="#"
            className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
          >
            <h3 className="text-2xl font-bold">
              Quiz
              <span className="bg-blue-500 text-white p-1 rounded">Whiz</span>
            </h3>
          </Typography>
          <div className="hidden lg:block">
            <NavList />
          </div>
          <IconButton
            placeholder={""}
            size="sm"
            color="green"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>
        </div>
        <MobileNav open={isNavOpen} className="overflow-scroll ">
          <NavList />
        </MobileNav>
      </Navbar>
    </div>
  );
}
