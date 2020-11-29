interface ITemplateVariables {
  [key: string]: string | number;
}

export default class IParseMailTemplateDTO {
  template: string;

  variable: ITemplateVariables;
}
