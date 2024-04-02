import { createRouter, createWebHistory } from 'vue-router';
import About from '../views/About.vue';
import Album from '../views/Album.vue';
import Chat from '../views/Chat.vue';
import GetList from '../views/GetList.vue';
import Home from '../views/Home.vue';
import Posts from '../views/Posts.vue';
import Productos from '../views/Productos.vue';
import Publicacion from '../views/Publicacion.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/',
        name: 'About',
        component: About
    },
    {
        path: '/',
        name: 'GetList',
        component: GetList
    },
    {
        path: '/perfil/:id',
        name: 'Posts',
        component: Posts,
        props: true
    },
    {
        path: '/publicacion/:id',
        name: 'Publicacion',
        component: Publicacion,
        props: true
    },
    {
        path: '/album/:id',
        name: 'Album',
        component: Album,
        props: true
    },
    {
        path: '/chat',
        name: 'Chat',
        component: Chat
    },
    {
        path: '/productos',
        name: 'Productos',
        component: Productos
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;