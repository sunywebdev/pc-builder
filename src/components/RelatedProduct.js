import Image from "next/image";
import Link from "next/link";
import React from "react";

const RelatedProduct = ({ product }) => {
	const { id, name, Price, images } = product;
	return (
		<Link href={`/products/${id}`}>
			<div className='py-3 border-t flex bg-white shadow-md my-1 p-2'>
				<Image alt='related' height={80} width={80} src={images} />
				<div className='ml-2'>
					<p>{name}</p>
					<p className='font-bold text-purple-700'>{Price}</p>
				</div>
			</div>
		</Link>
	);
};

export default RelatedProduct;
