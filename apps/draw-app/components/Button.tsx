'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"


interface IButton {
        name: string,
        onClick: () => void,
        var: 'pri' | 'success' | 'dan' | 'custom',
        Custom?: string
}
const defaultStyles = 'justify-center m-2 flex rounded-xl px-8 items-center h-8  w-fit min-w-30 backdrop-blur hover:cursor-pointer transition duration-150 ease-in-out'
const Styles = {
        'pri': `${defaultStyles}  `,
        'success': `${defaultStyles} bg-green-400 text-green-950 hover:bg-transparent outline-2 hover:text-green-400 outline-green-400`,
        'dan': `${defaultStyles} bg-red-400 text-red-950 hover:bg-transparent outline-2 hover:text-red-400 outline-red-400`,
        'custom': ''

}

export function ButtonCom(props: IButton) {
        const router = useRouter()
        const [loading, setLoading] = useState(false)
        return (
                <div className="m-5">

                        {!loading ? <button className={`${Styles[props.var]} ${props.var == 'custom' ? props.Custom : ''}`} onClick={async () => {
                                setLoading(true)
                                router.push('canvas/2')
                                setLoading(false)
                                

                        }}>{props.name}
                        </button> :
                                <button className={`${Styles[props.var]}  ${props.var == 'custom' ? props.Custom : ''}`} disabled onClick={() => { }

                                }>
                                        
                                        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mr-3 size-5 animate-spin">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                                
                                        </svg>
                                     
                                        .....
                                </button>

                        }
                </div>

        )
}