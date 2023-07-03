import path from "path";
import {
  ActionType,
  ISourceProjectMetadata,
  ITestCase,
  ITestCaseActionStep,
  ITestRoutine,
  ITestSuite,
  LocatorType,
  StandardFolder,
  StandardOutputFolder,
  StandardOutputFolderTypeScript,
} from "../../file-defs";
import { IPage } from "../../file-defs/pageFile";
import { StandardOutputFile } from "../../file-defs/standardOutputFile";
import { ActionDataType, IActionData, ICodeGen, WriteFileFn } from "../types";
import { PlaywrightTypescriptTemplateProvider } from "./templateProvider";
import { DataSetCollection, IDataSetInfo } from "../playwright-charp-common/dataSetInfo";
import { CodeGenBase } from "../codegen-common/codeGenBase";
import { upperCaseFirstChar } from "../utils/stringUtils";
import { EOL } from "os";
import { PlaywrightTypeScriptProjMeta } from "./playwrightTypeScriptMeta";
import { IOutputProjectMetadataProcessor } from "../playwright-charp-common/outputProjectMetadataProcessor";
import { createCleanName } from "../utils/createName";
import { ITestStepComment } from "../../file-defs/shared";
import { addIndent } from "../utils/codegenUtils";

export class PlaywrightTypeScriptCodeGen extends CodeGenBase implements ICodeGen {
  _templateProvider: PlaywrightTypescriptTemplateProvider;
  _outProjMeta: IOutputProjectMetadataProcessor;

  constructor(projMeta: ISourceProjectMetadata) {
    super(projMeta);
    this._templateProvider = new PlaywrightTypescriptTemplateProvider(
      path.join(this._rmprojFile.folderPath, StandardFolder.CustomCode, "templates")
    );

    this._outProjMeta = this.getOutProjMeta();
  }

  protected getOutProjMeta(): IOutputProjectMetadataProcessor {
    return new PlaywrightTypeScriptProjMeta(this._projMeta);
  }

  /** Generate Playwright Typescript project */
  public async generateCode(full: boolean, writeFile: WriteFileFn): Promise<string> {
    await this.generateEnvironmentSettingsFile(writeFile);
    await this.generateEnvironmentSetterScripts(writeFile);
    await this.generatePageFiles(writeFile);
    await this.generatePageDefinitionsFiles(writeFile);
    await this.generateCaseFiles(writeFile);
    await this.generateRoutineFiles(writeFile);
    await this.generateSuiteFiles(writeFile);
    await this.generateSupportFiles(writeFile);

    if (full) {
      await this.generateProjectFiles(writeFile);
    }

    await this.generateMetaFiles(writeFile);
    return "";
  }

  private async generateEnvironmentSettingsFile(writeFile: WriteFileFn) {
    // Aggregate all variable names in all config file
    let allNames: string[] = [];
    for (let configFile of this._projMeta.environmentFiles) {
      let namesInFile = configFile.content.settings.map((setting) => setting.name);
      allNames.push(...namesInFile);
    }
    allNames = Array.from(new Set(allNames));
    const content = this._templateProvider.getEnvironmentSettingsFiles(allNames);

    await writeFile(
      `${StandardOutputFolderTypeScript.Config}/${StandardOutputFile.EnvironmentSettings}${this._outputFileExt}`,
      content
    );
  }

  private async generateProjectFiles(writeFile: WriteFileFn) {}

  private async generateMetaFiles(writeFile: WriteFileFn) {}
  private async generatePageDefinitionsFiles(writeFile: WriteFileFn) {
    await writeFile(
      `${StandardOutputFile.PageDefinitions}${this._outputFileExt}`,
      this.generatePageDefinitions(this._projMeta.pages.map((p) => p.content))
    );
  }

