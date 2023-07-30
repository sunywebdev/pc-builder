import { addToBuilder } from "@/redux/features/pc_build/pcBuildSlice";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";

const Choose = ({ products }) => {
	const router = useRouter();

	const dispatch = useDispatch();

	const productAddedHandelar = (productInfo) => {
		dispatch(addToBuilder(productInfo));

		router.push("/pc_builder");
	};

	return (
		<>
			<Head>
				<title>Choose Components | PC Builder</title>
			</Head>
			<section>
				<div className='mx-auto  max-w-7xl my-10  shadow-sm  rounded-md border'>
					<div className='flex justify-between bg-white p-3'>
						<h2 className='p-3 text-xl font-semibold text-center  border-b'>
							Build Your Own Dream PC
						</h2>

						<div>
							<button className='py-2 px-12 text-white bg-black rounded-md flex justify-center items-center flex-col'>
								<span className='font-bold text-xl'>7000tk</span>
								<span className='font-semibold'>1 Items</span>
							</button>
						</div>
					</div>

					<div>
						<div
							className={` z-10 overflow-hidden  bg-white m-4 shadow-lg ring-1 ring-gray-900/5`}>
							{products?.map((product) => (
								<div
									key={product?.id}
									className='flex justify-between flex-col lg:flex-row items-center group my-3 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50 border'>
									<div className=' relative flex flex-col lg:flex-row items-center gap-x-6 '>
										<div className='flex flex-none items-center justify-center rounded-lg bg-gray-50 w-[200px] group-hover:bg-white text-xl'>
											<Image
												src={product?.images}
												alt={product?.name}
												width={100}
												height={100}
												layout='responsive'
											/>
										</div>
										<div className='flex-auto'>
											<Link
												href={`/products/${product.id}`}
												className='block font-semibold text-sm lg:text-xl text-gray-900'>
												{product.name}
												<span className='absolute inset-0'></span>
											</Link>

											{product?.keyFeatures?.map((features) => (
												<p key={features} className='mt-1 text-gray-600'>
													<span>*</span> {features}
												</p>
											))}
										</div>
									</div>

									<div className='flex justify-center items-center flex-col'>
										<p className='text-2xl font-bold p-2 my-2 text-[#EE4B23]'>
											{product?.Price}
										</p>
										<button
											onClick={() => productAddedHandelar(product)}
											className='text-xl font-semibold lg:font-bold py-3 px-6 text-white bg-black rounded-md'>
											Add To Builder
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Choose;

export async function getServerSideProps(context) {
	const { query } = context;
	const category = query.category;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_NEXT_APP_URL}/api/products?category=${category}`,
		);
		if (!res.ok) {
			throw new Error("Fetch failed");
		}
		const productsRes = await res.json();

		return {
			props: {
				products: productsRes?.data,
			},
		};
	} catch (error) {
		console.error("Error fetching data:", error);
		return {
			notFound: true, 
		};
	}
}
