import { ReactElement } from "react";

interface IconButtonProps{
        Icon?:ReactElement,
        onClick?:()=>void,
        styling?:string
}
export function IConButto(
        props:IconButtonProps
){
        return(
                <div onClick={props.onClick} className='px-4' >      
                        { props.Icon }
                </div>
        ) 
}