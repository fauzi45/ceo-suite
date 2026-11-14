import { describe, expect, it } from "vitest";
import { loginSchema } from "./auth";

describe("loginSchema", () => {
  it("reports both required messages for an empty form", () => {
    const result = loginSchema.safeParse({ email: "", password: "", rememberMe: false });
    expect(result.success).toBe(false);
    if (result.success) return;
    const byPath = Object.fromEntries(result.error.issues.map((i) => [i.path[0], i.message]));
    expect(byPath.email).toBe("Email is required");
    expect(byPath.password).toBe("Password is required");
  });

  it("rejects an email without a domain suffix", () => {
    const result = loginSchema.safeParse({ email: "a@b", password: "x", rememberMe: false });
    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error.issues[0].message).toBe("Enter a valid email address");
  });

  it("trims whitespace around the email", () => {
    const result = loginSchema.safeParse({
      email: "  user@example.com  ",
      password: "x",
      rememberMe: false,
    });
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data.email).toBe("user@example.com");
  });

  it("accepts a valid email and a password", () => {
    const result = loginSchema.safeParse({ email: "a@b.co", password: "x", rememberMe: true });
    expect(result.success).toBe(true);
  });
});
