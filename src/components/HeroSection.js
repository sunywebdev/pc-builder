import Image from "next/image";

const HeroSection = () => {
	return (
		<div className={` bg-white mx-auto my-5 max-w-7xl z-0`}>
			<div className='max-w-screen-2xl mx-3 lg:mx-auto lg:flex gap-4 '>
				<div className='w-full rounded-md overflow-hidden'>
					<Image
						src={
							"https://www.startech.com.bd/image/cache/catalog/home/banner/free-delivery-on-app-may-home-banner-982x500.webp"
						}
						alt='budget-pc'
						height={100}
						width={100}
						layout='responsive'
					/>
				</div>
				<div className=' xl:w-2/5 border-[var(--clr-red)] rounded-md hover:border-[var(--clr-primary)] hidden xl:inline-block overflow-auto scrollbar-hide'>
					<div className=''>
						<div className='w-full text-center'>
							<Image
								src={
									"https://www.startech.com.bd/image/catalog/home/banner/budget-desktop-pc.webp"
								}
								height={100}
								width={100}
								layout='responsive'
								alt='budget-pc'
							/>
						</div>

						<div className='text-center my-5 text-xl font-bold'>
							<Image
								src={
									"https://www.startech.com.bd/image/cache/catalog/home/banner/express-delivery-home-banner-june-982x500.webp"
								}
								height={100}
								width={100}
								layout='responsive'
								alt='budget-pc'
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;
