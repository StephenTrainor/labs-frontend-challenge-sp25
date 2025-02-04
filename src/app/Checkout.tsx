import {useLocation} from "react-router";
import Nav from "../components/Nav";
import React from "react";

const Checkout = () => {
    const location = useLocation();
    const { list } = location.state;

    return (
        <div className={"m-4 flex flex-col justify-center"}>
            <Nav/>
            <p className={"mx-auto text-2xl mt-10"}>Registration Successful!</p>
            <p className={"mx-auto text-lg mb-6"}>You have registered for the following classes:</p>
            {list.map((course) => (
                <p className={"mx-auto text-md"}>{course.dept}{course.number}: {course.title}</p>
            ))}
        </div>
    );
};

export default Checkout;
