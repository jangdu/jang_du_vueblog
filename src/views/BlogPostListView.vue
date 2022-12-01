<template>
  <div class="list-body">
    <form class="d-flex m-5" role="search">
      <textarea class="form-control me-1" :value='serchInput' type="text" @input="update" placeholder="Search"></textarea>
      <p>{{output.value}}</p>
    </form>
    <div v-for="item in thisList" :key="item" class="post-list">
      <button @click="onClickTitle(item.id)" class="btn btn-toggle align-items-center rounded" style="font-size: 2rem;">{{item.title}}</button>
      <p>Blogcontent: 컴포넌트는 mount, update, unmount 되는데이 사이사이에 간섭을 할 수 있으며, 특정 상황에서 특정 코드를 실행할 수 있다.쉽게말해서 어떤 컴포넌트가 생성될 때(mount), 재랜더링될때(update), 삭제될때(unmount) 각각 다른 상황에서 특정코</p>
      <button class="btn btn-outline-dark btn-sm" @click="onClickTagBtn(item.tag)">{{item.tag}}</button>
      <div class="list-info">
        <span>{{yyyyMMdd(item.date)}}</span>
        <div class="ms-2 me-2">|</div>
        <span>댓글 0개</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { db } from '@/firebase'
import { useStore } from 'vuex'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { computed, onMounted, ref, watch } from '@vue/runtime-core'
import { useRouter, useRoute } from 'vue-router'
import { debounce } from 'lodash'

const blogPostCollectionRef = collection(db, 'blog-post')
const blogPostCollectionQuery = query(blogPostCollectionRef, orderBy('date', 'desc'))
const store = useStore()
const router = useRouter()
const selectTag = ref('')
const route = useRoute()
const thisList = ref([])
const serchInput = ref('')

const update = debounce((e) => {
  serchInput.value = e.target.value
}, 100)

watch(route, (element) => {
  console.log(element.params.tag)
  selectTag.value = element.params.tag
  showList()
})

const onClickTagBtn = (tag) => {
  router.push('/list/' + tag)
}

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
const output = ref('')

output.value = computed(() => {
  if (serchInput.value === '') {
    showList()
    return false
  } else {
    console.log(serchInput.value)
    const searchPost = []
    searchPost.push(store.state.postDb.filter(element => element.title.includes(serchInput.value)))
    console.log(searchPost)
    thisList.value = []
    thisList.value = (searchPost[0])
  }
})

const yyyyMMdd = (value) => {
  if (value === '') return ''

  // 현재 Date 혹은 DateTime 데이터를 javaScript date 타입화
  const jsdate = new Date(value)

  // 연도, 월, 일 추출
  const year = jsdate.getFullYear()
  let month = jsdate.getMonth() + 1
  let day = jsdate.getDate()

  // 월, 일의 경우 한자리 수 값이 있기 때문에 공백에 0 처리
  if (month < 10) {
    month = '0' + month
  }

  if (day < 10) {
    day = '0' + day
  }

  // 최종 포맷 (ex - '2021-10-08')
  return year + '-' + month + '-' + day
}
/*
// onUpdated를 통해서 route.params가 바뀌면 showList()가 실행되게끔 했으나 실제 firebase에 배포를 해보니 여러 데이터값이 바뀌면서
   무한으로 showList()가 호출되는 오류가 발생했다. 그래서 파라미터만 체크하는 방법을 찾기위해 watch를 선택했다. 해결!
onUpdated(() => {
  showList()
})
*/
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
        tag: doc.data().tag
      }
      fireData.push(post)
    })
    store.state.postDb = fireData
    showList()
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
  setup () {
  },
  created () {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        // react to route changes...
      }
    )
  },
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
