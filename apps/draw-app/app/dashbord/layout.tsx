import { Background } from "@/components/bacground";
import { Card } from "@/components/card";
import { ProfileIcon } from "@/icons/profileIcon";
import { profile } from "console";
import { Children } from "react";


interface Ilayout {
  children: React.ReactNode;
  profile?: {
    name?: string,
    pic?: string,
  }
} 


export default function Layout(props: Ilayout) {
  return (
    <Background>
    <div className="grid grid-cols-10 outline-none fixed w-screen h-screen  p-5 gap-2 ">
      <div className="outline-none col-span-7 p-2">
        <Card tran="lg" className='left-0 top-0 h-full'>{props.children}</Card>
      </div>
      <div className="outline-none col-span-3 h-full">
        <div className="w-full h-3/10 outline-none p-2">
           <Card tran="lg" className="w-full h-full p-2 items-center ">
              {props.profile ?
                <div></div> :
                <div className="flex m-4">
                  <ProfileIcon size="size-20"></ProfileIcon>
                  <div className='ml-5 '>Name</div>
                </div>
              }
            </Card>
        </div>
        <div className="h-7/10 p-2">
           <Card tran="lg" className='h-full w-full p-10'>Rooms Created</Card>
        </div>
      </div>

    </div>
  </Background>
  );
}


//  <div className=" grid grid-rows-4">
//           <div className="row-span-1 ">
           
//           </div>


//           <div className=" h-full outline-none">
//             <Card tran="lg" className='h-full w-full'>Rooms Created</Card>
//           </div>


//         </div>

//       
