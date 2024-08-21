import CarGrid from '../components/CarGrid';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/context';
import React from 'react';


export default function Home() {
    const [carList, setCarList] = useState();
    const [carType, setCarType] = useState();
    const [yearOptions, setYearOptions] = useState([]);
    const [selectedType, setSelectedType] = useState('');

    const { makeId, year, setYear } = useContext(Context);

    useEffect(() => {
        const startYear = 2015;
        const currentYear = new Date().getFullYear();
        const years = [];

        for (let year = startYear; year <= currentYear; year++) {
            years.push(year);
        }

        setYearOptions(years);
    }, []);

    useEffect(() => {
        fetch(
            'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
        )
            .then((res) => res.json())
            .then((data) => {
                setCarList(data.Results);
                const types = data.Results;
                const uniqueVehicleTypes = Array.from(
                    new Set(types.map((item) => item.VehicleTypeName))
                );
                setCarType(uniqueVehicleTypes);
            });
    }, []);

    const isNextButtonDisabled = () => {
        return selectedType === '' || year === '';
    };
    function checkId(){
        if (!makeId > 0){
            alert('Pick one car to continue.')
        }
    }

    return (
        <>
            
            <div className="carDealerHeader">
                <h1 className='text-3xl font-bold'>Car Dealer</h1>
                
                <div className="selectContainer">
                    <div>                        
                        <select                        
                            id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            <option className="option" value="">
                                Select a type
                            </option>
                            {carType?.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>                        
                        <select
                            id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        >
                            <option className="option" value="">
                                Select a year
                            </option>
                            {yearOptions.map((year, index) => (
                                <option key={index} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="nextButtonContainer">
                        <Link to={makeId?`/result/${makeId}/${year}`: ''}>
                            <button
                                onClick={() => checkId()}
                                type="button" className="w-40 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                disabled={isNextButtonDisabled()}
                            >
                                Next
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <CarGrid carList={carList} enabled={isNextButtonDisabled()} />
        </>
    );
}
