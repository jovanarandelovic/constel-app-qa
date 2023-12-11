import HomePage from "../page/home-page";
import LoginPage from "../page/login-page";
import { faker } from "@faker-js/faker";

const homePage = new HomePage();
const loginPage = new LoginPage();
const postText = faker.lorem.sentence();
const author = "@jovana_randjelovic";
const commentText = faker.lorem.sentence();

describe("Verifies that text was posted", () => {
  beforeEach(() => {
    cy.visit("");
    loginPage.login(
      Cypress.env("validCred").email,
      Cypress.env("validCred").password
    );
  });

  it("Should post a status", () => {
    homePage.createNewPost(postText);
    homePage.verifyPostContent(postText);
    homePage.verifyPostAuthor(author);
  });

  it("should like a latest post", () => {
    homePage.likePost();
    homePage.confirmLikeCounter();
  });

  it("should comment a latest post", () => {
    homePage.commentPost(commentText);
    homePage.confirmComment(commentText);
  });

  it("should delete a comment from existing post with comments", () => {
    homePage.commentPost(commentText + 1);
    // homePage.confirmComment(commentText);
    homePage.deleteComment();
    homePage.confirmCommentIsDeleted(commentText + 1);
  });

  it.skip("should delete a comment from a new post", () => {
    homePage.createNewPost(postText);
    homePage.commentPost(commentText + 2);
    homePage.confirmComment(commentText + 2);
    homePage.deleteComment();
    homePage.confirmCommentIsDeletedOnNewPost();
  });
});
