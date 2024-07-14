<template>
  <div class="home">
    <div class="hero is-info is-medium">
      <div class="hero-body has-text-centered">
        <h1 class="title">Welcome To IStudy</h1>
        <h2 class="subtitle">Start Your Learning Journey With Thousands Of Courses And Outstanding Teachers And Mentors</h2>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-4">
            <div class="box has-text-centered">
              <span class="icon is-size-2 has-text-info">
                <i class="fas fa-clock"></i>
              </span>
              <h2 class="is-size-4 mt-4 mb-4">Whenever you want</h2>
              <p>This is just some test content</p>
            </div>
          </div>
          <div class="column is-4">
            <div class="box has-text-centered">
              <span class="icon is-size-2 has-text-info">
                <i class="fas fa-users"></i>
              </span>
              <h2 class="is-size-4 mt-4 mb-4">Study Together</h2>
              <p>This is just some test content</p>
            </div>
          </div>
          <div class="column is-4">
            <div class="box has-text-centered">
              <span class="icon is-size-2 has-text-info">
                <i class="fas fa-home"></i>
              </span>
              <h2 class="is-size-4 mt-4 mb-4">Wherever You Want</h2>
              <p>This is just some test content</p>
            </div>
          </div>
          <div class="column is-12 has-text-centered">
            <a href="#" class="button is-info is-size-3 mt-6 mb-6">Click To Enroll</a>
          </div>

          <hr>

          <div 
          class="column is-3"
          v-for="course in courses"
          v-bind:key="course.id"
          >
              <CourseCardView :course="course"/>
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
  name: 'HomeView',
  data() {
        return {
            courses: []
        }
  },
  components: {
      CourseCardView
  },
  mounted() {
      axios
          .get('/api/v1/courses/homepage_courses/')
          .then(response => {
              this.courses = response.data
          })
  }
}
</script>
