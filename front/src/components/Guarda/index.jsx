import { useUser } from "../../hooks";
import { Redirect } from "wouter";

const Guard = ({component : Component}) => {

    const {data , isLoading }= useUser();

    if(isLoading) return <p>Loading ... </p>

    return data ?  <Component/> : <Redirect to = "/login"/>;
};

export default Guard