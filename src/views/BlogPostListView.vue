<template>
  <div class="list-body">
    <div class="d-flex flex-row-reverse list-header">
      <button v-show="true" class="btn btn-outline-dark ms-2" @click="$router.push('/write')">글쓰기</button>
      |
      <button id="login-Modal" class="btn btn-outline-dark ms-2 me-2" @click="loginModalBool = true">로그인</button>
      <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <Signin :show="loginModalBool" @close="loginModalBool = false">
        </Signin>
      </Teleport>
      <span>댓글을 작성하려면 </span>
    </div>
    <textarea class="shadow-sm search-input mt-3" :value='searchInput' type="text" @input="update" placeholder="Search"></textarea>
    <p style="display: none;">{{output}}</p>
    <div v-if="true" style="width: 100%; margin-top: 3rem;">
      <div v-for="item in thisList" :key="item" class="shadow p-3 mb-5 rounded post-list">
        <button @click="onClickTitle(item.id)" class="btn btn-toggle align-items-center rounded" style="font-size: 2rem; font-weight: bold;">{{item.title}}</button>
        <p v-html="marked(contentPreview(item.content))"></p>
        <button class="btn btn-outline-dark btn-sm" @click="onClickTagBtn(item.tag)">{{item.tag}}</button>
        <div class="list-info">
          <span>{{yyyyMMdd(item.date)}}</span>
          <div class="ms-2 me-2">|</div>
          <span>댓글 {{item.commentLength}}개</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { db } from '@/firebase'
import { useStore } from 'vuex'
import { marked } from 'marked'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { computed, onMounted, ref, watch } from '@vue/runtime-core'
import { useRouter, useRoute } from 'vue-router'
import { debounce } from 'lodash'
import Signin from '../components/SignIn.vue'

// store
const store = useStore()
const loginModalBool = ref(false)

// router
const router = useRouter()
const route = useRoute()

const selectTag = ref('')
const thisList = ref([])

// firebase ref, query
const blogPostCollectionRef = collection(db, 'blog-post')
const blogPostCollectionQuery = query(blogPostCollectionRef, orderBy('date', 'desc'))

onMounted(async () => {
  selectTag.value = route.params.tag
  console.log(selectTag)
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
        tag: doc.data().tag,
        commentLength: doc.data().commentLength
      }
      fireData.push(post)
    })
    store.state.postDb = fireData
    showList()
  })
})
/*
  // 라우트 params를 사용해 태그 카테고리 구현

  onUpdated를 통해서 route.params가 바뀌면 showList()가 실행되게끔 했으나 실제 firebase에 배포를 해보니 여러 데이터값이 바뀌면서
  무한으로 showList()가 호출되는 오류가 발생했다. 그래서 파라미터만 체크하는 방법을 찾기위해 watch를 선택했다. 해결!
*/

// route.params가 변경되면 태그 체크
watch(route, (element) => {
  console.log(element.params.tag)
  selectTag.value = element.params.tag
  showList()
})

// showList(): 태그를 체크하고 보여줄 리스트 결정
const showList = () => {
  selectTag.value = route.params.tag
  if (selectTag.value === 'all') {
    thisList.value = []
    thisList.value = store.state.postDb
  } else {
    const tagPost = store.state.postDb.filter(element => element.tag === selectTag.value)
    thisList.value = []
    thisList.value = tagPost
    console.log(tagPost)
  }
}

// 검색 기능 구현
const searchInput = ref('')
const output = ref('')

const update = debounce((e) => {
  searchInput.value = e.target.value
}, 100)

output.value = computed(() => {
  if (searchInput.value === '') {
    showList()
    return false
  } else {
    console.log(searchInput.value)
    const searchPost = []
    searchPost.push(store.state.postDb.filter(element => element.title.includes(searchInput.value)))
    console.log(searchPost)
    thisList.value = []
    thisList.value = (searchPost[0])
    if (searchPost[0].length === 0) {
      console.log(thisList)
    }
  }
})

// date 포맷 구현
const yyyyMMdd = (value) => {
  if (value === '') return ''
  const jsdate = new Date(value)
  const year = jsdate.getFullYear()
  let month = jsdate.getMonth() + 1
  let day = jsdate.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  return year + '-' + month + '-' + day
}

// 프리뷰 컨텐츠
const contentPreview = (item) => {
  if (item === '') return 'none content'
  const map = Array.prototype.map
  const pre = map.call(item, function (char) {
    return char !== '#' && char !== '\n' && char !== '`' ? char : ''
  })
  return pre.join('').slice(0, 200)
}

// List에서 title클릭
const onClickTitle = (id) => {
  const filterDb = store.state.postDb.filter(item => item.id === id)
  // store.state.nowPost = store.state.postDb[store.state.postDb.indexOf(filterDb[0])]
  router.push('/post/' + store.state.postDb.indexOf(filterDb[0]))
}

// 리스트에서 태그를 클릭시 params.tag를 변경
const onClickTagBtn = (tag) => {
  router.push('/list/' + tag)
}

</script>
<style scoped>
.list-body{
  margin: 0 auto;
  width: 90%;
}
.post-list{
  padding-top: 4rem;
  padding-bottom: 4rem;
  line-height: 2;
}
.list-info{
  display: flex;
  margin-top: 1rem;
  font-size: 1rem;
  -webkit-box-align: center;
  align-items: center;
  color: rgba(97, 97, 97, 0.5);
}
.search-input{
  font-size: 1.8rem;
  display: block;
  width: 100%;
  text-align: center;
  margin-top: 3rem;
  margin: 0 auto;
  height: 50px;
  line-height: 1.5;
  padding: 0;
  resize: none;
  outline: none;
  border: none;
}
code {
  display: none;
}
.list-header{
  align-items: center;
  display: flex;
}
</style>
