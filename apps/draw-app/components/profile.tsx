import { ProfileIcon } from "@/icons/profileIcon";
import { Card } from "./card";

export default function Profile(){
        return(
               <div className="absolute top-0 ">
                 <Card tran="sm" className=""><ProfileIcon size="size-20"></ProfileIcon></Card>
               </div>
        )
}