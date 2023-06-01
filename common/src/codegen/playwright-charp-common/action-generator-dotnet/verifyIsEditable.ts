import { IActionTemplateParam } from "../../types";
import { getParameters } from "../../utils/stringUtils";

/** Generates Csharp code for action VerifyHasOsEditable */
export default (params: IActionTemplateParam) => {
  const { pageName, elementName, parameters } = params;
  return `await Expect(defs.${pageName}.${elementName}(${getParameters(parameters)})).ToBeEditableAsync();`;
};
