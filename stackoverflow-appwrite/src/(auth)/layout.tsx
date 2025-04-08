import { useAuthStore } from "@/Store/Auth";
import { useRouter } from "next/router";
import React from "react";

const layout = ({children}:{children:React.ReactNode})=>{

  const {session} = useAuthStore()
  const router = useRouter()

  React.useEffect(()=>{
      if(session){
        router.push('/')
      }
  },[session,router])
  if(session){
    return null
  }

  return (
    <div className="">
      <div className="">{children}</div>
    </div>
  )
}

export default layout;