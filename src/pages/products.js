import ProductCard from "@/components/ProductCard";
import React from "react";
import {
	BsFillCpuFill,
	BsFillMotherboardFill,
	BsBuildingAdd,
} from "react-icons/bs";
import { CgSmartphoneRam } from "react-icons/cg";
import { ImPower } from "react-icons/im";
import { FiMonitor } from "react-icons/fi";
import { LuHardDrive } from "react-icons/lu";
import { useRouter } from "next/router";
import Head from "next/head";

const Products = ({ productsRes }) => {
	const router = useRouter();
	const { query } = router;

	const categories = [
		{
			id: 1,
			name: "CPU/Processor",
			link: "/",
			logo: <BsFillCpuFill />,
		},
		{
			id: 2,
			name: "Motherboard",
			link: "/",
			logo: <BsFillMotherboardFill />,
		},
		{
			id: 3,
			name: "RAM",
			link: "/",
			logo: <CgSmartphoneRam />,
		},
		{
			id: 4,
			name: "Power Supply Unit",
			link: "/",
			logo: <ImPower />,
		},
		{
			id: 5,
			name: "Storage Device",
			link: "/",
			logo: <LuHardDrive />,
		},
		{
			id: 6,
			name: "Monitor",
			link: "/",
			logo: <FiMonitor />,
		},
		{
			id: 7,
			name: "Other",
			link: "/",
			logo: <BsBuildingAdd />,
		},
	];

	const products = productsRes?.data;

	return (
		<>
			<Head>
				<title>Products | PC Builder</title>
			</Head>
			<section>
				<div className='mx-auto  max-w-7xl my-14'>
					<div className='text-center'>
						<h2 className='text-2xl font-bold p-1'>Featured Category</h2>
						<p>Get Your Desired Product from Featured Category!</p>
					</div>

					<div className='my-10 grid grid-cols-4 mx-2 gap-4 lg:grid-cols-7 '>
						{categories?.map((category) => {
							const { id, name, logo } = category || {};
							return (
								<button
									key={id}
									onClick={() =>
										router.push({
											pathname: "/products",
											query: { category: name },
										})
									}
									className={`flex flex-col justify-center items-center p-5 rounded-md border text-2xl shadow-md hover:text-[#EE4B23] duration-300 ${
										name === query?.category && "text-[#EE4B23]"
									}`}>
									{logo}
									<p className='font-bold text-sm p-1 '>{name}</p>
								</button>
							);
						})}
					</div>

					<div className='mt-10 px-2'>
						<div className='flex justify-between items-center bg-purple-700 p-2 text-white font-semibold rounded-md px-4'>
							<p>Categorise of {query?.category}</p>
						</div>
					</div>

					<div className='bg-white'>
						<div className='px-2 '>
							<div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
								{products?.map((product) => (
									<ProductCard key={product?.id} product={product} />
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Products;

export async function getServerSideProps(context) {
	const { query } = context;
	const category = query.category;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_NEXT_APP_URL}/api/products?category=${
				category ? category : "CPU%2FProcessor"
			}`,
		);
		if (!res.ok) {
			throw new Error("Fetch failed");
		}
		const productsRes = await res.json();

		return {
			props: {
				productsRes,
			},
		};
	} catch (error) {
		console.error("Error fetching data:", error);
		return {
			notFound: true, // Or handle the error gracefully based on your use case
		};
	}
}
