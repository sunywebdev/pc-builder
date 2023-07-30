import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
	return (
		<footer className='px-4 divide-y bg-white border-t-2 text-purple-700'>
			<div className='container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0'>
				<div className='lg:w-1/3'>
					<Link href='/' className='-m-1.5 p-1.5'>
						<div className={""}>
							<Image
								src='/logoPcBuilder.jpg'
								alt='Logo'
								height={30}
								width={150}
							/>
						</div>
					</Link>
				</div>
				<div className='grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4'>
					<div className='space-y-3'>
						<h3 className='tracki uppercase text-purple-700'>ABOUT US</h3>
						<ul className='space-y-1'>
							<li>
								<a rel='noopener noreferrer' href='#'>
									EMI Terms
								</a>
							</li>
							<li>
								<a rel='noopener noreferrer' href='#'>
									Privacy Policy
								</a>
							</li>
							<li>
								<a rel='noopener noreferrer' href='#'>
									Star Point Policy
								</a>
							</li>
							<li>
								<a rel='noopener noreferrer' href='#'>
									Brands
								</a>
							</li>
						</ul>
					</div>
					<div className='space-y-3'>
						<ul className='space-y-1'>
							<li>
								<a rel='noopener noreferrer' href='#'>
									About Us
								</a>
							</li>
							<li>
								<a rel='noopener noreferrer' href='#'>
									Terms of Service
								</a>
							</li>
							<li>
								<a rel='noopener noreferrer' href='#'>
									Blog
								</a>
							</li>
						</ul>
					</div>
					<div className='space-y-3'>
						<ul className='space-y-1'>
							<li>
								<a rel='noopener noreferrer' href='#'>
									Online Delivery
								</a>
							</li>
							<li>
								<a rel='noopener noreferrer' href='#'>
									Refund and Return Policy
								</a>
							</li>
							<li>
								<a rel='noopener noreferrer' href='#'>
									Contact Us
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className='py-6 text-sm text-center text-purple-900'>
				© 2023 by Pc Builder. All rights reserved.
			</div>
		</footer>
	);
};

export default Footer;
