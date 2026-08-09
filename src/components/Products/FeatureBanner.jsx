import { Headset, ShieldCheck, Truck, Undo2 } from "lucide-react"

const FeatureBanner = () => {
  return (
    <div className="flex gap-20 bg-blue-50 shadow rounded-lg justify-center px-10 py-5">
        <div className='flex gap-5 items-center'>
            <Truck size={30} className="text-blue-500" />
            <div>
                <p>
                    Free Shipping
                </p>
                <p className="text-neutral-500 text-xs">
                    on all orders over $99
                </p>
            </div>
        </div>
        <div className="flex gap-5 items-center">
            <ShieldCheck size={30} className="text-blue-500" />
            <div>
                <p>
                    2-Year Warranty
                </p>
                <p className="text-neutral-500 text-xs">
                    Peace of mind guaranteed
                </p>
            </div>
            
        </div>
        <div className="flex gap-5 items-center">
            <Undo2 size={30} className="text-blue-500" />
            <div>
                <p>
                    30-Day Returns
                </p>
                <p className="text-neutral-500 text-xs">
                    Hassle-free returns
                </p>
            </div>
        </div>
        <div className="flex gap-5 items-center">
            <Headset size={30} className="text-blue-500" />
            <div>
              <p>
                Expert Support
              </p>
              <p className="text-neutral-500 text-xs">
                Here to help you hear better
              </p> 
            </div>
        </div>
    </div>
  )
} 

export default FeatureBanner