import HomePage from "../page/home-page";
import LoginPage from "../page/login-page";
import { faker } from "@faker-js/faker";

const homePage = new HomePage();
const loginPage = new LoginPage();
const postText = faker.lorem.sentence();
const author = "@jovana_randjelovic";

describe("Verifies that the audio is recorded", () => {
  beforeEach(() => {
    cy.visit("");
    loginPage.login(
      Cypress.env("validCred").email,
      Cypress.env("validCred").password
    );
  });

  it("Should record an audio draft", () => {
    homePage.recordAudio(2000);
    homePage.verifyAudioIsRecorded();
  });

  it("Should delete an audio draft", () => {
    homePage.recordAudio(2000);
    homePage.deleteRecordedDraft();
    homePage.verifyDraftIsDeleted();
  });

  it("Should post a recorded audio", () => {
    //bug
    homePage.postRecording(2000, postText);
    cy.get("@recordingLength").then((recordingLength) => {
      homePage.verifyPostedAudioRecord(author, postText);
    });
  });

  it("Should not post a recorded audio without a text", () => {
    homePage.recordAudio(1500);
    cy.get(homePage.NEW_POST_BUTTON).should("be.disabled");
  });
});
