import RegisterForm from "./register-form.vue";
import { mount } from "@vue/test-utils";
import { describe, test, expect } from "vitest";

describe("Register form test", () => {
  test("Render register form", async () => {
    const wrapper = mount(RegisterForm, {
      props: {},
    });
    expect(wrapper).toBeTruthy();

    const username = wrapper.find("[data-test-subj='username-field']");
    await username.setValue("user-test");
    expect(username.element.value).toBe("user-test");

    const email = wrapper.find("[data-test-subj='email-field']");
    await email.setValue("test@email.com");
    expect(email.element.value).toBe("test@email.com");

    const password = wrapper.find("[data-test-subj='password-field']");
    await password.setValue("test123");
    expect(password.element.value).toBe("test123");
  });
});
