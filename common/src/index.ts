import { IOutputProjectMetadata } from "./codegen/playwright-charp/outputProjectMetadata";
import {
  ActionType,
  AutomationFramework,
  IDataSet,
  IFileDef,
  IRecentFile,
  IRmProj,
  IRmProjFile,
  ISourceProjectMeta,
  ITestCase,
  ITestCaseFile,
  ITestRoutine,
  ITestRoutineFile,
  ITestStep,
  ITestSuite,
  ITestSuiteFile,
  IUserSettings,
  IUserSettingsFile,
  Indent,
  Language,
  LocatorType,
  StandardFileExtension,
  StandardFolder,
  StandardOutputFolder,
  TestFramework,
  fileDefFactory,
} from "./file-defs";
import {
  Action,
  IAddFileWatchEventArgs,
  IAppInfo,
  IEnvironmentInfo,
  IFileSystemInfo,
  IGetFolderRequest,
  IIpcGenericResponse,
  IIpcResponse,
  IProgressDetail,
  IProgressEvent,
  IRenameFileRequest,
  IRunTestRequest,
  IRunTestResponseData,
  IRunTestSettings,
  IWriteFileRequest,
} from "./ipc-defs";

export {
  Action,
  ActionType,
  AutomationFramework,
  fileDefFactory,
  IAddFileWatchEventArgs,
  IAppInfo,
  ISourceProjectMeta,
  IDataSet,
  IEnvironmentInfo,
  IFileDef,
  IFileSystemInfo,
  IGetFolderRequest,
  IIpcGenericResponse,
  IIpcResponse,
  Indent,
  IProgressDetail,
  IProgressEvent,
  IRecentFile,
  IRenameFileRequest,
  IRmProjFile,
  IRmProj,
  IRunTestRequest,
  IRunTestResponseData,
  IRunTestSettings,
  ITestCase,
  ITestCaseFile,
  ITestRoutine,
  ITestRoutineFile,
  ITestStep,
  ITestSuite,
  ITestSuiteFile,
  IOutputProjectMetadata,
  IUserSettings,
  IUserSettingsFile,
  IWriteFileRequest,
  Language,
  LocatorType,
  StandardFileExtension,
  StandardFolder,
  StandardOutputFolder,
  TestFramework,
};
