<template>
    <div class="courses">
      <div class="hero is-info">
        <div class="hero-body has-text-centered">
          <h1 class="title">Courses</h1>
          <h2 class="subtitle">Find Evenything You Want To Learn</h2>
        </div>
      </div>

    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="column is-2">
                    <aside class="menu">
                        <p class="menu-label">Categories</p>
                        <ul class="menu-list">
                            <li>
                                <a 
                                v-bind:class="{'is-active': !activeCategory}"
                                @click="setActiveCategory(null)"
                                >
                                All Courses
                            </a>
                            </li>
                            <li 
                            class="my-1"
                            v-for="category in categories"
                            v-bind:key="category.id"
                            @click="setActiveCategory(category)"
                            ><a>
                                {{ category.title }}
                            </a>
                            </li>
                        </ul>
                    </aside>
                </div>

                <div class="column is-10">
                    <div class="columns is-multiline">
                        <div 
                        class="column is-4"
                        v-for="course in courses"
                        v-bind:key="course.id"
                        >
                            <CourseCardView :course="course"/>
                        </div>
                        

                        <div class="column is-12">
                            <nav class="pagination">
                                <a class="pagination-previous">Previous</a>
                                <a class="pagination-next">Next</a>
                                <ul class="pagination-list">
                                    <li><a class="pagination-link is-current">1</a></li>
                                    <li><a class="pagination-link ">2</a></li>
                                    <li><a class="pagination-link ">3</a></li>
                                    <li><a class="pagination-link ">4</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
</template>
  
<script>
import axios from 'axios';
import CourseCardView from '@/components/CourseCardView.vue' 
export default {
    data() {
        return {
            courses: [],
            categories: [],
            activeCategory: null
        }
    },
    components: {
        CourseCardView
    },
    async mounted() {

        await axios
        .get('/api/v1/courses/get_categories/')
        .then(response => {
            console.log(response.data)

            this.categories = response.data
        })
        this.get_courses()
        
        document.title = 'Courses | IStudy'
    },

    methods: {
        setActiveCategory(category) {
            this.activeCategory = category
            console.log(this.activeCategory)
           
            this.get_courses()
        },
        get_courses() {

            let url = '/api/v1/courses/'

            if (this.activeCategory) {
                url += '?category_id=' + this.activeCategory.id
            }
            axios
            .get(url)
            .then(response => {
                this.courses = response.data
            })
        }
    }
}

</script>