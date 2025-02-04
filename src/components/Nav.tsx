import { styled } from "@mui/material/styles";
import Badge, { badgeClasses } from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppSelector } from "../app/hooks";
import { getCart } from "../features/cart/cartSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const CartBadge = styled(Badge)`
	& .${badgeClasses.badge} {
		top: -10px;
		background-color: indianred;
	}
`;

const Nav = () => {
	const navigate = useNavigate();
	const cart = useAppSelector(getCart);
	const calculateNumberOfItems = () => {
		return Object.entries(cart).reduce((acc: number, current: [string, boolean]) => {
			return acc + Number(current[1]);
		}, 0);
	};

	const [items, setItems] = useState<number>(calculateNumberOfItems());

	useEffect(() => {
		setItems(calculateNumberOfItems());
	}, [cart]);

	return (
		<div
			style={{
				width: "100%",
				padding: "0 1rem",
				borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
				top: "4px"
			}}
			className={"flex flex-row"}
		>
			<div className={"mr-auto my-auto cursor-pointer"} onClick={() => navigate("/")}>
				<h2 className={"mr-auto my-auto text-3xl"}>Penn Course Cart</h2>
			</div>
			<div className={"relative"}>
				<IconButton sx={{ color: "#FFFFFF"}}>
					<ShoppingCartIcon onClick={() => navigate("/cart", { state: { cart }})} />
					<CartBadge badgeContent={items} />
				</IconButton>
			</div>
		</div>
	)
};

export default Nav;
