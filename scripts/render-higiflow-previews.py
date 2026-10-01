"""Render HigiFlow templates with synthetic context, without importing its application or database."""
import re,argparse
from pathlib import Path
from datetime import datetime
from types import SimpleNamespace as NS
from django.conf import settings
settings.configure(USE_I18N=False,STATIC_URL='/static/',INSTALLED_APPS=[])
import django
django.setup()
from django.template import Engine,Context
p=argparse.ArgumentParser();p.add_argument('--source',required=True);p.add_argument('--output',required=True);a=p.parse_args()
source=Path(a.source);out=Path(a.output);out.mkdir(exist_ok=True,parents=True)
static=out/'static'
if not static.exists():static.symlink_to(source/'service/static',target_is_directory=True)
templates={}
for path in (source/'service/templates').rglob('*.html'):
 text=path.read_text();text=re.sub(r'{%\s*url\b.*?%}','#',text);text=text.replace('{% csrf_token %}','')
 templates[str(path.relative_to(source/'service/templates'))]=text
engine=Engine(loaders=[('django.template.loaders.locmem.Loader',templates)],libraries={'static':'django.templatetags.static'})
user=NS(is_authenticated=True,username='demo',first_name='Demonstração',get_full_name=lambda:'Ambiente demonstrativo')
base={'hf_is_admin':True,'request':NS(user=user,resolver_match=NS(url_name='inicio')),'user':user,'total_leads':12,'taxa_conversao':50,'servicos_ativos':4,'faturamento':2800,'total_leads_delta':'Dados de exemplo','taxa_conversao_delta':'Dados de exemplo','servicos_ativos_delta':'Dados de exemplo','faturamento_delta':'Dados de exemplo','leads_recentes':[dict(name=f'Cliente demonstrativo {i}',contato='Contato de exemplo',status_class='status-new',status_label='Novo',created_at=datetime(2026,9,1)) for i in range(1,4)],'ordens_recentes':[dict(name=f'Serviço demonstrativo {i}',servico='Higienização de estofado',status_class='status-approved',status_label='Agendado',valor=350) for i in range(1,4)]}
for slug,template in [('dashboard','inicio'),('catalogo','catalogo')]:
 ctx=dict(base);ctx['request']=NS(user=user,resolver_match=NS(url_name=template));ctx.update(total_itens=3,total_categorias=2,valor_medio=280,categorias=[dict(name='Estofados',descricao='Higienização de sofás e poltronas',total=2),dict(name='Colchões',descricao='Limpeza e higienização de colchões',total=1)],itens=[dict(name='Sofá de 3 lugares',categoria_nome='Estofados',valor=350,descricao='Higienização completa de estofado. Item demonstrativo.',tempo='2 horas',formato='3 lugares',tamanho='Padrão',tecido='Sintético',pk=1),dict(name='Poltrona',categoria_nome='Estofados',valor=180,descricao='Serviço demonstrativo de higienização de poltrona.',tempo='1 hora',pk=2),dict(name='Colchão casal',categoria_nome='Colchões',valor=310,descricao='Serviço demonstrativo para colchão de casal.',tempo='2 horas',pk=3)])
 html=engine.get_template('service/'+template+'.html').render(Context(ctx))
 html=re.sub(r'<script\b[^>]*>.*?</script>','',html,flags=re.S|re.I)
 html=html.replace('</body>','<div style="position:fixed;bottom:12px;right:14px;z-index:99999;background:#fff;color:#465c77;border:1px solid #cbd8e8;padding:7px 11px;font:11px monospace;border-radius:5px">PRÉVIA LOCAL · DADOS DEMONSTRATIVOS</div></body>')
 (out/f'{slug}.html').write_text(html);print('Rendered',slug)
