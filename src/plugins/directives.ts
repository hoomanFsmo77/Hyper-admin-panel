import vCollapsible from '../directive/vCollapsible'
import vFade from '../directive/vFade'

export default defineNuxtPlugin(nuxtApp=>{
    nuxtApp.vueApp.directive('collapse',vCollapsible)
    nuxtApp.vueApp.directive('fade',vFade)
})