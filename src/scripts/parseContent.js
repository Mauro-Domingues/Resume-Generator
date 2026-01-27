export class ParseContent {
  async parsePartial({ name, file, variables }) {
    const response = await fetch(file);
    const templateFileContent = await response.text();
    const partialTemplate = Handlebars.compile(templateFileContent);
    const parsedPartialTemplate = partialTemplate(variables);
    Handlebars.registerPartial(name, parsedPartialTemplate);
  }

  async parseTemplate({ file, variables }) {
    const response = await fetch(file);
    const templateFileContent = await response.text();
    const parseTemplate = Handlebars.compile(templateFileContent, {
      compat: true,
    });
    return parseTemplate(variables);
  }
}
