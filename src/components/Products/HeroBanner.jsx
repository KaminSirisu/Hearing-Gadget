import { productBanner } from "../../image.js";
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <div className="relative">
        <div className="absolute inset-0 px-20 py-8 space-y-2">
            {/* <p className="">
                <Link to="/" className="text-neutral-500 hover:underline">
                    Home&nbsp;{'>'}
                </Link> <span className="font-medium">Products</span>
            </p> */}
            <h1 className="font-bold text-3xl tracking-wider">Hearing Gadgets</h1>
            <p className="text-neutral-500">
                Explore our range of premium hearing gadgets from Signia.<br/> Designed for more natural hearing, better connectivity,<br/> and all-day comfort.
            </p>
        </div>
        
        <img src={productBanner} alt="Product Banner" className="object-cover w-full max-h-60" />
    </div>
  )
}

export default HeroBanner