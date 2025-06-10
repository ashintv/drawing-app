import { z } from "zod";
import { email } from "zod/v4";

export const CreateUserSchema = z.object({
        email:z.string().email(),
        password:z.string(),  

})

export const RoomCreateSchema = z.object({
        name:z.string().min(1)
})


// add more schemasss
//1 signin
//2 sign up
// room schema
//etc etc