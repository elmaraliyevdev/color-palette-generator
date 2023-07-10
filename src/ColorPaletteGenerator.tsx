import React, {useEffect, useState} from 'react';
import chroma from 'chroma-js';
import randomColor from 'randomcolor';
import Notification from "./Notification";

const ColorPaletteGenerator: React.FC = () => {
    const [colors, setColors] = useState([randomColor(), randomColor(), randomColor(), randomColor()]);
    const [show, setShow] = useState(false);
    
    useEffect(() => {
        setColors([randomColor(), randomColor(), randomColor(), randomColor()]);
    }, [])

    const generatePalette = () => {
        setColors([randomColor(), randomColor(), randomColor(), randomColor()]);
    }

    const copyToClipboard = (color: string) => {
        navigator.clipboard.writeText(color).then(() => {
            // Show the notification
            setShow(true);

            // Hide the notification after 3 seconds
            setTimeout(() => {
                setShow(false);
            }, 3000);
        });
    }

    return (
        <div className="h-screen flex items-center">
            <Notification show={show} setShow={setShow}/>
            <button onClick={generatePalette}
                    className="fixed bottom-20 left-0 right-0 m-auto block max-w-max z-10 p-2 bg-white rounded-md shadow-2xl">Generate
                New Palette
            </button>
            {colors.map((color, colorIndex) => {
                const palette = chroma.scale([color, '#fff']).mode('lch').colors(10);
                return (
                    <div key={colorIndex} className='h-full w-1/4 cursor-pointer' style={{backgroundColor: color}}
                         onClick={() => copyToClipboard(color)}>

                        <div key={colorIndex} className='flex items-center'>
                            {palette.map((shade, shadeIndex) => (
                                <div key={shadeIndex} style={{backgroundColor: shade}}
                                     className='w-44 h-20 border-b-2 border-b-white cursor-pointer'
                                     onClick={() => copyToClipboard(shade)}></div>
                            ))}
                        </div>

                    </div>

                )
            })}
        </div>
    )
}

export default ColorPaletteGenerator;