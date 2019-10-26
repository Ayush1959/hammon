import HelloWorld from "./components/HelloWorld.vue";
import HomeIndex from "./components/Home.vue";
import SubjectIndex from "./components/SubjectIndex.vue";
import StudentsIndex from "./components/StudentsIndex.vue";
import ClassroomIndex from "./components/ClassroomIndex.vue";

const Home = resolve => {
    require.ensure(["./components/HelloWorld.vue"], () => {
        resolve(require("./components/HelloWorld.vue"));
    });
};


export const routes = [{
        path: "/",
        components: {
            Index: HomeIndex
        }
    },
    {
        path: "/home",
        components: {
            Index: HelloWorld
        }

    },
    {
        path: "/students",
        components: {
            Index: StudentsIndex
        }

    },
    {
        path: "/subjects",
        components: {
            Index: SubjectIndex
        }

    },
    {
        path: "/classrooms",
        components: {
            Index: ClassroomIndex
        }

    },
    {
        path: "/test",
        component: Home,
        name: "Home"
    },
];