import { ReactElement } from "react";

interface IconButtonProps{
        Icon?:ReactElement,
        onClick?:()=>void
}
export function IConButto(
        props:IconButtonProps
){
        return(
                <div className="text-white hover:text-amber-200 hover:cursor-pointer m-1 text-2xl
">
                        { props.Icon }
                </div>
        )
}