<template>
    <div class="container mt-5">
        <!-- <span>{{singlePost}}</span> -->
        <div class="card border-dark mb-3 w-100">
            <div class="card-header" v-text="singlePost.id"></div>
            <div class="card-body text-dark">
                <h5 class="card-title" v-text="singlePost.title"></h5>
                <p class="card-text" v-text="singlePost.body"></p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {

    // props: ['post'],
    computed: {
        ...mapGetters('post', ['singlePost'])
    }

}
</script>
