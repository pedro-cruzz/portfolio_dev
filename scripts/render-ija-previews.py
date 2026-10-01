"""Render public IJA templates with synthetic values; never connect to its database."""
import argparse
import re
from pathlib import Path
from types import SimpleNamespace as NS
from jinja2 import Environment, FileSystemLoader, ChainableUndefined

p = argparse.ArgumentParser()
p.add_argument('--source', required=True)
p.add_argument('--output', required=True)
a = p.parse_args()
source, out = Path(a.source), Path(a.output)
out.mkdir(parents=True, exist_ok=True)
if not (out/'static').exists():
    (out/'static').symlink_to(source/'app/static', target_is_directory=True)
env = Environment(loader=FileSystemLoader(source/'app/templates'), undefined=ChainableUndefined, autoescape=True)
base = (source/'app/templates/base.html').read_text()
for name in set(re.findall(r'\b((?:can_|is_)[a-z_]+)\(', base)):
    env.globals[name] = lambda *args, **kwargs: True
env.globals.update(
    url_for=lambda endpoint, **kw: '/static/'+kw['filename'] if endpoint=='static' else '#',
    get_flashed_messages=lambda **kw: [], csrf_token=lambda: 'preview',
    is_dev_user=lambda *args: False,
)
ctx = dict(
    current_user=NS(is_authenticated=True, tipo_usuario='admin', name='Demonstração', nome_uvis='', trabalha_agro=True),
    tema_escolhido='light', total_clientes_agro=18, total_fornecedores_agro=7,
    total_orcamentos_agro=24, total_contratos_agro_aprovados=6, total_contratos_agro=10,
    total_financeiros_agro_pendentes=3, total_financeiros_agro=16,
    total_ordens_servico_agro=8, total_pilotos_agro=4, total_curriculos_agro=5, total_curriculos_agro_novos=2, total_equipes_agro=3, total_equipamentos_agro=12,
    can_manage=True, can_view_logs=True, can_view_checklist=True, can_manage_equipes=True,
)
for slug, template, endpoint in [('overview','admin_agro.html','main.admin_agro'),('detail','veiculos_menu.html','main.veiculos_menu')]:
    ctx['request']=NS(endpoint=endpoint, args={}, path='/')
    html=env.get_template(template).render(**ctx)
    html=re.sub(r'<script\b[^>]*>.*?</script>','',html,flags=re.S|re.I)
    html=html.replace('</body>','<div style="position:fixed;bottom:12px;right:14px;z-index:99999;background:#fff;color:#465c77;border:1px solid #cbd8e8;padding:7px 11px;font:11px monospace;border-radius:5px">PRÉVIA LOCAL · DADOS DEMONSTRATIVOS</div></body>')
    (out/f'{slug}.html').write_text(html)
    print('Rendered', slug)
