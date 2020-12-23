<template>
  <div id="pageId" class="q-layout-page layout-padding">

    <div class="relative-position q-mb-lg backend-page">
      <div class="box">
        <q-form @submit="$route.params.id ? updateItem() : createItem()" ref="formContent"
                @validation-error="$alert.error($tr('ui.message.formInvalid'))"
                class="row q-col-gutter-x-md" autocomplete="off">
          <!-- Left Form -->
          <div class="col-md-6">
            <!--Code-->
            <q-input v-model="form.code" type="text" outlined dense :label="$tr('qdiscountable.layout.form.code')">
              <template v-slot:after>
                <q-btn @click="generateCoupon()" round size="sm" color="primary" icon="fas fa-qrcode">
                  <q-tooltip>Generate Code</q-tooltip>
                </q-btn>
              </template>
            </q-input>

            <q-select outlined dense bg-color="white" v-model="form.criteria"
                      :label="`${$tr('qdiscountable.layout.form.criteria')}*`" style="width: 100%;"
                      :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                      emit-value map-options :options="[
                        {label: this.$tr('qdiscountable.layout.options.fixedValue'), value: 'fixed'},
                        {label: this.$tr('qdiscountable.layout.options.percentage'), value: 'percentage'},
                      ]"/>

            <q-input v-model="form.value" type="number" outlined dense
                     :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                     :label="`${$tr('qdiscountable.layout.form.discount')} *`"/>

            <dynamic-field :field="dynamicFields.rules" v-model="form.rules" />
          </div>

          <!-- Right Form -->
          <div class="col-md-6">
            <!--name-->
            <q-input v-model="form.name" type="text" outlined dense
               :label="`${$tr('ui.form.name')}*`" :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
            />

            <q-select outlined dense bg-color="white" v-model="form.type"
                      :label="`${$tr('qdiscountable.layout.form.type')}*`" style="width: 100%;"
                      :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                      emit-value map-options :options="[
                        {label: $tr('qdiscountable.layout.options.coupon'), value: 'coupon'},
                        {label: $tr('qdiscountable.layout.options.discount'), value: 'discount'},
                      ]"/>
            <q-select outlined dense bg-color="white" v-model="form.status"
                      :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                      :label="`${$tr('ui.form.status')}*`" style="width: 100%;"
                      emit-value map-options :options="[
                        {label: $tr('ui.label.enabled'), value: 1},
                        {label: $tr('ui.label.disabled'), value: 0},
                      ]"/>
          </div>
          <q-page-sticky
            position="bottom-right"
            :offset="[18, 18]">
            <!--Update button-->
            <q-btn v-if="$route.params.id" color="positive" :loading="loading"
                   icon="fas fa-edit" :label="$tr('ui.label.update')" type="submit"/>
            <!--Save button-->
            <q-btn v-else color="positive" :loading="loading" icon="fas fa-edit"
                   :label="$tr('ui.label.create')" type="submit"/>
          </q-page-sticky>
        </q-form>
        <inner-loading :visible="loading"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data () {
      return {
        loading: false,
        types: [],
        products: {
          data: [],
          loading: false
        },
        categories: {
          data: [],
          loading: false
        },
        form: {
          id: '',
          code: '',
          type: null,
          discount: '',
          name: '',
          criteria: null,
          status: null,
          rules: [],
        },
      }
    },
    computed: {
      dynamicFields(){
        return {
          rules:{
            type: 'select',
            props:{
              label: this.$tr('qdiscountable.layout.form.rules'),
              multiple: true,
              clearable: true,
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qruleable.rules',
              select: {label: 'name', id: 'id'},
            },
          }
        }
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.initForm()
      })
    },
    methods: {
      initForm () {
        if (this.$route.params.id) this.getData()
      },
      getData () {
        this.loading = true
        let params = {
          refresh: true,
          params: {
            include: 'rules'
          }
        }
        this.$crud.show('apiRoutes.qdiscountable.discounts', this.$route.params.id, params)
          .then(response => {
            Object.assign(this.form, { ...response.data })
            setTimeout(() => {
              this.form.productId = response.data.productId
              this.form.categoryId = response.data.categoryId
              this.loading = false
            }, 1000)
          }).catch(error => {
          this.$alert.error({ message: this.$tr('ui.message.errorRequest'), pos: 'bottom' })
          this.loading = false
        })
      },
      createItem () {
        this.loading = true
        this.$crud.create('apiRoutes.qdiscountable.discounts', this.form)
          .then(response => {
            this.loading = false
            this.$router.push({ name: 'qdiscountable.admin.discounts.index' })
            this.$alert.success({ message: `${this.$tr('ui.message.recordCreated')} ID: ${response.data.id}` })
          })
          .catch(error => {
            this.loading = false
            this.$alert.error({ message: this.$tr('ui.message.recordNoCreatde'), pos: 'bottom' })
          })
      },
      updateItem () {
        this.loading = true
        this.$crud.update('apiRoutes.qdiscountable.discounts', this.form.id, this.form)
          .then(response => {
            this.loading = false
            this.$router.push({ name: 'qdiscountable.admin.discounts.index' })
            this.$alert.success({ message: `${this.$tr('ui.message.recordUpdated')}` })
            this.initForm()
          })
          .catch(error => {
            this.loading = false
            this.$alert.error({ message: this.$tr('ui.message.recordNoUpdated'), pos: 'bottom' })
          })
      },
      generateCoupon () {
        this.form.code = this.makeCouponCode(20).toUpperCase()
      },
      makeCouponCode (length = 10) {
        let result = ''
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let charactersLength = characters.length
        for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
      },
    }
  }
</script>

