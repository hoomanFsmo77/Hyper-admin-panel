
export default {
    updated:function (el:HTMLElement, binding:{oldValue:string|number,value:string|number}) {
        if(binding.oldValue===binding.value){
            return;
        }
        if(binding.value){
            el.classList.remove('v-collapse')
            let height=window.getComputedStyle(el).height
            el.style.height='0'
            el.classList.add('v-collapsing')
            el.offsetHeight;
            el.style.height=height
            el.ontransitionend=()=>{
                el.classList.remove('v-collapsing')
                el.classList.add('v-collapse')
                el.classList.add('show');
                // @ts-ignore
                el.style.height = null
            }


        }else{
            el.classList.remove('v-collapse')
            el.classList.remove('show')
            el.style.height=window.getComputedStyle(el).height
            el.offsetHeight;
            el.classList.add('v-collapsing')
            el.style.height='0'
            el.ontransitionend=()=>{
                el.classList.remove('v-collapsing')
                el.classList.add('v-collapse')
                // @ts-ignore
                el.style.height=null
            }
        }

    }
}

// @tailwind components;
// @layer components {
// .v-collapse:not(.show) {
//     @apply hidden;
//     }
//
// .v-collapsing {
//     @apply h-0 overflow-hidden transition-all duration-300 ease-in-out;
//     }
// }