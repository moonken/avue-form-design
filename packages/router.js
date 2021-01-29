import VueRouter from "vue-router";
import Login from "@/pages/login";
import ContentTypeList from "@/pages/content-type-list";
import ContentList from "@/pages/content-list";
import ContentDesigner from "@/pages/content-designer";
import SpaceList from "@/pages/space-list";
import SpaceLayout from "@/pages/space-layout";

export const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes:[
        {
            path: '/',
            redirect: '/spaces'
        },
        {
            name: 'login', path: '/login', component: Login ,
        },
        {
            name: 'spaces', path: '/spaces', component: SpaceList ,
        },
        {
            name: 'spaceHome', path: '/spaces/:spaceId', component: SpaceLayout ,
            children: [
                {
                    name: 'space', path: '/', component: ContentTypeList ,
                },
                {
                    name: 'contentType', path: '/content-types/:id', component: ContentList ,
                },
                {
                    name: 'contentTypeDesigner', path: '/content-types/:id/designer', component: ContentDesigner ,
                }
            ]
        },

    ]
});