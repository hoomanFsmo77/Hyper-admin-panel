import {IUsers_Data,IServer_Status} from "~/utils/Types";

export const useDashboard=()=>{
    const {showPreloaderFlag}=useStates()
    const fetchDashboardDataFlag=useState<boolean>('fetchServerDataFlag',()=>false)
    const usersData=useState<IUsers_Data[]>('usersData',()=>[])
    const serverStatus=useState<IServer_Status>('serverStatus',()=>{
        return{
            cpu:0,
            ram:0,
            disk:0,
            bandWidth:{
                download:0,
                upload:0
            }
        }
    })
    const {public:{internalApiKey,internalApiBase}}=useRuntimeConfig()

    onMounted(async ()=>{
        showPreloaderFlag.value=true
        fetchDashboardDataFlag.value=false
        try {
            const serverStatusFetchRequest:IServer_Status=await $fetch('/api/dashboard/server',{
                headers:{Authorization:internalApiKey},
                baseURL:internalApiBase,
                credentials: "include",
            })
            const usersDataFetchRequest:IUsers_Data[]=await $fetch('/api/dashboard/users-status',{
                headers:{Authorization:internalApiKey},
                baseURL:internalApiBase,
                credentials: "include",
            })
            serverStatus.value=serverStatusFetchRequest
            usersData.value=usersDataFetchRequest
        }catch (err) {
            console.log(err)
        }finally {
            fetchDashboardDataFlag.value=true
            showPreloaderFlag.value=false
        }
    })



    return{
        serverStatus,fetchDashboardDataFlag,usersData
    }
}