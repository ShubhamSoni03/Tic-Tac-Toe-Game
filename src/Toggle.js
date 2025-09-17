import {useState} from 'react';

function Toggle(){

    const[show,setshow] = useState(true);

    return(
        <div>
            <h2>Toggle Message Component:</h2>

            {show && <p>This is a Toggle Message</p>}

            <button onClick={() => setshow(!show)}>
                {show ? "Hide" : "Show"}

                
            </button>
        </div>


    );

}

export default Toggle;