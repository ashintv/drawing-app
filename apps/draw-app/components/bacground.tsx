import { ReactNode } from "react";

export function Background({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
        return (
             
                         <div className="flex h-screen w-screen items-center  justify-center
               
                bg-[url(https://img.freepik.com/premium-vector/business-management-flowchart-black-grunge_144316-7740.jpg?semt=ais_hybrid&w=740)] " >
                        <div className="h-screen w-screen backdrop-grayscale-100 blur-lg ">  </div>
                                {children}
                        </div>
      
                

        )
}