import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ProductCard = ({ product }) => {
	const { id, Price, images, name, rating, Status, category } = product || {};

	const roundedRating = Math.round(rating);

	return (
		<Link href={`/products/${id}`}>
			<div className='relative'>
				<div className='group relative border px-3 lg:h-[420px]  duration-300 hover:shadow-xl'>
					<div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md  lg:aspect-none group-hover:opacity-75 p-6 '>
						<Image
							src={images}
							alt={name}
							height={100}
							width={100}
							layout='responsive'
						/>
					</div>
					<div className='border-t py-2'>
						<h3 className=' text-purple-700'>
							<span aria-hidden='true' ></span>
							{name}
						</h3>

						<div className='flex justify-between w-full items-center my-2'>
							<p className=''>{Status}</p>
							<div className='flex items-center'>{category}</div>
						</div>
						<div className='flex justify-between w-full items-center'>
							<p className='text-xl font-bold text-purple-700'>{Price}</p>

							<div className='text-purple-700 flex items-center'>
								{[...Array(roundedRating)].map((_, index) => (
									<AiFillStar key={index} />
								))}
								{[...Array(Math.max(5 - roundedRating, 0))].map((_, index) => (
									<AiOutlineStar key={index} />
								))}
							</div>
						</div>
					</div>
				</div>
			</div>{" "}
		</Link>
	);
};

export default ProductCard;
