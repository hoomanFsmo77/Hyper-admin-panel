<template>
  <VBreadcrumb :pages="[{name:'Home',link:'DASHBOARD'},{name:'Users',link:'USERS'},{name:'Edit User'}]" />

  <row v-if="fetchFlag" class="mt-2">
    <column col="12">
      <VCard  body-class="!p-2">
        <template v-slot:title>
          edit user on <span class="text-secondary-light-2">{{getServerIP}}</span> server <router-link class="text-secondary-light-2 !text-[0.65rem] hover:underline" to='/servers'>Switch</router-link>
        </template>
        <template v-slot:body>
          <FormKit id="editUserForm" type="form" ref="editUserForm"  @submit="editUserFormSubmit"  :actions="false" >
            <row class="my-1">
              <column col="12" md="6">
                <FormKit
                    validation="required"
                    :value="userInitialData.username"
                    type="text"
                    id="e_username"
                    name="e_username"
                    input-class=" font-main"
                    label="Username"
                    label-class="dark:text-primary-dark-2 dark:!bg-[#37404a] !font-main"
                    :floating-label="true"
                />
              </column>
              <column col="12" md="6">
                <FormKit
                    :value="userInitialData.telegram_id"
                    type="text"
                    id="e_telegram_id"
                    name="e_telegram_id"
                    input-class=" font-main"
                    label="Telegram Id"
                    label-class="dark:text-primary-dark-2 dark:!bg-[#37404a] !font-main"
                    :floating-label="true"
                />
              </column>
            </row>
            <row>
              <column col="12" md="6">
                <FormKit
                    :value="userInitialData.phone"
                    validation="matches:/^0?9\d{9}$/"
                    type="text"
                    id="e_phone"
                    name="e_phone"
                    input-class=" font-main"
                    label="Phone Number"
                    label-class="dark:text-primary-dark-2 dark:!bg-[#37404a] !font-main"
                    :floating-label="true"
                />
              </column>
              <column col="12" md="6">
                <FormKit
                    :value="userInitialData.email"
                    validation="email"
                    type="text"
                    id="e_email"
                    name="e_email"
                    input-class=" font-main"
                    label="Email Address"
                    label-class="dark:text-primary-dark-2 dark:!bg-[#37404a] !font-main"
                    :floating-label="true"
                />
              </column>
            </row>
            <row  class="my-1">
              <column col="12" md="6">
                <FormKit
                    :value="userInitialData.traffic.num"
                    type="text"
                    id="e_traffic"
                    name="e_traffic"
                    input-class=" font-main"
                    label="Traffic"
                    label-class="dark:text-primary-dark-2 dark:!bg-[#37404a] !font-main"
                    :floating-label="true"
                />
                <FormKit
                    :value="userInitialData.traffic.unit"
                    name="e_traffic_unit"
                    id="e_traffic_unit"
                    fieldset-class="!border-[0px] dark:[&_*]!text-primary-light-1 !pl-0 !ml-0"
                    options-class="!flex gap-1 !flex-row"
                    type="radio"
                    :options="['Gigabyte', 'Megabyte']"
                    value="Gigabyte"
                    label-class="dark:!text-primary-light-1"
                />
              </column>
            </row>
          </FormKit>
          <div class="mt-1.5">
            <VBloader class="btn btn-indigo btn-md"
                      animation="slide-down"
                      :duration="2000"
                      @click="submitForm"
                      :loading="editFetchFlag"
            >
              Submit
            </VBloader>
          </div>
        </template>
      </VCard>
    </column>
  </row>
</template>

<script setup lang="ts">
import VBloader from '../../components/global/VBloader.vue'
import VBreadcrumb from '../../components/global/VBreadcrumb.vue'
import VCard from '../../components/global/VCard.vue'
import {useEdit} from "../../composables/users/useEdit";
import {useServerStore} from "../../composables/useStates";
const {fetchFlag,userInitialData,editUserForm,editUserFormSubmit,submitForm,editFetchFlag}=useEdit()
const {getServerIP}=useServerStore()

</script>

<style scoped>

</style>