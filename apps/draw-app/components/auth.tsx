import { Background } from "./bacground";
import { Input } from "./Input";

interface AuthI {
        isSignIn?: boolean,

}
export function Auth({ isSignIn }: AuthI) {
        return (
                <Background>
                        <div className="w-screen h-screen fixed flex items-center justify-center">

                                <div className="w-screen h-screen md:w-96 md:h-96 fixed bg-white opacity-10 rounded-3xl ">
                                </div>


                                <div className="w-screen h-screen md:w-96 md:h-96 backdrop-blur-md rounded-3xl bg-transparent text-white flex items-center  p-20  fixed ">
                                        <div>
                                                <div className="text-4xl font-bold font-serif">{isSignIn ? 'Sign in' : 'Sign up'}</div>
                                                <div>
                                                        <Input placeholder="username"></Input>
                                                </div>
                                                <div>
                                                        <Input placeholder="password"></Input>
                                                </div>
                                                <div><button className="rounded-xl py-2 text-green-950 bg-green-400 w-full text-xl hover:bg-green-800">{isSignIn ? 'Sign in' : 'Sign up'}</button></div>

                                        </div>



                                </div>
                        </div>
                </Background>




        )
}

