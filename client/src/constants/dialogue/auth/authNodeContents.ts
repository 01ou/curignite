import { NodeContent } from "../../../types/dialogue/NodeTypes";

export const authNodeContents: Record<string, NodeContent> = {
  top: {
    contentsKey: "top.contents",
    nodes: [
      { id: "toSignUp", type: "button", color: "#9392D2", textKey: "top.signUp.text", next: "signUp" },
      { id: "toSignIn", type: "button", color: "#D292B1", textKey: "top.signIn.text", next: "signIn" }
    ]
  },
  signIn: {
    contentsKey: "signIn.contents",
    nodes: [
      { id: "googleSignIn", type: "button", color: "#5EDB71", textKey: "signIn.google.text", next: "checkAuthGoogle" },
      { id: "emailSignIn", type: "button", color: "#5EDB71", textKey: "signIn.email.text", next: "inputSignInEmail" }
    ]
  },
  signUp: {
    contentsKey: "signUp.contents",
    nodes: [
      { id: "googleSignUp", type: "button", color: "#5EDB71", textKey: "signUp.google.text", next: "checkAuthGoogle" },
      { id: "emailSignUp", type: "button", color: "#5EDB71", textKey: "signUp.email.text", next: "inputSignUpEmail" }
    ]
  },
  inputSignInEmail: {
    contentsKey: "inputSignInEmail.contents",
    activeContentsKey: "failedEmailSignIn",
    nodes: [
      { id: "emailSignInEmailInput", type: "inputText", labelKey: "inputEmailLabel" },
      { id: "emailSignInPasswordInput", type: "inputText", labelKey: "inputPasswordLabel" },
      { id: "emailSignInEnter", type: "button", color: "#5EDB71", textKey: "enter", requiredInputs: ["emailSignInEmailInput", "emailSignInPasswordInput"], next: "checkAuthEmail" }
    ]
  },
  inputSignUpEmail: {
    contentsKey: "inputSignUpEmail.contents",
    activeContentsKey: "failedEmailSignUp",
    nodes: [
      { id: "emailSignUpEmailInput", type: "inputText", labelKey: "inputEmailLabel" },
      { id: "emailSignUpPasswordInput", type: "inputText", labelKey: "inputPasswordLabel" },
      { id: "emailSignUpEnter", type: "button", color: "#5EDB71", textKey: "enter", requiredInputs: ["emailSignUpEmailInput", "emailSignUpPasswordInput"], next: "checkAuthEmail" }
    ]
  },
  checkAuthEmail: {
    contentsKey: "checkAuthEmail",
    nodes: []
  },
  retryAuthGoogle: {
    contentsKey: "retryAuthGoogle.contents",
    activeContentsKey: "failedGoogleAuth",
    nodes: [
      { id: "retryGoogleAuthEnter", type: "button", color: "#5EDB71", textKey: "retryAuthGoogle.text", next: "checkAuthGoogle" }
    ]
  },
  checkAuthGoogle: {
    contentsKey: "checkAuthGoogle",
    nodes: []
  },
  inputUserName: {
    contentsKey: "inputUserName.contents",
    activeContentsKey: "failedInputUserName",
    nodes: [
      { id: "userNameInput", type: "inputText", labelKey: "inputUserName.label" },
      { id: "userNameEnter", type: "button", color: "#5EDB71", textKey: "enter", requiredInputs: ["userNameInput"], next: "checkUserName" }
    ]
  },
  checkUserName: {
    contentsKey: "checkUserName",
    nodes: []
  },
  finish: {
    contentsKey: "finish.contents",
    nodes: []
  },
};
