"use client";
import "../scss/footer.scss";
import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
const footer = () => {
  const platform = ["plans & pricing", "AL Data processing", "Enterprise"];
  const company = ["About us", "Blog & news"];
  const resource = ["Documentation", "Free Demo", "what's new"];
  const legal = [
    "Terms of Service",
    "Privacy Policy",
    "Cookies Policy",
    "Data Processing",
  ];
  return (
    <div className="!bg-black !text-white !w-[100vw] flex justify-center">
      <div className="!w-[min(1400px,85vw)]  px-[50px] py-[50px] flex flex-col gap-[30px]">
        <div className="w-full flex justify-between">
          <div className="flex gap-[50px]">
            <div className="flex flex-col gap-[15px]">
              <h1 className="text-lg font-[500]">Platform</h1>
              {platform.map((item, idx) => (
                <h2
                  className="text-md hover:text-white cursor-pointer font-[400] text-muted-foreground"
                  key={idx}
                >
                  {item}
                </h2>
              ))}
            </div>
            <div className="flex flex-col gap-[15px]">
              <h1 className="text-lg font-[500]">Company</h1>
              {company.map((item, idx) => (
                <h2
                  className="text-md hover:text-white cursor-pointer font-[400] text-muted-foreground"
                  key={idx}
                >
                  {item}
                </h2>
              ))}
            </div>
            <div className="flex flex-col gap-[15px]">
              <h1 className="text-lg font-[500]">Resouce</h1>
              {resource.map((item, idx) => (
                <h2
                  className="text-md hover:text-white cursor-pointer font-[400] text-muted-foreground"
                  key={idx}
                >
                  {item}
                </h2>
              ))}
            </div>
            <div className="flex flex-col gap-[15px]">
              <h1 className="text-lg font-[500]">Legal</h1>
              {legal.map((item, idx) => (
                <h2
                  className="text-md font-[400] hover:text-white cursor-pointer text-muted-foreground"
                  key={idx}
                >
                  {item}
                </h2>
              ))}
            </div>
          </div>
          <div className="w-[270px] h-[160px] px-[17px] py-[17px] gap-5 flex flex-col border-[2px] rounded-2xl border-[#5d5d5d] bg-[#191919]">
            <div className="w-full flex justify-between items-center">
              <div className="flex gap-4">
                <div className="bg-white rounded-full flex justify-center items-center w-[37px] h-[37px]">
                  <Image
                    src="/images/Vlogo.png"
                    alt="qw"
                    width={28}
                    height={28}
                  />
                </div>
                <div className="flex flex-col mt-[-2px] gap-0.5">
                  <h2 className="text-sm font-[500]">Veriface</h2>
                  <p className="text-xs text-muted-foreground">@veriface.app</p>
                </div>
              </div>
              <FaTwitter size={20} color="white" />
            </div>
            <div className="w-full flex">
              <h2 className="text-justify text-sm font-[460]">
                New UI update is on the way , the model has been changes to v2.0
                which has 89% accuracy.
              </h2>
            </div>
          </div>
        </div>
        <Separator className="my-3 h-[3px] w-full" />
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center select-none">
            <Image src="/images/Vlogo.png" alt="qw" width={35} height={35} />
            <p className="text-md">Veriface, 2024.</p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="rounded-full w-[42px] cursor-pointer hover:bg-accent h-[42px] flex justify-center items-center border-[2px] border-[#5d5d5d] bg-[#191919]">
              <FaGithub size={18} color="white" />
            </div>
            <div className="rounded-full w-[42px] cursor-pointer hover:bg-accent h-[42px] flex justify-center items-center border-[2px] border-[#5d5d5d] bg-[#191919]">
              <RiInstagramFill size={18} color="white" />
            </div>
            <div className="rounded-full w-[42px] cursor-pointer hover:bg-accent h-[42px] flex justify-center items-center border-[2px] border-[#5d5d5d] bg-[#191919]">
              <FaTwitter size={18} color="white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default footer;
