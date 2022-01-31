export default {
  setPosts(state,posts){
      state.posts = posts;
  },
  setSinglePost(state,post){
      state.singlePost = post;
  },
  removeSinglePost(state){
    state.singlePost = {};
  }
}
