import React, {useEffect, useState} from "react";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import { Button, Dialog, DialogPanel, DialogTitle, DialogBackdrop } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addCartItem, removeCartItem, getCart } from "../features/cart/cartSlice";

type CourseProps = {
    "dept": string,
    "number": number,
    "title": string,
    "crossListed"?: string[],
    "prereqs"?: string | string[],
    "description": string,
};

const Course = ({
    dept, number, title, crossListed, prereqs, description
} : CourseProps) => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector(getCart);

    const courseId = `${dept}${number}`;
    const [cartFull, setCartFull] = useState<boolean>(false);
    const [isInCart, setIsInCart] = useState<boolean>(cart[courseId]);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    useEffect(() => {
        setCartFull(false);
        setIsInCart(cart[courseId]);
    }, [cart]);

    const handleCartChange = () => {
        if (isInCart) {
            dispatch(removeCartItem(courseId));
        } else {
            const numberOfItemsInCart = Object.entries(cart).reduce((acc: number, current: [string, boolean]) => {
                return acc + Number(current[1]);
            }, 0);
            if (numberOfItemsInCart < 7) {
                setCartFull(false);
                dispatch(addCartItem(courseId));
            } else {
                setCartFull(true);
            }
        }
    };

    const join = (strings: string[], sep: string): string => {
        return strings.reduce((acc: string, nextStr: string) => {
            return acc.concat(nextStr).concat(sep);
        }, "").slice(0, -(sep.length));
    };

    return (
        <>
            <Button
                onClick={() => setIsExpanded(true)}
                className={"course-container relative"}
            >
                <span className={"absolute top-2 right-2 " + (isInCart ? "visible" : "hidden")}>
                    <CheckIcon sx={{ color: "#30ff30"}}/>
                </span>
                <p>
                    {dept} {number}: {title}
                </p>
            </Button>
            <Dialog
                onClose={() => setIsExpanded(false)}
                open={isExpanded}
                as={"div"}
                className={"relative z-10 focus:outline-none"}
            >
                <DialogBackdrop className={"fixed inset-0 bg-black/50 "}/>
                <div className={"fixed inset-0 z-10 w-screen overflow-y-auto"}>
                    <div className={"flex min-h-full items-center justify-center p-4"}>
                        <DialogPanel
                            transition
                            className={"w-9/10 lg:w-3/5 bg-gray-600 rounded-xl backdrop-blur-2xl duration-300 ease-out p-4"}
                        >
                            <div className={"flex flex-row space-between-auto"}>
                                <div className={"flex1"}></div>
                                <DialogTitle as="p" className={"text-2xl my-2"}>{dept} {number}: {title}</DialogTitle>
                                <div className={"flex1 flex-row flex justify-end"}>
                                    <div className={"right-1 top-1"}>
                                        <IconButton
                                            sx={{color: "#FFFFFF"}}
                                            onClick={() => setIsExpanded(false)}
                                        >
                                            <CloseIcon/>
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                            {prereqs && typeof prereqs !== "string" ? (
                                <p className={"italic"}>Prerequisites: {join(prereqs, ", ")}</p>
                            ) : (
                                prereqs && (<p className={"italic"}>Prerequisites: {prereqs}</p>)
                            )}
                            {crossListed && (
                                <p className={"italic"}>Cross-listings: {join(crossListed, "/")}</p>
                            )}
                            <p className={"mt-2"}>{description}</p>
                            <div className={"flex flex-row align-center p-4"}>
                                <Button
                                    onClick={() => handleCartChange()}
                                    className={"mx-auto text-center bg-gray-700"}
                                    disabled={cartFull}
                                >{isInCart ? "Remove from cart" : "Add to cart"}</Button>
                            </div>
                            {cartFull && (
                                <Alert variant={"filled"} severity={"error"}>Cannot register for more than 7 classes</Alert>
                            )}
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default Course;
