import { useState} from 'react'
import Image from 'next/image' 

const Bg = ({ src, alt, className = "", w, h, layout, position, objFit }) => {

    const [isLoading, setLoading] = useState(true);
    return (
        <Image
            src={src}
            alt={alt}
            objectFit={objFit || "cover"}
            objectPosition={position || "center"}
            layout={layout || "fill"}
            height={h}
            width={w}
            loading="eager"
            className={`${className} ${isLoading ? "opacity-0" : ""}`}
            onLoadingComplete={() => setLoading(false)}
            onDragStart={(e) => {
            e.preventDefault();
            }}
            priority={true}
        />
    )
}

export default Bg