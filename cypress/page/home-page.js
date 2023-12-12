import moment from "moment";

export default class HomePage {
  LOGOUT_BUTTON = '[id="email"]';
  INPUT_POST = 'input[placeholder="What\'s happening"]';
  MICROPHONE_BUTTON = '[id="startRecordingButton"]';
  NEW_POST_BUTTON = '[id="submitPostBtn"]';
  STOP_RECORDNING_BUTTON = '[id="stopRecordingButton"]';
  DELETE_RECORDING_BUTTON = '[id="clearRecordingButton';
  PLAY_RECORDING_BUTTON = '[id="pauseRecordingButton"]';
  RECORDED_DRAFT = ".card-body .vizualizerSection";
  DRAFT_RECORDING_LENGTH = ".vizualizerSection__time";
  POST_RECORDING_LENGTH = ".voice-visualizer__audio-info-container";
  PLAY_BUTTON_POST = ".voice-visualizer__btn-left";
  LIKE_BUTTON_POST = 'svg[data-icon="heart"]';
  COMMENT_BUTTON = 'svg[data-icon="comment"]';
  COMMENT_INPUT = '[placeholder="Write a comment"]';
  POST_COMMENT = '[data-icon="paper-plane"]';
  COMMENT_LIKE_BUTTON = '[aria-labelledby="postActionBtn"]';
  COMMENT_SEND_ICON = '[aria-labelledby="createInputSubmitBtn1"]';
  COMMENTS = '[class="post__comments__list__comment__body"]';
  DELETE_COMMENT = '[id="postDeleteBtn"]';
  POST_DATE = ".post__informations__timePosted";
  POST_CONTENT = ".post__description";
  POST_AUTHOR = ".user-details__username";
  AUDIO = "audio[src]";

  logout() {
    cy.get("a").contains("Log out").click();
  }

  waitForTheAudiosToLoad() {
    cy.get("@audio.all")
      .its("length")
      .then((numberOfRequests) => {
        for (let i = 0; i < numberOfRequests; i++) {
          cy.intercept("GET", "**blob").as("audio");
          cy.wait(audio);
        }
      });
  }

  createNewPost(postText) {
    cy.get(this.INPUT_POST).clear().type(postText);
    cy.wait(1000);
    cy.get(this.NEW_POST_BUTTON).click();
  }

  commentPost(commentText) {
    cy.get(this.COMMENT_BUTTON).first().click();
    cy.get(this.COMMENT_INPUT).clear().type(commentText);
    cy.wait(1000);
    cy.get(this.COMMENT_SEND_ICON).click();
  }

  likePost() {
    cy.get(this.LIKE_BUTTON_POST).first().click();
  }

  playAudio() {}

  recordAudio(timeinMsec) {
    cy.get(this.MICROPHONE_BUTTON).click();
    cy.wait(timeinMsec);
    cy.get(this.STOP_RECORDNING_BUTTON).click();
    cy.get(this.DRAFT_RECORDING_LENGTH).then(($value) => {
      let textValue = $value.text();
      textValue = "0" + textValue;

      cy.wrap(textValue).as("recordingLength");
    });
    cy.log("@recordingLength");
  }

  deleteRecordedDraft() {
    cy.get(this.DELETE_RECORDING_BUTTON).click();
  }

  postRecording(timeinMsec, postText) {
    this.recordAudio(timeinMsec);
    this.createNewPost(postText);
  }

  confirmLikeCounter() {
    cy.get(this.LIKE_BUTTON_POST)
      .first()
      .parent()
      .should("have.class", "btn-primary");
  }

  confirmComment(commentText) {
    cy.get(this.COMMENTS).first().should("have.text", commentText);
  }

  deleteComment() {
    cy.get(this.DELETE_COMMENT).eq(0).last().click();
    cy.wait(500);
  }

  verifyPostDate() {
    cy.get(this.POST_DATE)
      .first()
      .should("have.text", `${moment().format("DD.MM.YYYY.")}`);
  }

  verifyPostContent(postText) {
    cy.get(this.POST_CONTENT).first().invoke("text").should("eq", postText);
  }
  verifyPostAuthor(author) {
    cy.get(this.POST_AUTHOR).first().invoke("text").should("eq", author);
  }

  verifyPostedAudioRecord(author, postText) {
    this.verifyPostAuthor(author);
    this.verifyPostContent(postText);
    cy.get("@recordingLength").then((recordingLength) => {
      cy.get(this.POST_RECORDING_LENGTH)
        .first()
        .invoke("text")

        .should("eq", recordingLength.replaceAll(".", ":"));
    });
  }
  confirmCommentIsDeleted(commentText) {
    cy.get(this.COMMENTS).eq(0).first().should("not.have.text", commentText);
  }

  confirmCommentIsDeletedOnNewPost() {
    cy.get(this.COMMENTS).should("not.exist");
  }

  verifyAudiosArePlaying() {
    const confirmAudioPlays = (audioIndex) => {
      cy.get(this.AUDIO)
        .eq(audioIndex)
        .then((elements) => {
          elements.each((i, element) => {
            let audible = false;
            console.log(element);
            console.log(element.duration, element.paused);
            if (element.duration > 0 && !element.paused) {
              audible = true;
            }
            expect(audible).to.eq(true);
          });
        });
    };

    cy.get(this.PLAY_BUTTON_POST).then((elements) => {
      elements.each((i, element) => {
        cy.log(i);
        cy.log(element);
        cy.get(element).click();
        confirmAudioPlays(i);
      });
    });
  }

  verifyAudioIsRecorded() {
    cy.get(this.RECORDED_DRAFT).should("be.visible");
  }

  verifyDraftIsDeleted() {
    cy.get(this.RECORDED_DRAFT).should("not.exist");
  }
}
