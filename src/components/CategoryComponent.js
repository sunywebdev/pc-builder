import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrClose } from "react-icons/gr";
import { BsArrowRepeat } from "react-icons/bs";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const CategoryComponent = ({ category }) => {
  const { components } = useSelector((state) => state.pcBuild);

  const { logo, name, link } = category || {};

  const addedComponent = components.find(
    (product) => product.category === name
  );

  const roundedRating = Math.round(addedComponent?.rating);

  const dispatch = useDispatch();

  const componentRemoveHandelar = () => {
    dispatch(removeToBUild(addedComponent?.id));
  };

  return (
    <div className="flex justify-between items-center group my-3 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50 border">
      <div className=" relative flex items-center gap-x-6 ">
        {addedComponent ? (
          <Image
            src={addedComponent?.images}
            alt="componsnts"
            height={150}
            width={150}
          />
        ) : (
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white text-xl">
            {logo}
          </div>
        )}

        <div className="flex-auto">
          <Link href={link} className="block font-semibold text-purple-700">
            {name}
          </Link>
          <p className="font-bold text-red-500 py-2 rounded-full">Required</p>

          {addedComponent && (
            <>
              <Link
                href={`/products/${addedComponent?.id}`}
                className="block font-semibold text-sm lg:text-xl text-purple-700"
              >
                {addedComponent.name}
              </Link>

              <p>
                Brand:{" "}
                <span className="font-bold ml-1">{addedComponent.Brand}</span>
              </p>
              <div className="text-yellow-400 flex items-center">
                {[...Array(roundedRating)].map((_, index) => (
                  <AiFillStar key={index} />
                ))}
                {[...Array(Math.max(5 - roundedRating, 0))].map((_, index) => (
                  <AiOutlineStar key={index} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div>
        {!addedComponent ? (
          <Link
            href={link}
            className="text-xl font-bold py-3 px-6 text-white bg-purple-700 rounded-md"
          >
            Choose
          </Link>
        ) : (
          <div className="flex justify-center items-center flex-col">
              <p className="text-2xl font-bold p-2 my-2 text-purple-700">
              {addedComponent?.Price}
            </p>
            <div className="m-2 flex justify-center items-center text-2xl">
              <button
                onClick={componentRemoveHandelar}
                className="p-2 mx-3 bg-gray-100 rounded-md "
              >
                <GrClose />
              </button>

              <Link href={link} onClick={componentRemoveHandelar}>
                <button className="p-2 mx-3 bg-gray-100 rounded-md ">
                  <BsArrowRepeat />
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryComponent;
