import { RectIcon } from "@/icons/rect";
import { IConButto } from "./ButtonIcon";
import { Shape } from "./canvas";
import { PencilIcon } from "@/icons/pencil";
export function Topbar({
        selected,
        setSelected,
        classNameAd
}: {
        selected: Shape,
        setSelected: (s:Shape) => void,
        classNameAd?:string
}) {
        return (
               <div className="">
                 <div className={` bap-5 flex m-1 ${classNameAd}  absolute top-0 left-0 text-green-300`}>
                       <div className={`${selected==='pencil'?"text-red-500":"text-gray-50  hover:text-green-500" }`}>
                         <IConButto  Icon={<PencilIcon />}  onClick={()=>{
                                setSelected('pencil')
                        }}/>
                       </div>

                       <div className={`${selected==='rect'?"text-red-500 ":"text-gray-50  hover:text-green-500" }`}>
                         <IConButto  Icon={<RectIcon />}  onClick={()=>{
                                setSelected('rect')
                        }}/>
                       </div>
                      

                </div>
               </div>
        )
}