import Dashboard from './components/Dashboard'
import Developer from './components/Developer'
export const routes = [
  {path: '/', component: Dashboard},
  {path: '/developer', component: Developer},
  {path: '*', component: Dashboard}
]