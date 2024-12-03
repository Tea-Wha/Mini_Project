import HomeBrandImage from "./HomeBrandImage";



const HomeBrand = () => {
	const brandList = [
		{
			name: "HYUNDAI",
			image: "/testimages/001.png",
			link: "#"
		},
		{
			name: "KIA",
			image: "/testimages/genesis-kr-g80.jpg",
			link: "#"
		},
		{
			name: "PORSCHE",
			image: "/testimages/genesis-kr-g70.jpg",
			link: "#"
		},
		{
			name: "TESLA",
			image: "/testimages/genesis-kr-g90.jpg",
			link: "#"
		},
	]
	
	return (
		<>
			{brandList.map((brand) => (
				<HomeBrandImage key={brand.name} name={brand.name} image={brand.image} link={brand.link}/>
			))}
		</>
	)
}
export default HomeBrand;