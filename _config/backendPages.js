export default {
  discounts: {
    permission: 'discountable.discounts.index',
    activated: true,
    path: '/discounts',
    name: 'qdiscountable.admin.discounts.index',
    page: () => import('../_pages/admin/discounts/index'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qdiscountable.sidebar.adminDiscounts',
    icon: 'fas fa-ticket-alt',
    authenticated: true,
    subHeader:{
      refresh: true,
    }
  },
  discountsCreate: {
    permission: 'discountable.discounts.create',
    activated: true,
    path: '/discounts/create',
    name: 'qdiscountable.admin.discounts.create',
    page: () => import('../_pages/admin/discounts/form'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qdiscountable.sidebar.createDiscounts',
    icon: 'fas fa-ticket-alt',
    authenticated: true,
    subHeader:{
      breadcrumb: ['qdiscountable.discounts']
    }
  },
  discountsEdit: {
    permission: 'discountable.discounts.edit',
    activated: true,
    path: '/discounts/:id',
    name: 'qdiscountable.admin.discounts.edit',
    page: () => import('../_pages/admin/discounts/form'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qdiscountable.sidebar.editDiscounts',
    icon: 'fas fa-ticket-alt',
    authenticated: true,
    subHeader:{
      breadcrumb: ['qdiscountable.discounts']
    }
  },
}
