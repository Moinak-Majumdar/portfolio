import { useState} from 'react'
import Image from 'next/legacy/image' 
interface props {
    src: string, alt: string, className?: string, w?: number, h?: number, layout?: any, position?: string, objFit?: any
}

const Bg = ({ src, alt, className = "", w, h, layout, position, objFit = "cover" }: props) => {

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
            className={`noSelection ${className} ${isLoading ? "opacity-0" : ""}`}
            onLoadingComplete={() => setLoading(false)}
            onDragStart={(e) => {
            e.preventDefault();
            }}
            priority={true}
            placeholder='blur'
            blurDataURL='/assets/image/fullstack-developer.png'
        />
    )
}

export default Bg