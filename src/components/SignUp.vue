<template>
  <div>
    <div class="relative py-3 mt-20 sm:max-w-xl sm:mx-auto w-full">
      <div class="relative px-4 py-10 bg-black mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <div class="max-w-md mx-auto text-white">
          <form @submit.prevent="onSubmit">
            <div class="mt-5">
              <div id="Username" class="mb-5">
                <label for="username" class="font-semibold text-sm text-gray-400 pb-1 block">Username</label>
                <input v-model="username" v-bind="usernameAttrs" id="username" type="text"
                  class="border rounded-lg px-3 py-2 mt-1 text-sm w-full bg-gray-700 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500" />
                <p class="font-semibold text-xs text-red-600 pb-1 block mt-1">
                  {{ errors.username }}
                </p>
              </div>

              <div id="Email" class="mb-5">
                <label for="signup" class="font-semibold text-sm text-gray-400 pb-1 block">E-mail</label>
                <input v-model="email" v-bind="emailAttrs" id="email" type="email"
                  class="border rounded-lg px-3 py-2 mt-1 text-sm w-full bg-gray-700 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500" />
                <p class="font-semibold text-xs text-red-600 pb-1 block mt-1">
                  {{ errors.email }}
                </p>
              </div>

              <div id="Password" class="mb-5">
                <label for="password" class="font-semibold text-sm text-gray-400 pb-1 block">Password</label>
                <input v-model="password" v-bind="passwordAttrs" id="password"
                  :type="showPassword ? 'text' : 'password'"
                  class="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full bg-gray-700 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500" />
                <div class="flex gap-2">
                  <CheckBox :showPassword="showPassword" @click="showPassword = !showPassword" />
                  <p class="font-semibold text-sm text-gray-400 pb-1 block">
                    Show Password
                  </p>
                  <p class="font-semibold text-xs text-red-600 pb-1 block">
                    {{ errors.password }}
                  </p>
                </div>
              </div>

              <div id="ConfirmPassword" class="mb-5">
                <label for="passwordConfirm" class="font-semibold text-sm text-gray-400 pb-1 block">Confirm
                  Password</label>
                <input v-model="passwordConfirm" v-bind="passwordConfirmAttrs" id="passwordConfirm"
                  :type="showPasswordConfirm ? 'text' : 'password'"
                  class="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full bg-gray-700 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500" />
                <div class="flex gap-2">
                  <CheckBox :showPassword="showPasswordConfirm" @click="showPasswordConfirm = !showPasswordConfirm" />
                  <p class="font-semibold text-sm text-gray-400 pb-1 block">
                    Show Password
                  </p>
                  <p class="font-semibold text-xs text-red-600 pb-1 block">
                    {{ errors.passwordConfirm }}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label for="fileInput" class="font-semibold text-sm text-gray-400 pb-1 block">Upload Your Profile Picture</label>
              <input type="file" id="fileInput" class="mb-5 bg-red-600 rounded-md cursor-pointer" />
            </div>

            <div>
              <button type="submit"
                class="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                Sign Up
              </button>
            </div>
          </form>

          <!-- <div class="mt-5">
            <button type="submit"
              @click="googleLogIn"
              class="py-2 px-4 bg-white border border-red-600 focus:ring-blue-500 focus:ring-offset-blue-200 text-red-600 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg flex justify-center items-center gap-5">
              <Google />
              Sign Up With Google
            </button>
          </div> -->

          <div class="flex items-center justify-between mt-4">
            <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            <a @click="useMainStore().switchDisplay(LogIn)"
              class="cursor-pointer text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or log in</a>
            <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMainStore } from "../stores/main";
import { LogIn } from "./index";
import { CheckBox } from "../components/icons";
import { useForm } from "vee-validate";
import * as yup from "yup";
import useSignUp from "../composables/useSignUp";

const showPassword = ref(false);
const showPasswordConfirm = ref(false);

const schema = yup.object({
  username: yup.string()
    .min(2, "Username must be at least two characters")
    .required("Username is required"),

  email: yup.string()
    .email("Email is not valid")
    .required("Email is required"),

  password: yup.string()
    .min(9, "Password must contain at least eight characters")
    .matches(/[0-9]/i, "Password must contain at least one number")
    .matches(/[a-z]/, "Password must contain at least one lower case letter")
    .matches(/[A-Z]/, "Password must contain at least one upper case letter")
    .matches(/[@!#$%&?"]/i, "Password must contain at least one special character")
    .required("Password is required"),

  passwordConfirm: yup.string()
    .oneOf([yup.ref('password'), ""], "Passwords don't match")
    .required("Confirm your password, please")
})

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: schema
});

const { signUp } = useSignUp();

const [username, usernameAttrs] = defineField("username");
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
const [passwordConfirm, passwordConfirmAttrs] = defineField("passwordConfirm");

const onSubmit = handleSubmit(async (data) => {
  await signUp(data);
});
</script>
