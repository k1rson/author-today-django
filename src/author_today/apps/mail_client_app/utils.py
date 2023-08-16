import os

from jinja2 import Environment, FileSystemLoader

class TemplateGenerator:
    def __init__(self, template_name: str):
        self.template_name = template_name
        self.template = self._get_template()

    def _get_template(self): 
        template_dir = os.path.join(os.path.dirname(__file__), 'templates_to_render') 
        env = Environment(loader=FileSystemLoader(template_dir))

        template = env.get_template(self.template_name)

        if template is None:
            raise FileNotFoundError(self.template_name)
        
        return template

    def generate_html_content(self, context=None):
        if context is None:
            context = {}

        html_content = self.template.render(context)
        return html_content