import { useEffect, useState } from "react";
function Timer(){

    const[seconds,setSeconds]=useState(0);

    useEffect(()=>{
        const Interval = setInterval(()=>{
            setSeconds(prev => prev + 1)
        }, 1000);

        return () => clearInterval(Interval);
    }, []);

    //UI
    return(
         <div className="p-6 bg-gray-100 text-center rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">⏱ Timer</h2>
      <p className="text-lg">Seconds passed: {seconds}</p>

       <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => setSeconds(0)}>Reset Timer</button>
    </div>

   
  );

}

export default Timer;