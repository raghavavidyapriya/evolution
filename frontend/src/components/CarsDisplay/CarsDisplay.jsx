import React, {useContext} from 'react'
import "./CarsDisplay.css"
import { StoreContext } from '../../context/StoreContext'
import CarsItem from '../CarsItem/CarsItem'

const CarsDisplay = ({category}) => {

    const {cars_list} = useContext(StoreContext)
    return (
        <div className='cars-display' id='cars-display'>
            <h2>Explore Accessories</h2>
            <div className="cars-display-list">
                {
                    cars_list.map((item, index) => {
                        if (category==="all" || category===item.category){
                            return <CarsItem className='car-item' key={index} id={item._id} 
                                            name={item.name} description={item.description}
                                            price={(item.price).toLocaleString()} image={item.image}/>
                        }
                    })
                }
            </div>
        </div>
    )
}

export default CarsDisplay