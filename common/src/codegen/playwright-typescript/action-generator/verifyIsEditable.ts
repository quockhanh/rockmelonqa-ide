import { IActionTemplateParam } from "../../types";
import { getParameters } from "../../utils/stringUtils";

/** Generates Typescript code for action VerifyHasOsEditable */
export default (params: IActionTemplateParam) => {
  const { pageName, elementName, parameters } = params;
  return `await expect(this.defs.${pageName}.${elementName}(${getParameters(parameters)})).toBeEditable();`;
};
