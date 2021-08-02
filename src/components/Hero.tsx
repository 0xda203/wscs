import React from "react";

export default function Hero() {
    return (
        <React.Fragment>

<div className="hero bg-gray-100 py-16">
    
    <div className="container px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
        
        <div className="hero-wrapper grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

            
            <div className="hero-text col-span-6">
                <h1 className=" font-bold text-4xl md:text-5xl max-w-xl text-gray-900 leading-tight">Centro comercial</h1>
                <hr className=" w-12 h-1 bg-orange-500 rounded-full mt-8"/>
                <p className="text-gray-800 text-base leading-relaxed mt-8 font-semibold">Encontre aqui tudo o que você precisa!</p>
            </div>

            
            <div className="hero-image col-span-6">
                <img src="https://i.imgur.com/onk4IwH.png"/>
                {/* <img src="https://static.zerochan.net/Uchiyama.Atsushi.full.1179465.jpg"/> */}
            </div>
        </div>
    </div>
</div>
    
        </React.Fragment>
    )
}