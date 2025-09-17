import { useEffect } from "react";

function Hobby({Hobby}){

    useEffect(()=>{
        alert("Hey welcome to my page!")

    },[])
    return (
        <div>
         <h2> List of Hobbies: {Hobby}</h2>
        </div>
    );
}



export default Hobby;