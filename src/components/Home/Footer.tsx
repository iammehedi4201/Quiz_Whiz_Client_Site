import { Typography } from "@material-tailwind/react";

export function FooterWithLogo() {
  return (
   <div className="w-full bg-[#1f2937] p-8">
        <footer className="max-w-7xl bg-[#1f2937] p-8 mx-auto">
          <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-[#1f2937] text-center md:justify-between">
            <h3 className="text-2xl font-bold text-white">
              Quiz
              <span className="bg-blue-500 text-white p-1 rounded">Play</span>
            </h3>
            <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
              <li>
                <Typography
                  placeholder={""}
                  as="a"
                  href="#"
                  color="blue-gray"
                  className="font-normal transition-colors text-white"
                >
                  About Us
                </Typography>
              </li>
              <li>
                <Typography
                  placeholder={""}
                  as="a"
                  href="#"
                  color="blue-gray"
                  className="font-normal transition-colors text-white"
                >
                  License
                </Typography>
              </li>
              <li>
                <Typography
                  placeholder={""}
                  as="a"
                  href="#"
                  color="blue-gray"
                  className="font-normal transition-colors text-white"
                >
                  Contribute
                </Typography>
              </li>
              <li>
                <Typography
                  placeholder={""}
                  as="a"
                  href="#"
                  color="blue-gray"
                  className="font-normal transition-colors text-white"
                >
                  Contact Us
                </Typography>
              </li>
            </ul>
          </div>
          <hr className="my-8 border-blue-gray-50 text-white" />
          <Typography
            placeholder={""}
            color="blue-gray"
            className="text-center font-normal text-white"
          >
            &copy; 2023 Material Tailwind
          </Typography>
        </footer>
   </div>
  );
}
