import {
  AutomationFramework,
  Indent,
  IRmProj,
  ITestCase,
  ITestSuite,
  Language,
  LocatorType,
  TestFramework,
} from "../../../src/file-defs";
import { actionClear } from "../../test-helpers/action-helpers";
import { RmpSpec } from "../../test-helpers/rm-project-spec.types";

export const createTestDataGeneral = (): RmpSpec => {
  return {
    projectName: "rm-playwright-typescript",
    content: {
      fileVersion: 1,
      name: "",
      description: "",
      automationFramework: AutomationFramework.Playwright,
      testFramework: "",
      language: Language.Typescript,
      rootNamespace: "",
      indent: Indent.Spaces,
      indentSize: 2,
      testIdAttributeName: "",
    },
    configFiles: [
      {
        name: "default",
        settings: [
          {
            name: "TestUser",
            value: "jim",
          },
          {
            name: "TestPassword",
            value: "xxx",
          },
          {
            name: "RememeberMe",
            value: "yes",
          },
          {
            name: "DelayMs",
            value: "2000",
          },
          {
            name: "TheUrl",
            value: "https://github.com/",
          },
          {
            name: "Attr",
            value: "name=Test",
          },
        ],
      },
      {
        name: "local",
        settings: [
          {
            name: "TestUser",
            value: "jonh",
          },
          {
            name: "TestPassword",
            value: "yyy",
          },
        ],
      },
    ],
    pages: [
      {
        id: "",
        name: "KitchenSinkScreen",
        description: "Kitchen Sink Screen",
        elements: [
          {
            id: "",
            type: "comment",
            comment: "Elements to locate",
          },
          {
            id: "",
            type: "pageElement",
            name: "name",
            findBy: LocatorType.Attribute,
            locator: "data-abd=def",
            description: "attribute",
          },
          {
            id: "",
            type: "pageElement",
            name: "css",
            findBy: LocatorType.Css,
            locator: "div.css-selector",
            description: "",
          },
          {
            id: "",
            type: "pageElement",
            name: "customTestId",
            findBy: LocatorType.TestId,
            locator: "locate-me-by-custom-testid",
            description: "",
          },
          {
            id: "",
            type: "pageElement",
            name: "id",
            findBy: LocatorType.Id,
            locator: "div-locate-me-by-id",
            description: "",
          },
          {
            id: "",
            type: "pageElement",
            name: "iframe",
            findBy: LocatorType.IFrame,
            locator: "locate-me-by-class",
            description: "",
          },
          {
            id: "",
            type: "pageElement",
            name: "iframe",
            findBy: LocatorType.IFrameId,
            locator: "iframe-locate-me-by-id",
            description: "",
          },
          {
            id: "",
            type: "pageElement",
            name: "iframe",
            findBy: LocatorType.IFrameName,
            locator: "iframe-locate-me-by-name",
            description: "",
          },

          {
            id: "",
            type: "pageElement",
            name: "label",
            findBy: LocatorType.Label,
            locator: "Hello",
            description: "",
          },

          {
            id: "",
            type: "pageElement",
            name: "name",
            findBy: LocatorType.Name,
            locator: "locate-me-by-name",
            description: "",
          },
          {
            id: "",
            type: "pageElement",
            name: "placeholder",
            findBy: LocatorType.Placeholder,
            locator: "locate-me-by-placeholder",
            description: "",
          },

          {
            id: "",
            type: "pageElement",
            name: "testId",
            findBy: LocatorType.TestId,
            locator: "locate-me-by-testid",
            description: "",
          },

          {
            id: "",
            type: "pageElement",
            name: "text",
            findBy: LocatorType.Text,
            locator: 'Please "Locate me!"',
            description: "",
          },
          {
            id: "",
            type: "pageElement",
            name: "title",
            findBy: LocatorType.Title,
            locator: "locate-me-by-title",
            description: "",
          },
          {
            id: "",
            type: "pageElement",
            name: "xpath",
            findBy: LocatorType.Xpath,
            locator: `//table/tbody/tr/td[1]/div[11]/p/span`,
            description: "",
          },

          {
            id: "",
            type: "comment",
            comment: "Elements to perform actions",
          },

          {
            id: "",
            type: "pageElement",
            name: "clear",
            findBy: LocatorType.Css,
            locator: `.action-clear`,
            description: "",
          },
          {
            id: "",
            type: "pageElement",
            name: "click",
            findBy: LocatorType.Css,
            locator: `.action-click`,
            description: "",
          },
          {
            id: "",
            type: "pageElement",
            name: "clickButton",
            findBy: LocatorType.Css,
            locator: `.action-click-button`,
            description: "",
          },
          {
            id: "",
            type: "pageElement",
            name: "clickInput",
            findBy: LocatorType.Css,
            locator: `.action-click-input`,
            description: "",
          },
          {
            id: "",
            type: "pageElement",
            name: "clickPopup",
            findBy: LocatorType.Css,
            locator: `.link-click-popup`,
            description: "",
          },
          {
            id: "",
            type: "pageElement",
            name: "input",
            findBy: LocatorType.Css,
            locator: `.action-input`,
            description: "",
          },
          {
            id: "",
            type: "pageElement",
            name: "selectOption",
            findBy: LocatorType.Css,
            locator: `select`,
            description: "",
          },

          {
            id: "",
            type: "comment",
            comment: "Elements to verify",
          },
          {
            id: "",
            type: "pageElement",
            name: "verifyAttribute",
            findBy: LocatorType.Css,
            locator: `.verify-attribute`,
            description: "",
          },
          {
            id: "",
            type: "pageElement",
            name: "verifyHasText",
            findBy: LocatorType.Css,
            locator: `.verify-has-text`,
            description: "",
          },
          {
            id: "",
            type: "pageElement",
            name: "verifyHasValue",
            findBy: LocatorType.Css,
            locator: `.verify-has-value`,
            description: "",
          },
          {
            id: "",
            type: "pageElement",
            name: "verifyIsHidden",
            findBy: LocatorType.Css,
            locator: `.verify-hidden`,
            description: "",
          },
          {
            id: "",
            type: "pageElement",
            name: "verifyEditable",
            findBy: LocatorType.Css,
            locator: `.verify-editable`,
            description: "",
          },
          {
            id: "",
            type: "pageElement",
            name: "verifyReadOnly",
            findBy: LocatorType.Css,
            locator: `.verify-readonly`,
            description: "",
          },
          {
            id: "",
            type: "pageElement",
            name: "verifyVisible",
            findBy: LocatorType.Css,
            locator: `.verify-visible`,
            description: "",
          },
        ],
      },
      {
        id: "",
        name: "Actions/ClickScreen",
        description: "Click page",
        elements: [
          {
            id: "",
            type: "pageElement",
            name: "clickMe",
            findBy: LocatorType.Css,
            locator: "button",
            description: "Click button",
          },
        ],
      },
    ],
    testcases: [
      {
        id: "",
        name: "KichenSink",
        description: "Contains everything possible",
        steps: [
          {
            id: "",
            type: "testStep",
            page: "",
            element: "",
            action: "GoToUrl",
            // Chechkout repo https://dev.azure.com/zapcentral/zap-forks/_git/playwright-test-pages and run the local website
            data: "http://localhost:3000/routines/kitchen-sink.html",
          },
          actionClear("KitchenSinkScreen", "clear"),
          {
            id: "",
            type: "testStep",
            page: "KitchenSinkScreen",
            element: "clickButton",
            action: "Click",
            data: "",
          },
          {
            id: "",
            type: "testStep",
            page: "KitchenSinkScreen",
            element: "clickPopup",
            action: "ClickPopup",
            data: "",
          },
          {
            id: "",
            type: "testStep",
            page: "",
            element: "",
            action: "ClosePopup",
            data: "",
          },
          {
            id: "",
            type: "testStep",
            page: "",
            element: "",
            action: "Delay",
            data: "200",
          },
          {
            id: "",
            type: "testStep",
            page: "KitchenSinkScreen",
            element: "input",
            action: "Input",
            data: "Hello World",
          },
          {
            id: "",
            type: "testStep",
            page: "KitchenSinkScreen",
            element: "district",
            action: "input",
            data: "(new Date()).getFullYear().toString()",
          },
          {
            id: "",
            type: "testStep",
            page: "",
            element: "",
            action: "RunCode",
            data: 'await defs.KitchenSinkPage.selectOption().selectOption("hello");',
          },
          {
            id: "",
            type: "testStep",
            page: "KitchenSinkScreen",
            element: "selectOption",
            action: "SelectOption",
            data: "world",
          },
          {
            id: "",
            type: "testStep",
            page: "KitchenSinkScreen",
            element: "verifyAttribute",
            action: "VerifyAttribute",
            data: "my-o-attr=value",
          },
          {
            id: "",
            type: "testStep",
            page: "KitchenSinkScreen",
            element: "district",
            action: "VerifyHasText",
            data: "Hello World",
          },
          {
            id: "",
            type: "testStep",
            page: "KitchenSinkScreen",
            element: "verifyHasValue",
            action: "VerifyHasValue",
            data: "Hello World",
          },
          {
            id: "",
            type: "testStep",
            page: "KitchenSinkScreen",
            element: "verifyEditable",
            action: "VerifyIsEditable",
            data: "",
          },
          {
            id: "",
            type: "testStep",
            page: "KitchenSinkScreen",
            element: "verifyReadOnly",
            action: "VerifyIsReadOnly",
            data: "",
          },
          {
            id: "",
            type: "testStep",
            page: "KitchenSinkScreen",
            element: "verifyVisible",
            action: "VerifyIsHidden",
            data: "",
          },
          {
            id: "",
            type: "testStep",
            page: "",
            element: "",
            action: "VerifyTitle",
            data: "Kitchen Sink",
          },
          {
            id: "",
            type: "testStep",
            page: "",
            element: "",
            action: "VerifyTitleContains",
            data: "Kitchen",
          },
          {
            id: "",
            type: "testStep",
            page: "",
            element: "",
            action: "VerifyUrl",
            data: "http://localhost:3000/kitchen-sink.html",
          },
          {
            id: "",
            type: "testStep",
            page: "",
            element: "",
            action: "VerifyUrlContains",
            data: "kitchen-sink",
          },
        ],
      },
    ],
    testroutines: [
      {
        id: "",
        name: "KichenSink",
        description: "KichenSink routine",
        steps: [
          {
            id: "",
            type: "testStep",
            page: "KitchenSinkScreen",
            element: "name",
            action: "Input",
            data: {
              "DataSet Number One": "John",
              "DataSet Number Two": "Jane",
              "DataSet Number Three": "Jim",
            },
          },
        ],
        dataSets: [
          {
            id: "",
            name: "DataSet Number One",
            description: "One One One",
          },
          {
            id: "",
            name: "DataSet Number Two",
            description: "Two Two Two",
          },
          {
            id: "",
            name: "DataSet Number Three",
            description: "Three Three Three",
          },
        ],
      },
    ],
    testsuites: [
      {
        id: "",
        name: "KichenSink",
        description: "Test KichenSink",
        testcases: ["KichenSink"],
      },
    ],
    outputFiles: [],
  };
};
