import { z } from "zod";

export const CreateUserSchema = z.object({
        name:z.string().min(5 ,'atleas 5 char' ),
        password:z.string(),
        //add fieldss

})


// add more schemasss
//1 signin
//2 sign up
// room schema
//etc etc