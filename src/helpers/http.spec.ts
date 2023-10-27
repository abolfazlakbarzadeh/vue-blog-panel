import { AxiosError, AxiosHeaders, HttpStatusCode } from "axios";
import { getUnprocessableStatusErrors } from "./http";
describe("http helpers test", () => {
  describe("unprocssable-errors-serialaizer-test", () => {
    const headers = new AxiosHeaders();
    const config = {
      url: "http://localhost:3000",
      headers,
    };
    test("one error", () => {
      const errors = getUnprocessableStatusErrors(
        new AxiosError(
          "",
          "",
          config,
          {},
          {
            status: HttpStatusCode.UnprocessableEntity,
            statusText: "",
            headers,
            config,
            data: {
              errors: {
                email: ["is invalid"],
              },
            },
          },
        ),
      );
      expect(errors.sort()).toEqual(["email is invalid"].sort());
    });
    test("multi errors", () => {
      const errors = getUnprocessableStatusErrors(
        new AxiosError(
          "",
          "",
          config,
          {},
          {
            status: HttpStatusCode.UnprocessableEntity,
            statusText: "",
            headers,
            config,
            data: {
              errors: {
                email: ["is invalid", "is duplicate"],
                password: ["is invalid"],
              },
            },
          },
        ),
      );
      expect(errors.sort()).toEqual(
        [
          "email is invalid",
          "email is duplicate",
          "password is invalid",
        ].sort(),
      );
    });
  });
});
