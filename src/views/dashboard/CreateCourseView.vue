<template>
    <div class="about">
      <div class="hero is-info">
        <div class="hero-body has-text-centered">
          <h1 class="title">Create Course</h1>
        </div>
      </div>
  
      <section class="section">
          <div class="mb-6 px-6 py-4">
            <h2 class="subtitle">Course Information</h2>

            <div class="field mt-2">
                <label>
                    Title
                </label>
                <input type="text" class="input" v-model="form.title">
            </div>

            <div class="field mt-2">
                <label>
                    Short Description
                </label>
                <textarea type="textarea" class="textarea" v-model="form.short_description"></textarea>
            </div>

            <div class="field mt-2">
                <label>
                    Long Description
                </label>
                <textarea type="text" class="textarea" v-model="form.long_description"></textarea>
            </div>

            <div class="field mt-2">
                <label>
                    Category
                </label>
                <br>
                <div class="select is-multiple">
                    <select multiple size="6" v-model="form.categories">

                        <option 
                        v-for="category in categories"
                        v-bind:value="category.id"
                        v-bind:key="category.id"
                        >{{ category.title }}</option>
                    </select>
                    </div>
            </div>
        
        </div>

        <div class="mb-6 px-6 py-4">
            <h2 class="subtitle">Lessons</h2>

            <div
            v-for="(lesson, index) in form.lessons"
            v-bind:key="index"
            class="mb-4"
            >

                <h3 class="subtitle is-size-6">Lesson</h3>
                <div class="field mt-2">
                    <label>
                        Title
                    </label>
                    <input 
                    type="text" class="input" v-model="lesson.title"
                    :name="`form.lessons[${index}][title]`"
                    >
                </div>

                <div class="field mt-2">
                    <label>
                        Short Description
                    </label>
                    <textarea type="textarea" class="textarea" v-model="lesson.short_description" :name="`form.lessons[${index}][short_description]`"></textarea>
                </div>

                <div class="field mt-2">
                    <label>
                        Long Description
                    </label>
                    <textarea type="text" class="textarea" v-model="lesson.long_description" :name="`form.lessons[${index}][long_description]`"></textarea>
                </div>

                <hr>
            </div>


            <button class="button is-primary" @click="addLesson()">Add Lesson</button>
        </div>

        <div class="field buttons mt-4">
            <button class="button is-success" @click="submitForm('draft')">Save As Draft</button>
            <button class="button is-info" @click="submitForm('in_review')">Submit For Review</button>
        </div>
      </section>

    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
        form: {
            title: '',
            short_description: '',
            long_description: '',
            categories: [],
            status: '',
            lessons: []
        },
        categories: []
    }
  },

  mounted() {
    this.getCategories()
  },

  methods: {
      getCategories() {
        console.log('getCategories')

        axios
        .get('/api/v1/courses/get_categories/')
        .then(response => {
            console.log(response.data)

            this.categories = response.data
        })
      },

      submitForm(status) {
        console.log('submitForm')
        console.log(this.form)

        this.form.status = status

        axios
        .post('/api/v1/courses/create_course/', this.form)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log('error:', error)
        })
      },

      addLesson() {
        this.form.lessons.push({
            title: '',
            short_description: '',
            long_description: '',

        })
      }
  }
}
</script>
  