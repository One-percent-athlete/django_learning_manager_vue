<template>
    <article class="media box">
        <div class="media-content">
            <div class="content">
                <p>
                    <strong>{{ comment.title }}</strong><small class="ml-2">({{ comment.created_at }})</small><br>
                    {{ comment.content }}
                </p>
            </div>
        </div>
    </article>
</template>

<script>
export default {
    props: ['comment']
}
</script>