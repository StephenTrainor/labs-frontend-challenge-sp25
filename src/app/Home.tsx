import Nav from "../components/Nav";
import Courses from "../components/Courses";

function Home() {
	return (
		<div
			className={"w-[22rem] md:w-[42rem] lg:w-[62rem] xl:w-[82rem] mx-auto mt-4 md:p-2 space-y-4"}
		>
			<Nav />
			<Courses />
		</div>
	);
}

export default Home;
