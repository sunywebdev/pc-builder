import PcBuildHeader from "@/components/PcBuildHeader";
import { addToBuilder } from "@/redux/features/pc_build/pcBuildSlice";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

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
					<PcBuildHeader />
					<div>
						<div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
							{products?.map((product) => (
								<div key={product.id} className='relative'>
									<div className='group relative border p-3 h-100 duration-300 hover:shadow-xl'>
										<div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md  lg:aspect-none group-hover:opacity-75 p-6 '>
											<Image
												src={product.images}
												alt={product.name}
												height={100}
												width={100}
												layout='responsive'
											/>
										</div>
										<div className='border-t py-2'>
											<h3 className=' text-purple-700'>
												{product.name}
											</h3>

											<div className='flex justify-between w-full items-center my-2'>
												<p className=''>{product.Status}</p>
												<div className='flex items-center'>
													{product.category}
												</div>
											</div>
											<div className='flex justify-between w-full items-center'>
												<p className='text-xl font-bold text-purple-700'>
													{product.Price}
												</p>

												<div className='text-purple-700 flex items-center'>
													{[...Array(Math.round(product.rating))].map(
														(_, index) => (
															<AiFillStar key={index} />
														),
													)}
													{[
														...Array(
															Math.max(5 - Math.round(product.rating), 0),
														),
													].map((_, index) => (
														<AiOutlineStar key={index} />
													))}
												</div>
											</div>
										</div>{" "}
										<button
											onClick={() => productAddedHandelar(product)}
											className='text-xl font-semibold py-2 px-6 text-white bg-purple-700 rounded-md hover:bg-gray-400'
											style={{
												width: "-webkit-fill-available",
											}}>
											Add
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
			notFound: true, // Or handle the error gracefully based on your use case
		};
	}
}
