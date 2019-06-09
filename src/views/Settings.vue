<template>
  <div>
    <p class="display-1">Settings</p>
    <v-card class="userSettings">
      <v-card-title>
        <span class="headline">User Settings</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="userForm" v-model="userSettingsValid" v-on:submit.prevent lazy-validation>
          <v-text-field :value="user.email" label="E-mail" disabled/>
          <v-text-field
            v-model="currentPassword"
            :append-icon="showCurrentPassword ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.min]"
            :type="showCurrentPassword ? 'text' : 'password'"
            label="Current Password"
            @click:append="showCurrentPassword = !showCurrentPassword"
          />
          <v-text-field
            v-model="newPassword"
            :append-icon="showNewPassword ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.min, passwordConfirmationRules()]"
            :type="showNewPassword ? 'text' : 'password'"
            label="New Password"
            hint='At least 8 characters'
            counter
            @click:append="showNewPassword = !showNewPassword"
          />
          <v-text-field
            v-model="confirmNewPassword"
            :append-icon="showNewPasswordConfirmation ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.min, passwordConfirmationRules()]"
            :type="showNewPasswordConfirmation ? 'text' : 'password'"
            label="Confirm New Password"
            hint='At least 8 characters'
            counter
            @click:append="showNewPasswordConfirmation = !showNewPasswordConfirmation"
          />
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="!userSettingsValid" color="primary" type="submit" @click="submitUser">Submit</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
    <v-card class="aliasSettings" v-if="user.admin">
      <v-card-title>
        <span class="headline">Alias Settings</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="aliasForm" v-model="aliasSettingsValid" v-on:submit.prevent lazy-validation>
          <v-text-field :value="user.email" label="E-mail" disabled/>
          <v-text-field
            v-model="currentPassword"
            :append-icon="showCurrentPassword ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.min]"
            :type="showCurrentPassword ? 'text' : 'password'"
            label="Current Password"
            @click:append="showCurrentPassword = !showCurrentPassword"
          />
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="!aliasSettingsValid" color="primary" type="submit" @click="submitAlias">Submit</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
    <v-snackbar
      top right
      :color="snackbarColor"
      class="headline"
      v-model="snackbar"
      @click="snackbar = false"
      :timeout="2000">
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script>
import API from '../services/API';

export default {
  name: 'Settings',
  data() {
    return {
      user: {},
      userSettingsValid: true,
      aliasSettingsValid: true,
      currentPassword: null,
      newPassword: null,
      confirmNewPassword: null,
      showCurrentPassword: false,
      showNewPassword: false,
      showNewPasswordConfirmation: false,
      snackbar: false,
      snackbarText: null,
      snackbarColor: 'success',
      rules: {
        required: (v) => (v != null && !!v) || 'Required.',
        min: (v) => (v != null && v.length >= 8) || 'At least 8 characters',
      },
    };
  },
  computed: {
    passwordConfirmationRules() {
      return () => (this.password === this.confirmPassword) || 'Passwords do not match';
    },
  },
  methods: {
    submitUser() {
      if (this.$refs.userForm.validate()) {
        API.put('/users/me', {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
        }).then((_response) => {
          this.snackbarText = 'Submitted';
          this.snackbarColor = 'success';
          this.snackbar = true;
        }).catch((error) => {
          this.snackbarText = error.response.data.message;
          this.snackbarColor = 'error';
          this.snackbar = true;
        });
      } else {
        return;
      }
    },
    submitAlias() {
      if (this.$refs.aliasForm.validate()) {
      } else {
        return;
      }
    },
  },
  created() {
    API.get(`/users/me`)
        .then((res) => {
          this.loggedIn = true;
          this.user = res.data;
        })
        .catch((_err) => {
          this.loggedIn = false;
        });
  },
};
</script>

<style scoped>
.userSettings {

}

.aliasSettings {
  margin-top: 30px;
}
</style>
