function Map(){

    const fruits = ['Apple', 'Banana', 'Cherry', 'Date'];
    return(

        <ul>
            {fruits.map((fruits,index) =>(
                <li key={index}>{fruits}</li>
            ))}
        </ul>
    );
}

export default Map;