  private async generateSupportFiles(writeFile: WriteFileFn) {
    await writeFile(
      `${StandardOutputFolderTypeScript.Support}/${StandardOutputFile.TestCaseBase}${this._outputFileExt}`,
      this._templateProvider.getTestCaseBase()
    );
    await writeFile(
      `${StandardOutputFolderTypeScript.Support}/${StandardOutputFile.PageBase}${this._outputFileExt}`,
      this._templateProvider.getPageBase()
    );
    await writeFile(
      `${StandardOutputFolderTypeScript.Support}/${StandardOutputFile.PageTest}${this._outputFileExt}`,
      this._templateProvider.getPageTest()
    );

    await writeFile(
      `${StandardOutputFile.NodePackage}`,
      this._templateProvider.getNodePackageFile(this._projMeta.project.content.name)
    );

    await writeFile(`${StandardOutputFile.PlaywrightConfig}`, this._templateProvider.getPlaywrightConfigFile());
    await writeFile(`${StandardOutputFile.TsConfig}`, this._templateProvider.getTsConfigFile());
  }

  private async generateSuiteFiles(writeFile: WriteFileFn) {}

  private async generatePageFiles(writeFile: WriteFileFn) {
    for (let page of this._projMeta.pages) {
      let filePath = this._outProjMeta.get(page.content.id)!.outputFileRelPath;
      await writeFile(filePath, this.generatePage(page.content));
    }
  }

  private async generateCaseFiles(writeFile: WriteFileFn) {
    for (let { content: testCase } of this._projMeta.testCases) {
      let testClassContent = this.generateTestCaseFile(
        testCase,
        this._projMeta.pages.map((p) => p.content),
        this._projMeta.testRoutines.map((p) => p.content)
      );
      let outputFileRelPath = this._outProjMeta.get(testCase.id)!.outputFileRelPath;

      await writeFile(outputFileRelPath, testClassContent);
    }
  }

  private async generateRoutineFiles(writeFile: WriteFileFn) {}

  private generatePageDefinitions(pages: IPage[]): string {
    let importStatements: string[] = [];
    for (let page of pages) {
      let pageNamespace = this._outProjMeta.get(page.id)!.outputFileFullNamespace;
      let pageName = this._outProjMeta.get(page.id)!.outputFileClassName;
      let importStatement = `import ${pageName} from "${pageNamespace}";`;
      if (!importStatements.includes(importStatement)) {
        importStatements.push(importStatement);
      }
    }

    let allImports = importStatements.join(EOL);

    let pagesDeclarationItems = [];
    for (let page of pages) {
      let pageName = upperCaseFirstChar(this._outProjMeta.get(page.id)!.outputFileClassName);
      pagesDeclarationItems.push(`public readonly ${pageName}: ${pageName};`);
    }
    let pagesDeclarations = pagesDeclarationItems.join(EOL);
    pagesDeclarations = addIndent(pagesDeclarations, this._indentString);
    //
    // Build constructor body
    // Example:
    // this.LoginPage = new LoginPage(this);
    //
    let pageInitItems = [];
    for (let page of pages) {
      let pageName = upperCaseFirstChar(this._outProjMeta.get(page.id)!.outputFileClassName);
      pageInitItems.push(`this.${pageName} = new ${pageName}(page);`);
    }

    let pageInits = pageInitItems.join(EOL);
    pageInits = addIndent(pageInits, this._indentString.repeat(2));

    return this._templateProvider.getPageDefinitions(allImports, pagesDeclarations, pageInits);
  }

  private generatePage(page: IPage): string {
    let pageItems = [];

    for (let element of page.elements) {
      if (element.type === "pageElement") {
        pageItems.push(
          this._templateProvider.getLocator({
            elementName: upperCaseFirstChar(element.name!),
            locatorStr: element.locator || "",
            locatorType: element.findBy!,
            description: element.description!,
            //hasParams: hasPlaceholder(element.locator!),
            returnedLocatorType:
              element.findBy! === LocatorType.IFrame ||
              element.findBy! === LocatorType.IFrameId ||
              element.findBy! === LocatorType.IFrameName
                ? "FrameLocator"
                : "Locator",
          })
        );
        continue;
      }
      if (element.type === "comment") {
        pageItems.push(""); // Add an empty line before comment
        pageItems.push(this._templateProvider.getComment(element.comment!));
      }
    }

    let pageBody = pageItems.join(EOL + EOL);
    pageBody = addIndent(pageBody, this._indentString);

    return this._templateProvider.getPage(page.description || "", pageBody);
  }

  private generateTestSuiteFile(testSuite: ITestSuite, testcases: ITestCase[]) {}

  private generateTestRoutineFile(testRoutine: ITestRoutine, testRoutineClasses: string[]) {}

