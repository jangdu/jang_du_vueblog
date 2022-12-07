<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper" @click.self="$emit('close')">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <h3>{{showSignUp ? "회원가입" : "로그인"}}</h3>
            </slot>
          </div>
          <div class="modal-body">
            <div class="login-form">
              <form>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Email address</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                </div>
                <div v-if="showSignUp" class="mb-3">
                  <label for="exampleNickName" class="form-label">별명</label>
                  <input type="text" class="form-control" id="exampleNickName">
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword1">
                </div>
                <div v-if="showSignUp" class="mb-3">
                  <label for="exampleInputPassword2" class="form-label">Password 확인</label>
                  <input type="password" class="form-control" id="exampleInputPassword2">
                </div>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button type="submit" class="btn btn-outline-dark">{{showSignUp ? "회원가입" : "로그인"}}</button>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <div class="SignUp-Btn" style="text-align: center;">
                <p>
                  계정이 {{showSignUp ? "있으신가요?" : "없으신가요?"}}
                  <button type="button" @click="showSignUp = !showSignUp" class="btn btn-outline-dark btn-sm" style="--bs-btn-border-color: none; margin-bottom: 0.2rem; --bs-btn-font-size: 1rem; --bs-btn-color: var(--bs-blue); --bs-btn-hover-color: var(--bs-white);" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    {{showSignUp ? "로그인" : "회원가입"}}
                  </button>
                </p>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script setup>
import { defineProps, ref } from 'vue'
defineProps({
  show: Boolean
})
const showSignUp = ref(false)
</script>
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  max-width: 400px;
  width: 100%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  font-size: 1.5rem;
  color: #000000;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
