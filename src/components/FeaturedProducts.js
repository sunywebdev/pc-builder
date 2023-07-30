import React from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";

const FeaturedProducts = ({ products }) => {
	return (
		<section>
			<div className='mx-auto  max-w-7xl my-14'>
				<div className='text-center'>
          <h2 className='text-2xl font-bold p-1 text-purple-700'>Featured Products</h2>
					<p>Check & Get Your Desired Product!</p>
				</div>

				<div className='bg-white'>
					<div className='px-2 '>
						<div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
							{products?.map((product) => (
								<ProductCard key={product.id} product={product} />
							))}
						</div>
					</div>
				</div>

				<div className='flex justify-center items-center my-10'>
					<Link href={"/products"}>
						<button className='px-6 py-3 bg-purple-700 hover:bg-gray-700 duration-300 rounded-md text-white font-bold'>
							See More
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default FeaturedProducts;
