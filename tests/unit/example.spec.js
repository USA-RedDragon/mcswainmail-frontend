import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Home from '../../src/views/Home.vue';
import Settings from '../../src/views/Settings.vue';
import Login from '../../src/views/Login.vue';

describe('Home.vue', () => {
  it('renders Home', () => {
    const msg = 'Home';
    const wrapper = shallowMount(Home);
    expect(wrapper.text()).to.include(msg);
  });
});

describe('Settings.vue', () => {
  it('renders Settings', () => {
    const msg = 'Settings';
    const wrapper = shallowMount(Settings);
    expect(wrapper.text()).to.include(msg);
  });
});

describe('Login.vue', () => {
  it('renders Login', () => {
    const msg = 'Login';
    const wrapper = shallowMount(Login);
    expect(wrapper.text()).to.include(msg);
  });
});
