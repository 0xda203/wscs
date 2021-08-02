import React from "react"

const Footer: React.FC = () => {
  return (
<footer className="bg-gray-80 sm ">
    <div className="max-w-6xl m-auto text-gray-800 flex flex-wrap justify-left">
</div>

    <div className="pt-2">
        <div className="flex pb-5 px-3 m-auto 
            border-gray-500 text-gray-400 text-sm 
            flex-col md:flex-row max-w-6xl">
            <div className="mt-2">
                Gabriel Rodrigues & Gabriel Kendy
            </div>

            <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
                <a href="#" className="w-6 mx-1">
                    <i className="uil uil-facebook-f"></i>
                </a>
                <a href="#" className="w-6 mx-1">
                    <i className="uil uil-twitter-alt"></i>
                </a>
                <a href="#" className="w-6 mx-1">
                    <i className="uil uil-youtube"></i>
                </a>
                <a href="#" className="w-6 mx-1">
                    <i className="uil uil-linkedin"></i>
                </a>
                <a href="#" className="w-6 mx-1">
                    <i className="uil uil-instagram"></i>
                </a>
            </div>
        </div>
    </div>
</footer>
  )
}

export default Footer
