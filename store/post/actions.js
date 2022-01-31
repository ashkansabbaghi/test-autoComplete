import api from 'axios'
let URL_POST = 'https://jsonplaceholder.typicode.com/posts'
export default {

  async getPosts({
    commit
  }) {
    console.log('get posts')
    await api.get(URL_POST).then(res => {
      console.log(res)
      commit('setPosts', res.data)
    })

  },

  async getSinglePost({
    commit
  }, id) {
    // console.log(id)
    await api.get(`${URL_POST}/${id}`).then(res => {
      console.log(res.data)
      commit('setSinglePost', res.data)
    })
  }

}
