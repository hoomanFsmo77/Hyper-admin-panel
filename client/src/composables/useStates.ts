import {Auth} from '../store/auth'
import {Dashboard} from "../store/dashboard";
import {computed} from "vue";

export const envVariable=()=>{
    const apiBase:string|undefined=process.env.API_BASE;
    const cookieName:string|undefined=process.env.COOKIE_NAME;
    const apiKey:string|undefined=process.env.API_KEY;



    return{
        apiBase,cookieName,apiKey
    }
}

export const useAuthStore=()=>{
    const authStore=Auth()
    const username=computed<string>(()=>authStore.username)
    const isLogin=computed<boolean>(()=>authStore.isLogin)
    const token=computed<string>(()=>authStore.token)


    return {authStore,username,isLogin,token}
}


export const useDashboardStore=()=>{
    const dashboardStore=Dashboard()
    const sidebarCollapseFlag=computed<boolean>(()=>dashboardStore.sidebarCollapseFlag)
    const showPreloaderFlag=computed<boolean>(()=>dashboardStore.showPreloaderFlag)
    const fetchDashboardDataFlag=computed(()=>dashboardStore.fetchDashboardDataFlag)
    const usersStatusData=computed(()=>dashboardStore.usersStatusData)
    const serverStatus=computed(()=>dashboardStore.serverStatus)

    const windowWidth:null|number= window.innerWidth

    return{
        sidebarCollapseFlag,windowWidth,dashboardStore,showPreloaderFlag,fetchDashboardDataFlag,usersStatusData,serverStatus
    }
}