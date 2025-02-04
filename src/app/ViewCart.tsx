import courses from "../data/courses.json";
import {useLocation, useNavigate} from "react-router";
import Nav from "../components/Nav";
import React from "react";

const ViewCart = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cart } = location.state;

    const selected = Object.entries(cart).filter(([courseId, selected]) => {
        return selected;
    }).map(([courseId, selected]) => courseId);

    let items = [];

    courses.forEach((course) => {
        if (selected.includes(`${course.dept}${course.number}`)) {
            items.push(course);
        }
    });

    const join = (strings: string[], sep: string): string => {
        return strings.reduce((acc: string, nextStr: string) => {
            return acc.concat(nextStr).concat(sep);
        }, "").slice(0, -(sep.length));
    };

    return (
        <div className={"m-4 flex flex-col justify-center"}>
            <Nav />
            {items.map(({dept, number, title, prereqs, "cross-listed": crossListed, description}, index) => (
                <div className={"m-4 max-w-[60rem] mx-auto"}>
                    <p className={"text-xl mr-auto"}>{index + 1}) {dept}{number}: {title}</p>
                    {prereqs && typeof prereqs !== "string" ? (
                        <p className={"italic"}>Prerequisites: {join(prereqs, ", ")}</p>
                    ) : (
                        prereqs && (<p className={"italic"}>Prerequisites: {prereqs}</p>)
                    )}
                    {crossListed && (
                        <p className={"italic"}>Cross-listings: {join(crossListed, "/")}</p>
                    )}
                    <p className={"mt-2 text-sm"}>{description}</p>
                </div>
            ))}
            {items.length === 0 ? (
                <p className={"text-2xl mx-auto mt-10"}>You have an empty cart!</p>
            ) : (
                <div className={"w-40 mx-auto"}>
                    <button className={"bg-gray-700"} onClick={() => navigate("/checkout", { state : { list: items }})}>Checkout Cart</button>
                </div>
            )}
        </div>
    );
};

export default ViewCart;
