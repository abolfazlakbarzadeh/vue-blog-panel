import LoginForm from "./login-form.vue";
import { mount } from "@vue/test-utils";
import { describe, test, expect } from "vitest";

describe("Login form test", () => {
  test("Render login form", async () => {
    const wrapper = mount(LoginForm, {
      props: {},
    });
    expect(wrapper).toBeTruthy();

    const email = wrapper.find("[data-test-subj='email-field']");
    await email.setValue("test@email.com");
    expect(email.element.value).toBe("test@email.com");

    const password = wrapper.find("[data-test-subj='password-field']");
    await password.setValue("test123");
    expect(password.element.value).toBe("test123");
  });
});
