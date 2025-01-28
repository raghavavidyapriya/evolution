import React from 'react'
import "./ExploreCars.css"
import { type_list } from '../../assets/frontend_assets/assets'


const ExploreCars = ({category, setCategory}) => {
    return (
        <div className="explore_cars" id="explore_cars">
            <h2>Discover Options</h2>
            <div className="explore_cars_list">
                {
                    type_list.map((item, index) =>{
                        return (
                            <div key={index}>
                            <div onClick={()=>setCategory(prev=>prev===item.type_name?"all":item.type_name)}
                            key={index} className='explore_cars_list_item'>
                                <img className={category===item.type_name?"active":"nonactive"} src={item.type_image} alt=""/>
                                <p>{item.type_name}</p>
                            </div>
                            <div className='category-gap'></div>
                            </div>
                        )
                    })
                }
            </div>
            <hr/>
        </div>
    )
}

export default ExploreCars