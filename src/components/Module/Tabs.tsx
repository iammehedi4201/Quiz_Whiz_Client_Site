import { Square3Stack3DIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import React from "react";
import { ModuleCard } from "./ModuleCard";

export function TabsWithIcon() {
  const data = [
    {
      label: "Quiz Module",
      value: "quiz-module-value",
      icon: Square3Stack3DIcon,
      desc: <ModuleCard>Quiz Module </ModuleCard>,
    },
    { 
      label: "Add Quiz",
      value: "add-quiz-value",
      icon: UserCircleIcon,
      desc: <ModuleCard>Add Quiz Card</ModuleCard>,
    },
  ];
  return (
    <Tabs value="quiz-module-value">
      <TabsHeader placeholder={""}>
        {data.map(({ label, value, icon }) => (
          <Tab placeholder={""} key={value} value={value}>
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody placeholder={""}>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
