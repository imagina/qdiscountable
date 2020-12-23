const pages = config('pages') // Get Pages from config

//E-commerce
export default [
  {
    title: 'qdiscountable.sidebar.adminGroup',
    icon: 'fas fa-ticket-alt',
    children: [
      pages.qdiscountable.discounts,
    ]
  }
]
