<template>
    <form v-on:submit.prevent="submitComment()">
        <div 
        class="notification is-danger my-2"
        v-for="error in errors"
        v-bind:key="error"
        >{{ error }}
        </div>


        <div class="field">
            <label class="label">Title</label>
            <div class="control">
            <input type="text" class="input" v-model="comment.title">
            </div>
        </div>

        <div class="field">
            <label class="label">Content</label>
            <div class="control">
            <textarea class="textarea" v-model="comment.content"></textarea>
            </div>
        </div>

        <div class="field mt-4">
            <div class="control">
            <button class="button is-link">Submit</button>
            </div>
        </div>
    </form>

</template>

<script>
import axios from 'axios';

export default {
    props: [
        'course',
        'activeLesson', 
    ],
    data() {
        return {
            comment: {
                name: '',
                content: '',
            },
            errors: []
        }
    },

    methods: {
        submitComment() {

            this.errors = []

            if (this.comment.title === '') {
            this.errors.push('The Title Field Must Be Filled Out')
            }

            if (this.comment.content === '') {
            this.errors.push('The Content Field Must Be Filled Out')
            }

            if (!this.errors.length) {
            axios
                .post(`/api/v1/courses/${this.$route.params.slug}/${this.activeLesson.slug}/`, this.comment)
                .then(response => {
                    this.comment.title = ""
                    this.comment.content = ""

                    this.$emit('submitComment', response.data)
                })
                .catch(error => {
                    console.log(error)
                })
            }

        },

    }
}

</script>