import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./app/Home";
import ViewCart from "./app/ViewCart";
import Checkout from "./app/Checkout";
import "./index.css";
import { store } from "./app/store";
import { Provider } from "react-redux"
import { BrowserRouter, Routes, Route } from "react-router";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route index element={<Home />} />
					<Route path="cart" element={<ViewCart />} />
					<Route path="checkout" element={<Checkout />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	</StrictMode>
)
