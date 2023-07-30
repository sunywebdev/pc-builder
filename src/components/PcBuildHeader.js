import React from "react";
import { useSelector } from "react-redux";

const PcBuildHeader = () => {
	const { components } = useSelector((state) => state.pcBuild);

	const totalPrice = components.reduce((total, product) => {
		const numericPrice = parseFloat(product?.Price?.replace(/৳|,/g, ""));

		return total + numericPrice;
	}, 0);

	return (
		<div className='flex justify-between bg-white p-3 border-b'>
			<h2 className='p-3 text-xl font-semibold text-center  '>
				PC Builder - Build Your Own Computer
			</h2>

			<div>
				<button className='py-2 px-12 text-white bg-purple-700 rounded-md flex justify-center items-center flex-col'>
					<span className='font-bold text-xl'>Total: {totalPrice} TK</span>
					<span className='font-semibold'>{components?.length} Items</span>
				</button>
			</div>
		</div>
	);
};

export default PcBuildHeader;
