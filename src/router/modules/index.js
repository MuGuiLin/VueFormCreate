import Home from '@/views/Index.vue';

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
      },
      {
        path: '/form',
        name: 'Form',
        component: () => import('@/views/Form/index.vue')
      },
      {
        path: '/table',
        name: 'Table',
        component: () => import( '@/views/Table/index.vue')
      },
      {
        path: '/qrcode',
        name: 'Qrcode',
        component: () => import('@/views/Qrcode/index.vue')
      },
      {
        path: '/draggable',
        name: 'Draggable',
        component: () => import('@/views/Draggable/index.vue'),
        children: [
          {
            path: '/',
            name: 'Demo',
            component: () => import('@/views/Draggable/Demo.vue')
          },
          {
            path: '/draggable/many',
            name: 'Many',
            component: () => import('@/views/Draggable/Many.vue')
          },
          {
            path: '/draggable/table',
            name: 'Table',
            component: () => import('@/views/Draggable/Table.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/Create',
    name: 'Create',
    component: () => import( '@/views/Create/index.vue')
  },
  {
    path: '/preview',
    name: 'Preview',
    component: () => import('@/views/Preview/index.vue')
  },
  {
    path: '*',
    component: () => import('@/views/NotFound.vue')
  },
];
