const baseUrl = "http://localhost:3000";
const apiUrl = "http://localhost:3001/api";

describe("Bloglists app", function () {
  beforeEach(function () {
    cy.request("POST", `${apiUrl}/testing/reset`);
    const newUser = {
      name: "Vasil",
      username: "cherepa",
      password: "12345",
    };

    cy.request("POST", `${apiUrl}/users`, newUser);
    cy.login({ username: "cherepa", password: "12345" });
  });
  // beforeEach end

  describe("login", function () {
    it("login success", function () {
      cy.contains("Logout");
      cy.contains("cherepa");
    });

    it("login fails", function () {
      cy.contains("Logout").click();
      cy.contains("LOGIN");
      cy.get("#login-btn").click();
      cy.contains("LOGIN");
      cy.get(".notification")
        .should("contain", "invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe.only("when logged in", function () {
    it("create new blog", function () {
      cy.contains("Add New").click();
      cy.get("#title").type("E2E Testing");
      cy.get("#author").type("cherepa");
      cy.get("#url").type("tetscom");
      cy.contains("Submit").click();

      cy.contains("E2E Testing");
    });

    it("user can like a blog", function () {
      cy.contains("Add New").click();
      cy.get("#title").type("E2E Testing");
      cy.get("#author").type("cherepa");
      cy.get("#url").type("tetscom");
      cy.contains("Submit").click();
      cy.contains("Expand").click();
      cy.contains("Like").click();

      cy.get(".likes:first");
    });

    it("user can remove blog", function () {
      cy.contains("Add New").click();
      cy.get("#title").type("E2E Testing");
      cy.get("#author").type("cherepa");
      cy.get("#url").type("tetscom");
      cy.contains("Submit").click();
      cy.contains("Remove").click();
      cy.get("#remove-btn").should("not.contain", "E2E Testing");
    });

    it.only("blogs order", function () {
      cy.contains("Add New").click();
      cy.get("#title").type("E2E Testing");
      cy.get("#author").type("cherepa");
      cy.get("#url").type("tetscom");
      cy.contains("Submit").click();
      cy.contains("E2E Testing").find("#expand-btn").click();
      cy.contains("Like").click().click();

      // cy.contains('E2E Testing').find('#expand-btn').as('@expand');
      // cy.get('@expand').click();

      cy.contains("Add New").click();
      cy.get("#title").type("Liking");
      cy.get("#author").type("cherep");
      cy.get("#url").type("tetstcom");
      cy.contains("Submit").click();

      cy.contains("Liking").find("#expand-btn").click();
      cy.contains("Liking").find("#like-btn").click();

      cy.visit(baseUrl);
    });
  });
});

//   describe("Login form is show", function () {
//     it("front page can be opened", function () {
//       cy.contains("blogs");
//     });

//     it("can click login", function () {
//       cy.contains("LOGIN").click();
//     });

//     it("user can login", function () {
//       cy.get("#username").type("Cherepa");
//       cy.get("#password").type("12345");
//       cy.get("#login-btn").click();
//       cy.contains("Cherepa");
//     });
//   });
