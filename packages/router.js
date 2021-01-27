import VueRouter from "vue-router";
import Login from "@/pages/login";
import ContentTypeList from "@/pages/content-type-list";
import ContentList from "@/pages/content-list";
import ContentDesigner from "@/pages/content-designer";

export const router = new VueRouter({
    mode: 'history',
    routes:[
        {
            path: '/',
            redirect: '/content-types'
        },
        {
            name: 'login', path: '/login', component: Login ,
        },
        {
            path: '/content-types', component: ContentTypeList ,
        },
        {
            path: '/content-types/:id', component: ContentList ,
        },
        {
            path: '/content-types/:id/designer', component: ContentDesigner ,
        }
    ]
});