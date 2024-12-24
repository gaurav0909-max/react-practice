import React from 'react'

const Modal = () => {
    return (
        <div>
            <div className="flex h-screen">
                <div className="flex flex-1 flex-col justify-center items-center">
                    <div className="text-center rounded-lg border border-gray-700">
                        <div className="p-8">
                            <h1 className="pt-2 pb-4">Hello World</h1>
                            <p className="text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                        <div className="flex mt-1">
                            <button className="flex-1 text-sm text-center rounded-bl-lg border-t border-r border-gray-700 p-2">OK</button>
                            <button className="flex-1 text-sm text-center rounded-br-lg border-t border-gray-700 p-2">CANCEL</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal