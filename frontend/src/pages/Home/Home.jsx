import React from 'react'
import "./Home.css"
import Header from '../../components/Header/Header'
import ExploreCars from '../../components/ExploreCars/ExploreCars'
import { useState } from 'react'
import CarsDisplay from '../../components/CarsDisplay/CarsDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import ScrollUp from '../../components/ScrollUp/ScrollUp'

const Home = ({setMenu}) => {

    const [category, setCategory] = useState('all');

    return (
        <div>
            <Header/>
            <ExploreCars category={category} setCategory={setCategory}/>
            <CarsDisplay category={category}/>
            <AppDownload/>
            <ScrollUp  setMenu={setMenu}/>
        </div>
    )
}

export default Home