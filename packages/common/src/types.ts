import { z } from "zod";
import { email } from "zod/v4";

export const CreateUserSchema = z.object({
        email:z.string().email(),
        password:z.string(),
        //add fieldss

})


// add more schemasss
//1 signin
//2 sign up
// room schema
//etc etc