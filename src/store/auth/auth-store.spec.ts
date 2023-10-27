/**
 * @jest-environment jsdom
 */
import { createPinia } from "pinia";
import { setActivePinia } from "pinia";
import { useAuthStore } from "./auth-store";
import { USER_INITIAL } from "./contants";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { createApp } from "vue";

describe("Auth store test", () => {
  const userLoginData = {
    user: {
      email: "test@email.com",
      username: "username-test",
      bio: null,
      image: "https://api.realworld.io/images/smiley-cyrus.jpeg",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYWIuYWtiYXJ6YWRlaC4wMUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImFib2xmYXpsYWtiYXJ6YWRlaCJ9LCJpYXQiOjE2OTgzOTAwNDYsImV4cCI6MTcwMzU3NDA0Nn0.NUWPWC8_sWJjaZnff3sXiNvDDE9Hau_AyCNicrOEQyg",
    },
  };
  beforeAll(() => {
    // axios mock
    const mockAxios = new MockAdapter(axios);
    mockAxios
      .onPost("https://api.realworld.io/api/users/login")
      .reply(201, userLoginData);
    mockAxios
      .onPost("https://api.realworld.io/api/users")
      .reply(201, userLoginData);

    // pinia store mock
    const app = createApp({});
    const instance = axios.create({
      baseURL: "https://api.realworld.io/api",
    });
    const pinia = createPinia();
    app.use(pinia);
    pinia.use(({ store }) => {
      store.$axios = instance;
    });
    setActivePinia(pinia);
  });

  test("get user", () => {
    const authStore = useAuthStore();
    const user = authStore.getUser;
    expect(user).toStrictEqual(USER_INITIAL);
  });
  test("login", async () => {
    const authStore = useAuthStore();
    const success = await authStore.login({
      email: "test@email.com",
      password: "test",
    });
    expect(success).toBe(true);
    expect(authStore.getUser).toStrictEqual(userLoginData.user);
    expect(authStore.isUserAuthenticated).toBe(true);
  });
  test("register", async () => {
    const authStore = useAuthStore();
    const success = await authStore.register({
      username: "username-test",
      email: "test@email.com",
      password: "test",
    });
    expect(success).toBe(true);
    expect(authStore.getUser).toStrictEqual(userLoginData.user);
    expect(authStore.isUserAuthenticated).toBe(true);
  });
  test("logout", async () => {
    // login
    const authStore = useAuthStore();
    const success = await authStore.login({
      email: "test@email.com",
      password: "test",
    });
    expect(success).toBe(true);
    expect(authStore.getUser).toStrictEqual(userLoginData.user);
    expect(authStore.isUserAuthenticated).toBe(true);

    // logout
    authStore.logout();
    expect(authStore.isUserAuthenticated).toBe(false);
  });
});
