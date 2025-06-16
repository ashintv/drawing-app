import { ButtonCom } from "./Button";
import { Card } from "./card";

export function RoomCard() {
        return (

                <Card tran="lg" className="my-2 w-full  justify-center">
                        <span className="flex w-full h-fit items-center justify-between  py-2">
                                <div className="mx-5">
                                        Classs !
                                </div>
                                <div className="w-40 place-self-end">
                                        <ButtonCom onClick={()=>{
                                               
                                        }} name="Enter" var="success" ></ButtonCom>
                                        <ButtonCom onClick={()=>{

                                        }} name="Leave" var='dan'  ></ButtonCom>


                                </div>

                        </span>
                </Card>

        )
}