  private generateTestRoutineClass(testRoutine: ITestRoutine, pages: IPage[], datasetInfo: IDataSetInfo) {}

  private generateTestCaseFile(testCase: ITestCase, pages: IPage[], routines: ITestRoutine[]) {
    const testcaseBody = this.generateTestCaseBody(testCase, pages, routines);
    const testCaseName = this._outProjMeta.get(testCase.id)!.outputFileClassName;
    let testFile = this._templateProvider.getTestCaseFile(testCaseName, testCase.description, testcaseBody);
    return testFile;
  }

  protected generateTestCaseBody(testCase: ITestCase, pages: IPage[], routines: ITestRoutine[]) {
    let stepItems: string[] = [];
    for (let step of testCase.steps) {
      if (step.type === "testStep") {
        stepItems.push(...this.generateTestStep(step, pages, routines));
        continue;
      }

      if (step.type === "comment") {
        // Add an empty line before the comment
        stepItems.push("");
        stepItems.push(this.generateComment(step));
        continue;
      }
    }

    let body = stepItems.join(EOL);

    // If there is no step, we add an `await` so that there is no build warning about `async` method
    if (body.length === 0) {
      body = `await Task.CompletedTask;`;
    }

    // Indent test method body with 1 indent;
    body = addIndent(body, this._indentString.repeat(2));
    return body;
  }

  /** Generates one or more code lines for the step */
  private generateTestStep(step: ITestCaseActionStep, pages: IPage[], routines: ITestRoutine[]): string[] {
    if (step.action === "RunTestRoutine") {
      return this.generateRunTestRoutineStep(step, routines);
    }

    let pageName = "";
    let elementName = "";

    if (step.page) {
      let pageId = step.page;
      let page = pages.find((p) => p.id === pageId);
      if (!page) {
        throw new Error("DEV ERROR: " + `Cannot find page with ID ${step.page}`);
      }
      pageName = this._outProjMeta.get(page.id)!.outputFileClassName;

      if (step.element) {
        let elementId = step.element;
        let element = page.elements.find((e) => e.id === elementId);
        if (!element) {
          throw new Error("DEV ERROR: " + `Cannot find element with ID ${elementId} on page ${pageName}`);
        }
        elementName = element.name || "";
      }
    }

    let actionData = this.getActionData(step.data);
    return [
      this._templateProvider.getAction({
        pageName: pageName,
        elementName: elementName,
        action: step.action! as unknown as ActionType,
        data: actionData,
        parameters: step.parameters || [],
      }),
    ];
  }

  /** Generates code for RunTestRoutine step */
  private generateRunTestRoutineStep(step: ITestCaseActionStep, routines: ITestRoutine[]): string[] {
    let routineId = step.data;
    if (!routineId) {
      return [];
    }

    let routine = routines.find((r) => r.id === routineId);

    if (!routine) {
      throw new Error(`DEV ERROR: routine with id "${routineId}" not found`);
    }

    let dataSetCollection = new DataSetCollection(step.parameters);

    if (dataSetCollection.isAll()) {
      dataSetCollection.empty();
      dataSetCollection.addMany(routine.dataSets.map((ds) => ds.id));
    }

    const routineCalls = [];
    for (let dataSetId of dataSetCollection.get()) {
      let routineName = this._outProjMeta.get(routineId)!.outputFileClassName;
      let dataset = routine.dataSets.find((ds) => ds.id === dataSetId)!;
      let datasetName = createCleanName(dataset.name);
      let finalRoutineClassName = `${routineName}${datasetName}`;
      routineCalls.push(`await new ${finalRoutineClassName}(this.Page).RunAsync();`);
    }

    return routineCalls;
  }

  private getActionData(rawData: any): IActionData {
    if (this.EnvironmentVariableDataRegex.test(rawData)) {
      let groups = this.EnvironmentVariableDataRegex.exec(rawData)!;
      let varName = groups[1];
      return {
        rawData: varName,
        dataType: ActionDataType.EnvironmentVar,
      };
    }

    return {
      rawData: String(rawData),
      dataType: ActionDataType.LiteralValue,
    };
  }

  private generateComment(step: ITestStepComment) {
    return this._templateProvider.getComment(step.comment!);
  }

  private generateTestCaseFunction(testCase: ITestCase) {}
}
