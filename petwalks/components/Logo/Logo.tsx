
import Image from "next/image"

export  function Logo() {
  
  return (
    <div className="min-h-20 h-20 flex items-center px-6 border-b cursor-pointer gap-2" /*onClick={() => router.push("/")}*/>
      
      <Image src="/images/logo192.png" alt="Logo" width={30} height={30} priority/>
      <h1 className="font-bold text-xl">Pet Walks Console</h1>
      </div>
  )
}
