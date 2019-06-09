<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-form v-on:submit.prevent>
          <v-card class="elevation-12">
            <v-card-title>
              <span class="title">Login</span>
            </v-card-title>
            <v-card-text>
              <v-text-field
                id="email"
                prepend-icon="email"
                name="email"
                label="Email"
                type="email"
                v-model="email" />
              <v-text-field
                id="password"
                prepend-icon="lock"
                :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                name="password"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                v-model="password" />
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" type="submit" @click="login">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import API from '../services/API';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
    };
  },
  methods: {
    login() {
      API.post('/auth/login', { email: email._value, password: password._value }).then((_res) => {
        window.location = '/';
      }).catch((err) => {
        console.error(err);
      });
    },
  },
};
</script>
