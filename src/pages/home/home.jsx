import React from "react";
import './style.css'
import SideBar from '../../components/Sidebar/Sidebar'

const Home = () => {
    return (
        <>
            <SideBar />
            <section className="section">
                <div className="container">
                    <div className="title">
                        <h1>Bem vindo!</h1>
                    </div>
                </div>
            </section>
        </>

    )
}

export default Home