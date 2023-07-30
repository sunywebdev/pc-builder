import React from "react";
import { BsFillCpuFill, BsFillMotherboardFill } from "react-icons/bs";
import { CgSmartphoneRam } from "react-icons/cg";
import { ImPower } from "react-icons/im";
import { FiMonitor } from "react-icons/fi";
import { LuHardDrive } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import CategoryComponent from "@/components/CategoryComponent";
import BuildComponent from "@/components/BuildComponent";
import PcBuildHeader from "@/components/PcBuildHeader";
import swal from "sweetalert";
import { removeALlBuildComponents } from "@/redux/features/pc_build/pcBuildSlice";
import Head from "next/head";

const PcBuilder = () => {
  const { components } = useSelector((state) => state.pcBuild);
  const dispatch = useDispatch();

  const categories = [
    {
      id: 1,
      name: "CPU/Processor",
      link: "/choose?category=CPU/Processor",
      logo: <BsFillCpuFill />,
    },
    {
      id: 2,
      name: "Motherboard",
      link: "/choose?category=Motherboard",
      logo: <BsFillMotherboardFill />,
    },
    {
      id: 3,
      name: "RAM",
      link: "/choose?category=RAM",
      logo: <CgSmartphoneRam />,
    },
    {
      id: 4,
      name: "Power Supply Unit",
      link: "/choose?category=Power Supply Unit",
      logo: <ImPower />,
    },
    {
      id: 5,
      name: "Storage Device",
      link: "/choose?category=Storage Device",
      logo: <LuHardDrive />,
    },
    {
      id: 6,
      name: "Monitor",
      link: "/choose?category=Monitor",
      logo: <FiMonitor />,
    },
  ];

  const pcBuildHandelar = () => {
    dispatch(removeALlBuildComponents());

    swal("Success", "Your PC Build Order Created Successfully!", "success");
  };

  return (
    <>
      <Head>
        <title>Build Your Dream PC | PC Builder</title>
      </Head>

      <section>
        <div className="mx-auto  max-w-7xl my-10  shadow-sm  rounded-md border">
          <PcBuildHeader />
          <div>
            <div
              className={` z-10 overflow-hidden  bg-white m-4 shadow-lg ring-1 ring-gray-900/5`}
            >
              <div className="p-4">
                {categories?.map((category) => {
                  const { id, name, link } = category || {};

                  const addedComponent = components.find(
                    (product) => product.category === name
                  );

                  return addedComponent ? (
                    <BuildComponent
                      key={id}
                      product={addedComponent}
                      link={link}
                    />
                  ) : (
                    <CategoryComponent key={id} category={category} />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="my-10 text-center">
            <button
              onClick={pcBuildHandelar}
              disabled={components?.length !== 6}
              className={` ${
                components.length === 6 ? "bg-black" : "bg-black/40"
              } py-3 px-6 text-white rounded-md font-bold `}
            >
              Build Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default PcBuilder;
