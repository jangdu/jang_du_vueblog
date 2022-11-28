<template>
  <div class="list-body">
    <div v-for="item in thisList" :key="item" class="post-list">
      <h4 @click="onClickTitle(item.id)" style="cursor: pointer;">{{item.title}}</h4>
      <p>Blogcontent: 컴포넌트는 mount, update, unmount 되는데이 사이사이에 간섭을 할 수 있으며, 특정 상황에서 특정 코드를 실행할 수 있다.쉽게말해서 어떤 컴포넌트가 생성될 때(mount), 재랜더링될때(update), 삭제될때(unmount) 각각 다른 상황에서 특정코</p>
      <button class="btn btn-outline-dark btn-sm">{{item.tag}}</button>
      <div class="list-info">
        <span>{{item.date}}</span>
        <div class="ms-2 me-2">|</div>
        <span>댓글 0개</span>
      </div>
    </div>
    <button type="button" class="btn btn-outline-info"></button>
    <button type="button" class="btn btn-outline-info"></button>
  </div>
</template>
<script setup>
import { db } from '@/firebase'
import { useStore } from 'vuex'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { onMounted, ref } from '@vue/runtime-core'
import { useRouter } from 'vue-router'

const itemNum = ref(5)
const blogPostCollectionRef = collection(db, 'blog-post')
const blogPostCollectionQuery = query(blogPostCollectionRef, orderBy('date', 'desc'))
const store = useStore()
const router = useRouter()
const thisList = ref([])
const i = 0

onMounted(async () => {
  itemNum.value = 5
  onSnapshot(blogPostCollectionQuery, (querySnapshot) => {
    const fireData = []
    const cities = []
    querySnapshot.forEach((doc) => {
      cities.push(doc.data().name)
      console.log(doc.id, ' => ', doc.data())
      const post = {
        id: doc.id,
        content: doc.data().content,
        title: doc.data().title,
        date: doc.data().date,
        tag: doc.data().tag
      }
      fireData.push(post)
    })
    store.state.postDb = fireData
    store.state.postDb.forEach((element) => {
      thisList.value.push(element)
      if (i.value === ref) {
        return false
      }
    })
  })
})

const onClickTitle = (id) => {
  const filterDb = store.state.postDb.filter(item => item.id === id)
  // store.state.nowPost = store.state.postDb[store.state.postDb.indexOf(filterDb[0])]
  router.push('/post/' + store.state.postDb.indexOf(filterDb[0]))
}
</script>
<script>
export default {
  components: {},
  data () {
    return {
      sampleData: ''
    }
  },
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods: {}
}
</script>
<style scoped>
.list-body{
  max-width: 750px;
  width: 80%;
  margin: 0 auto;
}
.post-list{
  padding-top: 4rem;
  padding-bottom: 4rem;
  line-height: 2;
  border-top: 1px solid rgb(124, 124, 124, .5);
}
.list-info{
  display: flex;
  margin-top: 1rem;
  font-size: 1rem;
  -webkit-box-align: center;
  align-items: center;
  color: rgba(97, 97, 97, 0.5);
}
</style>
