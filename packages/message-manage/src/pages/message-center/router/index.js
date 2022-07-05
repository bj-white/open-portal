const routes = [
  {
    path: '/list',
    component: () => import('../component/ListCom.vue')
  },
  {
    path: '/detail',
    component: () => import('../component/DetailCom.vue')
  }
]

export default routes