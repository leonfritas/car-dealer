import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/context';
import React from 'react';
import Loading from '../components/Loading.jsx';

export default function ResultPage() {
    const { makeId, year } = useContext(Context);
    const [filteredCars, setFilteredCars] = useState();
    const [useLoading, setUseLoading] = useState(false);

    useEffect(() => {
        setUseLoading(true);
        fetch(
            `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
        )
            .then((res) => res.json())
            .then((data) => {
                setFilteredCars(data.Results);
                setUseLoading(false);
            });
    }, []);

    return (
        <div className="flex flex-col w-full  items-center my-0 pt-[50px] pb-0 h-screen">
            {filteredCars ? <h2 className='text-white'>{filteredCars[0].Make_Name}</h2> : ''}
            <div className="w-full flex justify-around items-center mt-12 flex-wrap">
                {filteredCars?.map((value) => {
                    return (
                        <div className="card" key={value.Model_ID}>
                            <h3>{value.Model_ID}</h3>
                            <p>{value.Model_Name}</p>
                        </div>
                    );
                })}
            </div>
            <br />
            <br />
            <br />
            <br />
            {useLoading && <Loading />}
            <Link to="/">
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Back</button>
            </Link>
        </div>
    );
}
