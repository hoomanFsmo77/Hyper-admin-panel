import {useRoute,useRouter} from "vue-router";
import {onMounted, reactive, ref, watch} from "vue";
import {envVariable,useAuthStore,useDashboardStore,useServerStore} from "../useStates";
import { useNotification } from "@kyvg/vue3-notification";
import {querySerialize} from "../../utils/Helper";

export const useEdit=()=>{
    const { notify }  = useNotification();
    const { getServerIP }  = useServerStore();
    const fetchFlag=ref<boolean>(false);
    const editFetchFlag=ref<boolean>(false);
    const editUserForm=ref<HTMLFormElement|null>(null);
    const route=useRoute();
    const router=useRouter();
    const {apiBase}=envVariable();
    const {token}=useAuthStore();
    const {dashboardStore}=useDashboardStore();
    const userInitialData=reactive({
        username:'',
        telegram_id:'',
        phone:'',
        email:'',
        traffic:{
            num:0 as number|string,
            unit:''
        }
    })

    onMounted(async ()=>{
        dashboardStore.showPreloaderFlag=true
        fetchFlag.value=false
       const username=route.query.username
        fetch(apiBase+`get-users?username=${username}`,{
            headers:{
                'Content-type':'application/json',
                Authorization:`Bearer ${token.value}`
            }
        }).then(response=>response.json()).then((response)=>{
            if(response.detail){
                console.log(response.detail)
                notify({
                    type:'error',
                    title:'Edit User',
                    text:'error in finding user'
                })
                router.push({name:'USERS'})
            }else{
                const {user,telegram_id,phone,email,traffic}=response;
                const idx=traffic.indexOf('G')===-1 ?  traffic.indexOf('M') : traffic.indexOf('G');
                userInitialData.username=user
                userInitialData.telegram_id=telegram_id
                userInitialData.phone=phone===0 ? '' : phone
                userInitialData.email=email
                userInitialData.traffic.num=traffic ? Number(traffic.slice(0,idx-1)) : ''
                userInitialData.traffic.unit=traffic.includes('Gigabyte') ? 'Gigabyte' : traffic.includes('Megabyte') ? 'Megabyte' : 'Gigabyte'
                fetchFlag.value=true
            }
        }).catch(err=>{
            notify({
                type:'error',
                title:'Error',
                text:'error in finding user'
            })
            router.push({name:'USERS'})
        }).finally(()=>{
            dashboardStore.showPreloaderFlag=false
        })
    })

    const editUserFormSubmit =async (formData) => {
        editFetchFlag.value=true
        const query=querySerialize({
            username:formData.e_username,
            telegram_id :formData.e_telegram_id,
            phone:Number(formData.e_phone),
            email:formData.e_email,
            traffic:formData.e_traffic ? `${formData.e_traffic} ${formData.e_traffic_unit}` : '',
            server:getServerIP.value
        })
        fetch(apiBase+'change-detail?'+query,{
            headers:{
                'Content-type':'application/json',
                Authorization:`Bearer ${token.value}`
            }
        }).then(response=>response.json()).then((response)=>{
            if(response.detail){
                notify({
                    type:'error',
                    title:'Edit User',
                    text:response.detail
                })
            }else{
                editFetchFlag.value=false
                notify({
                    type:'success',
                    title:'Edit User',
                    text:'users info edited successfully!'
                })
                router.push({name:'USERS'})
            }
        }).catch(err=>{
            notify({
                type:'error',
                title:'Edit User',
                text:'operation failed due to network connection!'
            })
        })
    }
    const submitForm = () => {
        if(editUserForm.value){
            const node = (editUserForm.value as any).node
            node.submit()
        }
    };


    return{
        fetchFlag,userInitialData,editUserForm,editUserFormSubmit,submitForm,editFetchFlag
    }
}