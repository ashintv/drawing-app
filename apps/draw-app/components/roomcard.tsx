import { Card } from "./card";

export function RoomCard() {
        return (

                <Card tran="lg" className="m-1 w-full  justify-center">
                       <span className="flex w-full h-fit items-center justify-between px-10 py-2">
                         <div>
                                Classs !
                        </div>
                        <div className="flex-col bg-red  w-40  self-end">
                                <button className="bg-amber-600 rounded-2xl w-40 my-1 py-2">Enter Canvas</button>
                                <button className="bg-red-600 rounded-2xl w-40 my-1 py-2">Enter Canvas</button>


                        </div>

                       </span>
                </Card>

        )
}

