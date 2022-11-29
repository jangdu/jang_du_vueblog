<template>
  <div>
    <div class="flex-shrink-0 p-3 bg-white" style="width: 150px;">
      <a class="d-flex align-items-center pb-1 mb-1 link-dark text-decoration-none border-bottom">
        <p>태그 목록</p>
      </a>
      <ul class="list-unstyled ps-0">
        <li class="mb-1" style="">
          <button class="btn btn-toggle align-items-center rounded" @click="onClickTagBtn('all')">all</button><br/>
          <button v-for="item in store.state.tagPost" :key="item" @click="onClickTagBtn(item.tag)" class="btn btn-toggle align-items-center rounded">{{item.tag}}</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { db } from '@/firebase'
import { useStore } from 'vuex'
import { collection, onSnapshot } from 'firebase/firestore'
import { onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'

const blogPostCollectionRef = collection(db, 'post-tag')
const store = useStore()
const router = useRouter()

onMounted(async () => {
  onSnapshot(blogPostCollectionRef, (querySnapshot) => {
    const fireData = []
    const cities = []
    querySnapshot.forEach((doc) => {
      cities.push(doc.data().name)
      console.log(doc.id, ' => ', doc.data())
      const tag = {
        tag: doc.data().tag
      }
      fireData.push(tag)
    })
    store.state.tagPost = fireData
  })
})

const onClickTagBtn = (tag) => {
  router.push('/list/' + tag)
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
