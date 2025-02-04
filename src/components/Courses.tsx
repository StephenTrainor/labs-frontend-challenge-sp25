import courses from "../data/courses.json"
import React, { useState, useEffect } from "react"
import Course from "./Course";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Menu, MenuButton, MenuItem, MenuItems, Checkbox } from "@headlessui/react";
import { useAppSelector } from "../app/hooks";
import { getCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router";

const Courses = () => {
	const navigate = useNavigate();
	const [courseLevelFilters, setCourseLevelFilters] = useState({
		1: true,
		2: true,
		3: true,
		4: true,
		5: true,
	});

	const cart = useAppSelector(getCart);
	const initialListings = courses;
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [listings, setListings] = useState(initialListings);

	useEffect(() => {
		if (searchTerm !== "") {
			const newListings = initialListings.filter((listing) => {
				if (listing.title.includes(searchTerm) || listing.description.includes(searchTerm)) {
					const courseLevel: number = listing.number;

					if (courseLevel / 100 > 5) {
						return courseLevelFilters[5];
					} else {
						return courseLevelFilters[parseInt(courseLevel.toString()[0])]
					}
				}
				return false;
			});

			setListings(newListings);
		} else {
			const newListings = initialListings.filter((listing) => {
				const courseLevel: number = listing.number;

				if (courseLevel / 100 >= 5) {
					return courseLevelFilters[5];
				} else {
					return courseLevelFilters[parseInt(courseLevel.toString()[0])]
				}
			});

			setListings(newListings);
		}
	}, [searchTerm, courseLevelFilters]);

	const updateFilter = (courseLevel: string) => {
		setCourseLevelFilters({
			...courseLevelFilters,
			[courseLevel]: !courseLevelFilters[courseLevel]
		});
	};

	const numberOfItemsInCart = () => {
		return Object.entries(cart).reduce((acc: number, current: [string, boolean]) => {
			return acc + Number(current[1]);
		}, 0);
	};

	return (
		<div className={"mx-auto"}>
			<div className={"flex flex-row justify-center pt-2 space-x-1"}>
				<input
					autoComplete="off"
					name="search"
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className={"search h-11"}
				/>
				<Menu as={"div"} className={"flex flex-col"}>
					<MenuButton className={"bg-gray-700 h-11"}>Filter</MenuButton>
					<MenuItems className={"flex flex-col mt-1 rounded-md"} anchor={"bottom"}>
						{Object.entries(courseLevelFilters).map(([courseLevel, levelChecked]) => (
							<MenuItem key={courseLevel}>
								<div
									className={"bg-gray-700 px-2 py-1"}
									onClick={(e) => e.stopPropagation()}
								>
									<Checkbox
										checked={levelChecked}
										onChange={() => updateFilter(courseLevel)}
									>
										<div className={"flex flex-row"}>
											{levelChecked ? (
												<CheckBoxIcon />
											) : (
												<CheckBoxOutlineBlankIcon />
											)}
											<div>
												{courseLevel}XXX{(courseLevel === "5" ? "+" : "")}
											</div>
										</div>
									</Checkbox>
								</div>
							</MenuItem>
						))}
					</MenuItems>
				</Menu>
			</div>
			{(numberOfItemsInCart() > 0) ? (
				<div className={"w-80 mx-auto m-4 flex flex-row space-x-2"}>
					<button onClick={() => navigate("/cart", { state: { cart }})} className={"bg-gray-700 w-40"}>View Cart</button>
					<button className={"bg-gray-700 w-40"}>Checkout Cart</button>
				</div>
			) : (
				<p className={"text-center m-4"}>You have an empty cart!</p>
			)}
				<div className={"flex flex-row flex-wrap gap-1 justify-center"}>
				{listings.map(({dept, number, title, description, prereqs, "cross-listed": crossListed}) => (
					<Course
						key={`${dept}${number}`}
						dept={dept}
						number={number}
						title={title}
						description={description}
						prereqs={prereqs}
						crossListed={crossListed}
					/>
				))}
				{listings.length === 0 && (
					<div>You have an empty cart!</div>
				)}
			</div>
		</div>
	);
}

export default Courses;
