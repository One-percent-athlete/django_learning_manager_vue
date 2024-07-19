<template>
    <div class="about">
      <div class="hero is-info">
        <div class="hero-body has-text-centered">
          <h1 class="title">Create Course</h1>
        </div>
      </div>
  
      <section class="section">
        <form v-on:submit.prevent="submitForm">
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

            <div class="field mt-4">
                <button class="button is-success">Submit</button>
            </div>
        </form>
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
            categories: []
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

      submitForm() {
        console.log('submitForm')
        console.log(this.form)

        axios
        .post('/api/v1/courses/create_course/', this.form)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log('error:', error)
        })
      }
  }
}
</script>
  