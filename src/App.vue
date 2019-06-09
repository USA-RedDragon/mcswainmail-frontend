<template>
  <v-app :dark="dark">
    <v-toolbar>
      <v-toolbar-side-icon @click="drawer = !drawer"/>
      <v-toolbar-title>McSwainMail</v-toolbar-title>
      <v-spacer/>
      <v-menu bottom left nudge-bottom="32">
        <template v-slot:activator="{ on }">
          <v-list-tile v-ripple v-on="on" :to="loggedIn ? '':'/login'">
            <v-list-tile-content>
              <v-list-tile-title v-if="!loggedIn">
                <span class="subheading">Log In</span>
              </v-list-tile-title>
              <v-list-tile-title v-if="loggedIn">
                <span class="subheading">{{user.email}}</span><v-icon>arrow_drop_down</v-icon>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <v-list v-if="loggedIn">
          <v-list-tile to="/settings">
            <v-list-tile-content>
              <v-list-tile-title>Settings</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="logout">
            <v-list-tile-content>
              <v-list-tile-title>Log Out</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list>
        <v-subheader>Navigation</v-subheader>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Dashboard</v-list-tile-title>
        </v-list-tile>
        <v-divider/>
        <v-subheader>Settings</v-subheader>
        <v-list-tile to="/settings">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Settings</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>invert_colors</v-icon>
          </v-list-tile-action>
          <v-switch v-model="dark" :label="dark ? 'Dark Theme':'Light Theme'"/>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container>
        <router-view/>
      </v-container>
    </v-content>
    <v-footer app>Copyright &copy; 2019 Jacob McSwain</v-footer>
  </v-app>
</template>

<script>
import API from './services/API';

export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      loggedIn: false,
      // localStorage in Firefox is string-only
      dark: localStorage.dark === 'true' ? true : false,
      user: {},
    };
  },
  watch: {
    dark(_newValue) {
      // localStorage in Firefox is string-only
      localStorage.dark = this.dark ? 'true' : 'false';
    },
  },
  methods: {
    logout() {
      API.get('/auth/logout').then((_res) => {
        window.location = '/login';
      }).catch((err) => {
        console.error(err);
      });
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
