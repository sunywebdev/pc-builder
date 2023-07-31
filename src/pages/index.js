import { Inter } from "next/font/google";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ productsRes }) {
	return (
		<>
			<Head>
				<title>PC Builder | Build Your Dream PC</title>
			</Head>
			<main className={`${inter.className}`}>
				<HeroSection />
				<FeaturedProducts products={productsRes?.data} />
			</main>
		</>
	);
}

export async function getStaticProps() {
	try {
		if (typeof window !== "undefined")
			return {
				props: {
					productsRes: [],
				},
			};

		const res = await fetch(`${process.env.NEXT_PUBLIC_NEXT_APP_URL}/api/home`);
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
			notFound: true,
		};
	}
}
