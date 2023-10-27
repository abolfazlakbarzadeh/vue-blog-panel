/**
 * @jest-environment jsdom
 */
import { setActivePinia } from "pinia";
import { useGlobalStore } from "./global-store";
import { createPinia } from "pinia";

describe("Global store test", () => {
  beforeAll(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
  });
  test("enable loading", () => {
    const globalStore = useGlobalStore();
    globalStore.enableLoading();

    expect(globalStore.isLoading).toBe(true);
  });
  test("disable loading", () => {
    const globalStore = useGlobalStore();
    // enable
    globalStore.enableLoading();
    expect(globalStore.isLoading).toBe(true);

    // disable
    globalStore.disbleLoading();
    expect(globalStore.isLoading).toBe(false);
  });
});
