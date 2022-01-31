<template>
    <div>
        <Nav />
        <div class="auto container">
            <div class="row">
                <div class="col-12 mt-5">
                    <label for="formGroupExampleInput" class="form-label">Auto Complete</label>
                    <input
                        type="text"
                        class="form-control"
                        id="formGroupExampleInput"
                        placeholder="Example input placeholder"
                        autocomplete="off"
                        v-model="input"
                        @input="funFilterData()"
                    />
                    <div class="list-group">
                        <!-- loading -->
                        <a
                            v-if="loading"
                            href="#"
                            class="list-group-item list-group-item-action"
                        >loading ...</a>
                        <!-- item autocomplete -->
                        <a
                            v-else
                            v-show="showList"
                            v-for="(post, i) in filterData"
                            :key="i"
                            href="#"
                            class="list-group-item list-group-item-action"
                            v-html="post.title"
                            @click.prevent="subClickItem(post)"
                        ></a>
                    </div>
                </div>
            </div>
        </div>
        <CardPost v-if="(Object.keys(singlePost).length)" />
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
    name: "autoComplete",
    data: () => ({
        showList: true,
        input: '',
        filterData: [],
        loading: false,
        loadings: false,
        p: {}
    }),
    async created() {
        this.p = {}
    },
    computed: {
        ...mapGetters('post', ['posts', 'singlePost']),
        ...mapState('post', { sPost: state => state.singlePost })
    },

    methods: {
        ...mapActions('post', ['getPosts', 'getSinglePost']),

        async funFilterData() {
            console.log(Object.keys(this.posts).length)
            if (Object.keys(this.posts).length < 1) {
                console.log("No posts")
                this.loading = true;
                try {
                    await this.getPosts()
                } catch (e) {
                    console.log(e)
                    this.loading = false;
                }
                this.loading = false;
            }


            if (this.input.length >= 1) {
                this.input = this.input.toLowerCase()
                this.filterData = this.posts.filter((input) => {
                    return input.title.includes(this.input)
                })
            } else {
                this.filterData = []
            }
        },

        async subClickItem(post) {
            this.loading = true;
            this.p = {}
            console.log(post)
            console.log(this.sPost)
            this.input = post.title
            this.filterData = []

            this.$store.commit('post/removeSinglePost')

            try {
                setTimeout(async () => {
                    await this.getSinglePost(post.id)
                    this.loading = false;
                }, 1000)

            } catch (e) {
                console.log(e)
                this.loading = false;
            }

        }
    }
}
</script>


<style scoped lang="scss">
.auto {
    .form-control {
        border-radius: 50px;
    }

    .list-group {
        padding-top: 10px;
        max-height: 200px;
        overflow-y: auto;
        .list-group-item {
            border: none;
            border: none;
            padding: 5px 10px;
            font-size: 14px;
            color: #c8c8c8;
        }
    }
}
</style>
