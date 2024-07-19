<template>

    <nav class="navbar is-info is-medium" role="navigation" aria-label="main navigation" style="min-height : 5rem;">
        <div class="navbar-brand">
        <router-link class="navbar-item is-size-4" to="/">IStudy</router-link>
        </div>

        <div id="navbar-item" class="navbar-menu">
        <div class="navbar-start">
            <router-link to="/" class="navbar-item">Home</router-link>
            <router-link to="/about" class="navbar-item">About</router-link>
            <router-link to="/courses" class="navbar-item">Courses</router-link>
        </div>

        <div class="navbar-end">
            <div class="navbar-item">
            <div class="buttons">
                <template v-if="$store.state.user.isAuthenticated">
                    <router-link to="/dashboard/mypage" class="button is-info">My Page</router-link>
                    <router-link to="/dashboard/create-course" class="button is-primary">Create Course</router-link>
                </template>
                <template v-else>
                    <router-link to="/signup" class="button is-primary"><strong>Sign Up</strong></router-link>
                    <router-link to="/login" class="button is-light">Login</router-link>
                </template>
            </div>
        </div>
        </div>
        </div>
    </nav>

</template>

<script>

</script>