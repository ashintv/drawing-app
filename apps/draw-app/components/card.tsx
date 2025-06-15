import { Children } from "react";
import { Input } from "./Input";

const Transperancy = {
        'lg': ' bg-white/10',
        'md': ' bg-white/30',
        'sm': ' bg-white/50',

}

export function Card({ children,className , tran
}: Readonly<{
        children: React.ReactNode;
        className?:string,
        tran:"lg" | 'md' | 'sm'
}>) {
        return (<>
                <div className={`backdrop-blur-md rounded-3xl text-white items-center   ${Transperancy[tran]}  ${className}`}>
                        <div>
                                {children}
                        </div>
                </div>
        </>
        )
}