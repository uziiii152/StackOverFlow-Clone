/*
 model on which zustand works with the nextjs
first import the necessary packages
2_ Create the interface for the store
3_ Create the store with the help of persist and immer
4_ Store state and methods
5_ Rehydrate the store 

*/

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

import { AppwriteException,ID, Models } from "appwrite";

 import { account } from "@/models/client/config";

 export interface UserPrefs{
    reputation:number 
 }

 interface IAuthStore {
    session: Models.Session | null,
    jwt: string | null,
    user: Models.User<UserPrefs> | null,
    hydrated: boolean,
    setHydrated():void,
    verifySession():Promise<void>,
    login(
        email:string,
        password:string
    ):Promise<{
        success:boolean;
        error?:AppwriteException
    }>,
    createAccount(
        name:string,
        email:string,
        password:string
    ):Promise<{
        success:boolean;
        error?:AppwriteException
    }>,
    logout():Promise<void>
    
}


export const useAuthStore = create<IAuthStore>()(
    persist(
        immer((set) => ({
            session:null,
            jwt:null,
            user:null,
            hydrated:false,

            setHydrated(){
                set({hydrated:true})
            },
            async verifySession(){
                try {
                   const session = await account.getSession("current")
                   set({session})
        
                } catch (error) {
                    console.log(error)
                }
            },
            
            async login(email:string,password:string){
                try {
                  const session = await account.createEmailPasswordSession(email,password) 
                  const [user,{jwt}] = await Promise.all([
                    account.get<UserPrefs>(),
                    account.createJWT()

                  ])
                  if (!user.prefs?.reputation) await account.updatePrefs<UserPrefs>({reputation:0})

                    set({session,user,jwt})
                    return {success:true}
                } catch (error) {
                   console.log(error) 
                   return {success:false,error:error instanceof AppwriteException ? error : undefined}
                }
            },
            async createAccount(name:string,email:string,password:string){
                try {
                    
                    await account.create(ID.unique(),email,password,name)
                    
                    return {success:true}
                  } catch (error) {
                     console.log(error) 
                     return {success:false,error:error instanceof AppwriteException ? error : undefined}
                  }
            },
            async logout(){
                try {
                   await account.deleteSession("current")
                   set({session:null,user:null,jwt:null}) 
                } catch (error) {
                    console.log(error)
                }
            }
        }) ),
        {
            name: 'auth',
            onRehydrateStorage(){
                return (state,error) => {
                    if(!error) state?.setHydrated()
                }
            }
        }
    )
)














