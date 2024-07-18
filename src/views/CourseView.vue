<template>
    <div class="courses">
      <div class="hero is-info">
        <div class="hero-body has-text-centered">
          <h1 class="title">{{ course.title }}</h1>

          <router-link 
          class="subtitle"
          :to="{name: 'Author', params: {id: course.created_by.id }}"
          >
            By {{ course.created_by.first_name + ' ' + course.created_by.last_name}}
          </router-link>
        </div>
      </div>

        <section class="section">
            <div class="container">
                <div class="columns content">
                  <div class="column is-2">
                    <h2>Table of contents</h2>

                    <ul>
                      <li 
                        v-for="lesson in lessons"
                        v-bind:key="lesson.id"
                      >
                        <a @click="setActiveLesson(lesson)">{{ lesson.title }}</a>
                      </li>
                      
                    </ul>

                  </div>
                  
                  <div class="column is-10">
                    <template v-if="$store.state.user.isAuthenticated">
                      <template v-if="activeLesson">
                        <h2>{{ activeLesson.title }}</h2>

                        <span 
                        class="button tag is-success"
                        v-if="activity.status === 'inprogress'"
                        @click="trackDone()"
                        >In Progress(Mark As Done)</span>

                        <span 
                        class="tag is-warning"
                        v-else>Done</span>

                        <hr>

                        {{ activeLesson.long_description }}

                        <hr>

                        <template v-if="activeLesson.lesson_type === 'quiz'">
                          <QuizView 
                            v-bind:quiz="quiz"
                          />
                        </template>

                        <template v-if="activeLesson.lesson_type === 'video'">
                          <VideoView 
                            v-bind:video="activeLesson.video_id"
                          />
                        </template>


                        <template v-if="activeLesson.lesson_type === 'article'">
                          <CommentView 
                            v-for="comment in comments"
                            v-bind:key="comment.id"
                            v-bind:comment="comment"
                          />
                          <hr>

                          <AddCommentView
                            v-bind:course="course"
                            v-bind:activeLesson="activeLesson"
                            v-on:submitComment="submitComment"
                          />
  

                        </template>
                      </template>
                      <template v-else>
                        <p>{{ course.long_description }}</p>
                      </template>
                    </template>
                    <template v-else>
                      <h2>Access Denied..</h2>
                      <p>You Need To <router-link to="/login">Login</router-link> Or
                        <router-link to="/signup">Sign Up</router-link></p>
                        <p><router-link to="/">Home</router-link></p>
                    </template>
                  </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import CommentView from '@/components/CommentView.vue';
import AddCommentView from '@/components/AddCommentView.vue';
import QuizView from '@/components/QuizView.vue';
import VideoView from '@/components/VideoView.vue';

export default {
  components: {
    CommentView,
    AddCommentView,
    QuizView,
    VideoView,
  },

    data() {
      return {
          course: {
          created_by: {
            id: 0
          }
        },
          lessons: [],
          comments:[],
          activeLesson: null,
          errors: [],
          quiz: {}, 
          activity: {}
      }
    },

    mounted() {
      const slug = this.$route.params.slug
      axios
      .get(`/api/v1/courses/${slug}/`)
      .then(response => {
          this.course = response.data.course
          this.lessons = response.data.lessons
      })

      document.title = this.course.title + ' | IStudy'
    },

    methods: {
      submitComment(comment) {
        this.comments.push(comment)
      },
  
      setActiveLesson(lesson) {
        this.activeLesson = lesson

        if (lesson.lesson_type === 'quiz') {
          this.getQuiz()
        } else {
          this.getComments()
        }
        this.trackProgress()
      },
      trackProgress() {
        axios
        .post(`/api/v1/activities/track_progress/${this.$route.params.slug}/${this.activeLesson.slug}/`)
        .then(response => {
          console.log(response.data)

          this.activity = response.data
        })
      }, 

      trackDone() {
        axios
        .post(`/api/v1/activities/track_done/${this.$route.params.slug}/${this.activeLesson.slug}/`)
        .then(response => {
          console.log(response.data)

          this.activity = response.data
        })
      },



      getQuiz() {
        axios
        .get(`/api/v1/courses/${this.course.slug}/${this.activeLesson.slug}/quizzes/`)
        .then(response => {
          console.log(response.data)

          this.quiz = response.data
        })
      },
      getComments() {
        axios
        .get(`/api/v1/courses/${this.course.slug}/${this.activeLesson.slug}/comments/`)
        .then(response => {
          console.log(response.data)

          this.comments = response.data
        })

      }
    }

}

</script>