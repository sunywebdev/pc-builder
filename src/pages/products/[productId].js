import Description from "@/components/Description";
import RelatedProduct from "@/components/RelatedProduct";
import Review from "@/components/Review";
import Specification from "@/components/Specification";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ProductDetails = ({ product }) => {
	const {
		id,
		Brand,
		Price,
		"Product Code": productCode,
		"Regular Price": regularPrice,
		Status,
		category,
		description,
		images,
		keyFeatures,
		name,
		rating,
		specification,
		related,
	} = product || {};

	const roundedRating = Math.round(rating);

	return (
		<>
			<Head>
				<title>Product Details | PC Builder</title>
			</Head>
			<main className=' mx-3 lg:mx-auto  max-w-7xl '>
				<section className='grid grid-cols-1 lg:grid-cols-2'>
					<div className=''>
						<div className='p-28'>
							<Image
								src={images}
								height={100}
								width={100}
								alt={name}
								layout='responsive'
							/>
						</div>
					</div>

					<div>
						<div className='lg:my-14'>
							<h2 className='text-2xl font-semibold text-purple-700'>{name}</h2>
							<div className='flex justify-start items-center my-2 text-sm flex-wrap'>
								<p className='bg-gray-100 py-1 px-3 m-1 rounded-full'>
									Price: {Price}
								</p>
								<p className='bg-gray-100 py-1 px-3 m-1 rounded-full'>
									<del> Regular Price: {regularPrice}</del>
								</p>
								<p className='bg-gray-100 py-1 px-3 m-1 rounded-full'>
									Status: {Status}
								</p>
								<p className='bg-gray-100 py-1 px-3 m-1 rounded-full'>
									Product Code: {productCode}
								</p>
								<p className='bg-gray-100 py-1 px-3 m-1 rounded-full'>
									Brand: {Brand}
								</p>
							</div>

							<div className='flex justify-start items-center font-bold'>
								<h2 className='text-xl font-semibold my-1'>{"Category: "}</h2>
								<p className='mx-2 p-2'>{category}</p>
							</div>

							<h2 className='text-xl font-semibold my-3 lg:my-6'>
								Key Features
							</h2>
							<div className='flex justify-start items-start my-2 text-sm flex-wrap flex-col'>
								{keyFeatures?.map((feature) => (
									<p key={feature} className=' pb-2 '>
										{feature}
									</p>
								))}
							</div>

							<div className='flex items-center'>
								<p>Rating </p>
								<div className='text-yellow-400 ml-2 flex items-center'>
									{[...Array(roundedRating)]?.map((_, index) => (
										<AiFillStar key={index} />
									))}
									{[...Array(Math.max(5 - roundedRating, 0))].map(
										(_, index) => (
											<AiOutlineStar key={index} />
										),
									)}
								</div>
							</div>

							<div className='lg:my-10  my-5'>
								<button className='py-3 px-10 rounded-md bg-purple-700 text-white'>
									Buy Now
								</button>
							</div>
						</div>
					</div>
				</section>

				<section className='my-10 grid grid-cols-1 lg:grid-cols-4 gap-4'>
					<div className='col-span-3 '>
						<Specification specification={specification} />

						<Description description={description} />

						<Review productId={id} />
					</div>

					<div className='rounded-md '>
						<div className=' mx-3'>
							<h3 className='text-center text-2xl font-semibold p-2'>
								Related Product
							</h3>

							<div className=''>
								{related?.map((product, i) => (
									<RelatedProduct key={i} product={product} />
								))}
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default ProductDetails;

export async function getStaticPaths() {
	if (typeof window !== "undefined") {
		return {
			props: {
				productsRes: [],
			},
		};
	}
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_NEXT_APP_URL}/api/products`,
		);
		const productsRes = await res.json();

		const productIds = productsRes?.data?.map((product) => ({
			params: { productId: product.id.toString() },
		}));

		return {
			paths: productIds,
			fallback: false,
		};
	} catch (error) {
		console.error("Error fetching data:", error);
		return {
			paths: [],
			fallback: false,
		};
	}
}

export async function getStaticProps({ params }) {
	const { productId } = params;
	if (typeof window !== "undefined") {
		return {
			props: {
				product: [],
			},
		};
	}

	try {
		const res = await fetch(
			`${
				process.env.NEXT_PUBLIC_NEXT_APP_URL
			}/api/products/${productId.toString()}`,
		);

		if (!res.ok) {
			throw new Error(`Fetch failed with status ${res.status}`);
		}

		const product = await res.json();

		return {
			props: {
				product: product?.data,
			},
			revalidate: 60,
		};
	} catch (error) {
		console.error("Error fetching data:", error);
		return {
			notFound: true,
		};
	}
}
