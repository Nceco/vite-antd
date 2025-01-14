import { createWebHashHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to,from,next) => {
  if(to.path === '/login'){
    return next()
  }else{
    const loginInfo = localStorage.getItem('loginInfo')
    if(!loginInfo){
      return next('/login')
    }
  }
})

export default router;
