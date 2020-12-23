<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qdiscountable.discounts',
          permission: 'discountable.discounts',
          extraFormFields: 'crud-fields.discountable.discounts',
          create: {
            title: this.$tr('qdiscountable.layout.newDiscount'),
            to: {name: 'qdiscountable.admin.discounts.create'}
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('ui.form.id'), field: 'id', align: 'left'},
              {name: 'name', label: this.$tr('ui.form.name'), field: 'name', align: 'left'},
              {name: 'code', label: this.$tr('qdiscountable.layout.form.code'), field: 'code', align: 'left'},
              {name: 'createdAt', label: this.$tr('ui.form.createdAt'), field: 'createdAt', align: 'left', format: val => this.$trd(val)},
              {name: 'actions', label: this.$tr('ui.form.actions'), align: 'right'},
            ],
            requestParams: {},
            filters: {},
          },
          update: {
            to : 'qdiscountable.admin.discounts.edit'
          },
          delete: true,
          formLeft: {},
        }
      }
    }
  }
</script>
