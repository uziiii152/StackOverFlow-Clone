import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

import { AppwriteException,ID, Models } from "appwrite";

 import { account } from "@/models/client/config";

 export interface UserPrefs{
    reputation:number 
 }

 interface AuthStore {
    session: Models.Session | null,
    jwt: string | null,
    user: Models.User<UserPrefs> | null,
    hydrated: boolean,
    setHydrated():void,
    verifySession():Promise<void>,
    login(email:string,password:string):Promise<{success:boolean;
        error?:AppwriteException
    }>,
    logout():promise<void>
}


export const useAuthStore = create<IAuthStore>()(
    persist(
        immer((set) => ({
            session:null,
            jwt:null,
            user:null,
            hydrated:false,
        }) ),
        {
            name: 'auth',
            onRehydrateStorage(){
                return (state,error) => {
                    if(!error) state?.setHydrated(){
                        set({hydrated:true})
                    }
                }
            }
        }
    )
)