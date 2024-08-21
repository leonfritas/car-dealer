import { useState, useContext } from 'react';
import './css/CarGrid.css';
import { Context } from '../context/context';

export default function CarGrid(props) {
    const [showCars, setShowCars] = useState(false);
    const [buttonLabel, setButtonLabel] = useState('Show Cars');
    const [selectedCarId, setSelectedCarId] = useState(null);
    const { setMakeId } = useContext(Context);

    function handleShowCars() {
        setShowCars(!showCars);
        showCars ? setButtonLabel('Show Cars') : setButtonLabel('Hide Cars');
    }

    function setCar(id) {
        setMakeId(id);
        setSelectedCarId(id);
    }

    return (
        <div className="flex flex-col items-center justify-start w-full gap-12 pt-12 bg-[#427D9D] min-h-screen static">
            <button
                type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => handleShowCars()}
                disabled={props.enabled}
            >
                {buttonLabel}
            </button>
            {showCars ? (
                <div className="flex flex-wrap justify-around gap-12 w-[90%] h-full">
                    {props.carList?.map((value) => {
                        return (
                            <div
                                onClick={() => setCar(value.MakeId)}
                                className={`card ${
                                    selectedCarId === value.MakeId
                                        ? 'selected'
                                        : ''
                                }`}
                                key={value.MakeId}
                            >
                                <h3>{value.MakeId}</h3>
                                <p>{value.MakeName}</p>
                                <p>{value.VehicleTypeName}</p>
                            </div>
                            
                        );
                    })}
                </div>
            ) : (
                ''
            )}
        </div>
    );
}
