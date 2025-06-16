'use client'


interface IButton{
        name:string,
        onClick?:()=>void,
        var: 'pri' |'success'| 'dan' | 'custom',
        Custom?:string
}
const defaultStyles = 'm-1  rounded-md px-8 w-30 backdrop-blur hover:cursor-pointer transition duration-150 ease-in-out'
const Styles = {
        'pri':`${defaultStyles}  `,
        'success':`${defaultStyles} bg-green-400 text-green-950 hover:bg-transparent outline-2 hover:text-green-400 outline-green-400`,
        'dan':`${defaultStyles} bg-red-400 text-red-950 hover:bg-transparent outline-2 hover:text-red-400 outline-red-400`,
        'custom':''
        
}

export function ButtonCom(props: IButton){
        return(
                <div>
                        
                        <button className={`${Styles[props.var] } ${props.var=='custom'? props.Custom:''} `}  onClick={props.onClick}>{props.name}</button>
                </div>
                
        )
}