// import HelloWorld from "./components/HelloWorld.vue";
// import HomeIndex from "./components/Home.vue";
import SubjectIndex from "./components/SubjectIndex.vue";
import StudentsIndex from "./components/StudentsIndex.vue";
import ClassroomIndex from "./components/ClassroomIndex.vue";
import RegistrationsIndex from "./components/RegistrationIndex.vue";


// const Home = resolve => {
//     require.ensure(["./components/HelloWorld.vue"], () => {
//         resolve(require("./components/HelloWorld.vue"));
//     });
// };


export const routes = [{
        path: "*",
        redirect: {
            name: "students"
        }
    },

    {
        path: "/students",
        components: {
            Index: StudentsIndex
        },
        name: "students"


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
        path: "/registrations",
        components: {
            Index: RegistrationsIndex
        }
    },
];