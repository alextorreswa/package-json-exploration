const request = require("supertest");
const app = require("../src/app");

describe("GET /", () => {
  test("Normal case: returns 200 and greeting text", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("package.json exploration");
  });
});

describe("GET /sum", () => {
  // ---- Normal cases (3) ----
  test("Normal case 1: sums two integers", async () => {
    const res = await request(app).get("/sum?a=2&b=3");
    expect(res.statusCode).toBe(200);
    expect(res.body.sum).toBe(5);
  });

  test("Normal case 2: sums negative + positive", async () => {
    const res = await request(app).get("/sum?a=-10&b=7");
    expect(res.statusCode).toBe(200);
    expect(res.body.sum).toBe(-3);
  });

  test("Normal case 3: sums decimals", async () => {
    const res = await request(app).get("/sum?a=1.5&b=2.25");
    expect(res.statusCode).toBe(200);
    expect(res.body.sum).toBeCloseTo(3.75, 5);
  });

  // ---- Edge cases (3) ----
  test("Edge case 1: missing a returns 400", async () => {
    const res = await request(app).get("/sum?b=3");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeTruthy();
  });

  test("Edge case 2: non-number returns 400", async () => {
    const res = await request(app).get("/sum?a=hello&b=3");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeTruthy();
  });

  test("Edge case 3: Infinity returns 400", async () => {
    const res = await request(app).get("/sum?a=Infinity&b=1");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeTruthy();
  });
});
